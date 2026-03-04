/* eslint-disable no-console */
import { formatTypeSpec } from "../../src/core/formatter.js";
import { parse } from "../../src/core/parser.js";
import { compile as compileProgram } from "../../src/core/program.js";
import { createScanner, Token } from "../../src/core/scanner.js";
import { addTestLib, StandardTestLibrary } from "../../src/testing/test-compiler-host.js";
import { createTestFileSystem, resolveVirtualPath } from "../../src/testing/fs.js";

const DEFAULT_OPTIONS = {
  iterations: 10_000,
  maxDepth: 5,
  maxStatements: 12,
  maxLength: 1_200,
  mutationBudget: 12,
  mutationRate: 0.75,
  compileRate: 0.35,
  reportEvery: 200,
};

const MUTATION_ATOMS = [
  "model",
  "op",
  "namespace",
  "union",
  "interface",
  "enum",
  "alias",
  "const",
  "using",
  "dec",
  "extern",
  "internal",
  "is",
  "extends",
  "valueof",
  "typeof",
  "true",
  "false",
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
  "<",
  ">",
  "#{",
  "#[",
  ":",
  ";",
  ",",
  "...",
  "?",
  "&",
  "|",
  "=",
  "=>",
  "/*",
  "*/",
  "/**",
  "@foo",
  "@@foo",
  "#suppress",
  "\"",
  "\"\"\"",
  "`",
  "\\",
  "🚀",
  "\u2028",
  "\u2029",
];

const BASE_CORPUS = [
  "model Foo { x: string; }",
  "op ping(): void;",
  "namespace A.B;",
  "namespace A { model B { x: int32; } op c(): B; }",
  "union Choice { left: string, right: int32 }",
  "alias Pair<T> = [T, T];",
  "enum E { A, B, C }",
  "interface Api { list(...items: string[]): string[]; }",
  "scalar Secure extends string;",
  "const Flag = true;",
  "#suppress \"warning\" \"msg\"\nmodel Item { @doc(\"name\") name?: string; }",
  "/** @param id any */\nop read(id: string): string;",
];

interface FuzzOptions {
  iterations: number;
  seed: number;
  maxDepth: number;
  maxStatements: number;
  maxLength: number;
  mutationBudget: number;
  mutationRate: number;
  compileRate: number;
  noCompile: boolean;
  reportEvery: number;
}

type OracleName = "scanner" | "parser" | "formatter" | "compiler";

class OracleFailure extends Error {
  public constructor(
    readonly oracle: OracleName,
    readonly iteration: number,
    readonly seed: number,
    readonly source: string,
    readonly causeError: unknown,
  ) {
    super(`Fuzz failure in ${oracle} at iteration ${iteration} (seed=${seed}).`);
  }
}

class XorShift32 {
  private state: number;

  public constructor(seed: number) {
    const normalized = seed >>> 0;
    this.state = normalized === 0 ? 0x9e3779b9 : normalized;
  }

  public nextUInt32(): number {
    let value = this.state;
    value ^= value << 13;
    value ^= value >>> 17;
    value ^= value << 5;
    this.state = value >>> 0;
    return this.state;
  }

  public float(): number {
    return this.nextUInt32() / 0xffffffff;
  }

  public int(minInclusive: number, maxExclusive: number): number {
    if (maxExclusive <= minInclusive) {
      return minInclusive;
    }
    const span = maxExclusive - minInclusive;
    return minInclusive + (this.nextUInt32() % span);
  }

  public chance(probability: number): boolean {
    return this.float() < probability;
  }

  public pick<T>(items: readonly T[]): T {
    return items[this.int(0, items.length)];
  }
}

class CompilerOracle {
  private readonly fs = createTestFileSystem();
  private readonly mainPath = resolveVirtualPath("./main.tsp");

  public static async create(): Promise<CompilerOracle> {
    const oracle = new CompilerOracle();
    await oracle.initialize();
    return oracle;
  }

  public async run(source: string): Promise<void> {
    this.fs.addTypeSpecFile("./main.tsp", source);
    await compileProgram(this.fs.compilerHost, this.mainPath, { noEmit: true });
  }

  private async initialize(): Promise<void> {
    await this.fs.addTypeSpecLibrary(StandardTestLibrary);
    addTestLib(this.fs);
  }
}

void main().catch((error) => {
  console.error(String(error instanceof Error ? error.stack ?? error.message : error));
  process.exitCode = 1;
});

async function main() {
  if (process.argv[2] !== "run") {
    throw new Error(
      "Correct usage is `node fuzz.js run [--iterations N] [--seed N] [--no-compile]`.",
    );
  }

  const options = parseArgs(process.argv.slice(3));
  const rng = new XorShift32(options.seed);
  const compilerOracle = options.noCompile ? undefined : await CompilerOracle.create();
  const corpus = [...BASE_CORPUS];

  console.log(
    `[fuzz] seed=${options.seed} iterations=${options.iterations} compile=${options.noCompile ? "off" : "on"}`,
  );

  for (let iteration = 1; iteration <= options.iterations; iteration++) {
    const base = rng.chance(0.5) ? rng.pick(corpus) : generateProgram(rng, options, 0);
    const source = maybeMutateSource(base, rng, options);
    const clamped = source.slice(0, options.maxLength);

    try {
      await runOracles(clamped, iteration, options.seed, rng, options, compilerOracle);
      if (rng.chance(0.2)) {
        corpus.push(clamped);
      }
    } catch (error) {
      if (!(error instanceof OracleFailure)) {
        throw error;
      }

      const minimized = await minimizeFailure(error, compilerOracle);
      console.error(`[fuzz] failure in ${error.oracle} at iteration ${error.iteration}`);
      console.error(`[fuzz] seed=${error.seed}`);
      console.error(`[fuzz] minimized repro:\n${minimized}`);
      throw error.causeError;
    }

    if (iteration % options.reportEvery === 0) {
      console.log(`[fuzz] progress ${iteration}/${options.iterations} corpus=${corpus.length}`);
    }
  }

  console.log("[fuzz] completed with no unhandled failures");
}

function parseArgs(args: string[]): FuzzOptions {
  const parsed: FuzzOptions = {
    ...DEFAULT_OPTIONS,
    seed: Number((Date.now() ^ process.pid) >>> 0),
    noCompile: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--") {
      continue;
    }
    switch (arg) {
      case "--iterations":
        parsed.iterations = readIntArg(arg, args[++i]);
        break;
      case "--seed":
        parsed.seed = readIntArg(arg, args[++i]);
        break;
      case "--max-depth":
        parsed.maxDepth = readIntArg(arg, args[++i]);
        break;
      case "--max-statements":
        parsed.maxStatements = readIntArg(arg, args[++i]);
        break;
      case "--max-length":
        parsed.maxLength = readIntArg(arg, args[++i]);
        break;
      case "--mutation-budget":
        parsed.mutationBudget = readIntArg(arg, args[++i]);
        break;
      case "--mutation-rate":
        parsed.mutationRate = readFloatArg(arg, args[++i]);
        break;
      case "--compile-rate":
        parsed.compileRate = readFloatArg(arg, args[++i]);
        break;
      case "--report-every":
        parsed.reportEvery = readIntArg(arg, args[++i]);
        break;
      case "--no-compile":
        parsed.noCompile = true;
        break;
      default:
        throw new Error(`Unknown fuzz argument: ${arg}`);
    }
  }
  return parsed;
}

function readIntArg(flag: string, raw: string | undefined): number {
  if (raw === undefined) {
    throw new Error(`Missing value for ${flag}`);
  }
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`Invalid integer for ${flag}: ${raw}`);
  }
  return value;
}

function readFloatArg(flag: string, raw: string | undefined): number {
  if (raw === undefined) {
    throw new Error(`Missing value for ${flag}`);
  }
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error(`Invalid probability for ${flag}: ${raw}`);
  }
  return value;
}

async function runOracles(
  source: string,
  iteration: number,
  seed: number,
  rng: XorShift32,
  options: FuzzOptions,
  compilerOracle?: CompilerOracle,
): Promise<void> {
  await runOracle("scanner", source, iteration, seed, () => {
    runScannerOracle(source);
  });
  const parsed = await runOracle("parser", source, iteration, seed, () => {
    return runParserOracle(source);
  });
  if (parsed.parseDiagnostics.length === 0) {
    await runOracle("formatter", source, iteration, seed, async () => {
      await runFormatterOracle(source);
    });
  }

  if (compilerOracle !== undefined && rng.chance(options.compileRate)) {
    await runOracle("compiler", source, iteration, seed, async () => {
      await runCompilerOracle(source, compilerOracle);
    });
  }
}

async function runOracle<T>(
  oracle: OracleName,
  source: string,
  iteration: number,
  seed: number,
  action: () => T | Promise<T>,
): Promise<T> {
  try {
    return await action();
  } catch (error) {
    throw new OracleFailure(oracle, iteration, seed, source, error);
  }
}

function runScannerOracle(source: string): void {
  const scanner = createScanner(source, () => undefined);
  let previousPosition = -1;
  const maxSteps = Math.max(source.length * 4, 256);
  for (let step = 0; step < maxSteps; step++) {
    const token = scanner.scan();
    if (scanner.position === previousPosition && token !== Token.EndOfFile) {
      throw new Error(`Scanner did not advance at token ${token} position=${scanner.position}`);
    }
    previousPosition = scanner.position;
    if (token === Token.EndOfFile) {
      return;
    }
  }
  throw new Error("Scanner exceeded max token budget.");
}

function runParserOracle(source: string) {
  return parse(source, { comments: true, docs: true });
}

async function runFormatterOracle(source: string): Promise<void> {
  const formatted = await formatTypeSpec(source);
  const formattedAgain = await formatTypeSpec(formatted);
  if (formattedAgain !== formatted) {
    throw new Error("Formatter output is not idempotent.");
  }
  parse(formattedAgain, { comments: true, docs: true });
}

async function runCompilerOracle(source: string, compilerOracle: CompilerOracle): Promise<void> {
  await compilerOracle.run(source);
}

function maybeMutateSource(base: string, rng: XorShift32, options: FuzzOptions): string {
  if (!rng.chance(options.mutationRate)) {
    return base;
  }

  let value = base;
  const steps = Math.max(1, rng.int(1, options.mutationBudget + 1));
  for (let i = 0; i < steps; i++) {
    const operation = rng.int(0, 5);
    switch (operation) {
      case 0:
        value = insertAtom(value, rng);
        break;
      case 1:
        value = replaceRange(value, rng);
        break;
      case 2:
        value = deleteRange(value, rng);
        break;
      case 3:
        value = duplicateSlice(value, rng);
        break;
      default:
        value = flipCharacter(value, rng);
        break;
    }
  }
  return value;
}

function insertAtom(source: string, rng: XorShift32): string {
  const index = rng.int(0, source.length + 1);
  const atom = rng.pick(MUTATION_ATOMS);
  return `${source.slice(0, index)}${atom}${source.slice(index)}`;
}

function replaceRange(source: string, rng: XorShift32): string {
  if (source.length === 0) return rng.pick(MUTATION_ATOMS);
  const start = rng.int(0, source.length);
  const end = rng.int(start, Math.min(source.length, start + 12) + 1);
  return `${source.slice(0, start)}${rng.pick(MUTATION_ATOMS)}${source.slice(end)}`;
}

function deleteRange(source: string, rng: XorShift32): string {
  if (source.length <= 1) return source;
  const start = rng.int(0, source.length - 1);
  const end = rng.int(start + 1, Math.min(source.length, start + 16) + 1);
  return `${source.slice(0, start)}${source.slice(end)}`;
}

function duplicateSlice(source: string, rng: XorShift32): string {
  if (source.length === 0) return source;
  const start = rng.int(0, source.length);
  const end = rng.int(start, Math.min(source.length, start + 16) + 1);
  const index = rng.int(0, source.length + 1);
  return `${source.slice(0, index)}${source.slice(start, end)}${source.slice(index)}`;
}

function flipCharacter(source: string, rng: XorShift32): string {
  if (source.length === 0) return source;
  const index = rng.int(0, source.length);
  const replacement = String.fromCodePoint(rng.int(0x20, 0x07ff));
  return `${source.slice(0, index)}${replacement}${source.slice(index + 1)}`;
}

function generateProgram(rng: XorShift32, options: FuzzOptions, depth: number): string {
  const count = Math.max(1, rng.int(1, options.maxStatements + 1));
  const statements: string[] = [];
  for (let i = 0; i < count; i++) {
    statements.push(generateStatement(rng, options, depth));
  }
  return statements.join("\n");
}

function generateStatement(rng: XorShift32, options: FuzzOptions, depth: number): string {
  const annotation = generateAnnotations(rng, options, depth);
  const body = (() => {
    const kind = rng.int(0, 10);
    switch (kind) {
      case 0:
        return `model ${generateIdentifier(rng)} ${generateModelLikeBlock(rng, options, depth)}`;
      case 1:
        return `op ${generateIdentifier(rng)}(${generateParameters(rng, options, depth)}): ${generateTypeExpr(rng, options, depth)};`;
      case 2:
        return `alias ${generateIdentifier(rng)} = ${generateTypeExpr(rng, options, depth)};`;
      case 3:
        return `namespace ${generateNamespacePath(rng)} ${depth < options.maxDepth && rng.chance(0.6) ? `{ ${generateProgram(rng, options, depth + 1)} }` : ";"}`;
      case 4:
        return `interface ${generateIdentifier(rng)} { ${generateInterfaceBody(rng, options, depth)} }`;
      case 5:
        return `union ${generateIdentifier(rng)} { ${generateUnionBody(rng, options, depth)} }`;
      case 6:
        return `enum ${generateIdentifier(rng)} { ${generateEnumBody(rng)} }`;
      case 7:
        return `const ${generateIdentifier(rng)} = ${generateValueExpr(rng, options, depth)};`;
      case 8:
        return `extern dec ${generateIdentifier(rng)}(target: unknown, value?: valueof string);`;
      default:
        return `scalar ${generateIdentifier(rng)}${rng.chance(0.6) ? ` extends ${generateTypeExpr(rng, options, depth)}` : ""};`;
    }
  })();
  return annotation + body;
}

function generateAnnotations(rng: XorShift32, options: FuzzOptions, depth: number): string {
  const chunks: string[] = [];
  if (rng.chance(0.2)) {
    chunks.push("/**");
    chunks.push(` * ${generateFreeText(rng)}`);
    if (rng.chance(0.5)) {
      chunks.push(` * @param ${generateIdentifier(rng, false)} ${generateFreeText(rng)}`);
    }
    chunks.push(" */");
  }
  if (rng.chance(0.3)) {
    chunks.push(`@${generateIdentifier(rng, false)}(${generateValueExpr(rng, options, depth)})`);
  }
  if (rng.chance(0.15)) {
    chunks.push(`#suppress "warning" "${generateFreeText(rng)}"`);
  }
  return chunks.length === 0 ? "" : `${chunks.join("\n")}\n`;
}

function generateModelLikeBlock(rng: XorShift32, options: FuzzOptions, depth: number): string {
  const propertyCount = rng.int(0, 6);
  const parts: string[] = [];
  for (let i = 0; i < propertyCount; i++) {
    if (rng.chance(0.2)) {
      parts.push(`...${generateIdentifier(rng)}${rng.chance(0.4) ? ";" : ","}`);
    } else {
      parts.push(
        `${generateIdentifier(rng, false)}${rng.chance(0.3) ? "?" : ""}: ${generateTypeExpr(rng, options, depth + 1)}${rng.chance(0.5) ? ";" : ","}`,
      );
    }
  }
  return `{ ${parts.join(" ")} }`;
}

function generateInterfaceBody(rng: XorShift32, options: FuzzOptions, depth: number): string {
  const count = rng.int(1, 5);
  const members: string[] = [];
  for (let i = 0; i < count; i++) {
    members.push(
      `${generateIdentifier(rng, false)}(${generateParameters(rng, options, depth + 1)}): ${generateTypeExpr(rng, options, depth + 1)}${rng.chance(0.5) ? ";" : ","}`,
    );
  }
  return members.join(" ");
}

function generateUnionBody(rng: XorShift32, options: FuzzOptions, depth: number): string {
  const count = rng.int(1, 6);
  const variants: string[] = [];
  for (let i = 0; i < count; i++) {
    variants.push(
      `${generateIdentifier(rng, false)}: ${generateTypeExpr(rng, options, depth + 1)}${rng.chance(0.5) ? ";" : ","}`,
    );
  }
  return variants.join(" ");
}

function generateEnumBody(rng: XorShift32): string {
  const count = rng.int(1, 8);
  const members: string[] = [];
  for (let i = 0; i < count; i++) {
    members.push(`${generateIdentifier(rng, false)}${rng.chance(0.3) ? `: ${rng.int(0, 256)}` : ""}`);
  }
  return members.join(rng.chance(0.5) ? ", " : "; ");
}

function generateParameters(rng: XorShift32, options: FuzzOptions, depth: number): string {
  const count = rng.int(0, 5);
  const params: string[] = [];
  for (let i = 0; i < count; i++) {
    const rest = i === count - 1 && rng.chance(0.2) ? "..." : "";
    params.push(
      `${rest}${generateIdentifier(rng, false)}${rng.chance(0.3) ? "?" : ""}: ${generateTypeExpr(rng, options, depth + 1)}`,
    );
  }
  return params.join(", ");
}

function generateTypeExpr(rng: XorShift32, options: FuzzOptions, depth: number): string {
  if (depth >= options.maxDepth) {
    return generateAtomicType(rng);
  }
  const kind = rng.int(0, 8);
  switch (kind) {
    case 0:
      return `${generateTypeExpr(rng, options, depth + 1)} | ${generateTypeExpr(rng, options, depth + 1)}`;
    case 1:
      return `${generateTypeExpr(rng, options, depth + 1)} & ${generateTypeExpr(rng, options, depth + 1)}`;
    case 2:
      return `[${generateTypeExpr(rng, options, depth + 1)}, ${generateTypeExpr(rng, options, depth + 1)}]`;
    case 3:
      return `(${generateTypeExpr(rng, options, depth + 1)})`;
    case 4:
      return `{ ${generateIdentifier(rng, false)}: ${generateTypeExpr(rng, options, depth + 1)}; }`;
    case 5:
      return `${generateAtomicType(rng)}[]`;
    case 6:
      return `${generateIdentifier(rng)}<${generateTypeExpr(rng, options, depth + 1)}>`;
    default:
      return generateAtomicType(rng);
  }
}

function generateAtomicType(rng: XorShift32): string {
  return rng.pick([
    "string",
    "int32",
    "int64",
    "float64",
    "bytes",
    "boolean",
    "unknown",
    "never",
    "void",
    "valueof string",
    "typeof Foo",
    generateIdentifier(rng),
    `"${generateFreeText(rng)}"`,
    `${rng.int(0, 2048)}`,
    "true",
    "false",
  ]);
}

function generateValueExpr(rng: XorShift32, options: FuzzOptions, depth: number): string {
  const kind = depth >= options.maxDepth ? 0 : rng.int(0, 5);
  switch (kind) {
    case 0:
      return rng.pick(["true", "false", `"${generateFreeText(rng)}"`, `${rng.int(0, 8192)}`]);
    case 1:
      return `#{ ${generateIdentifier(rng, false)}: ${generateValueExpr(rng, options, depth + 1)} }`;
    case 2:
      return `#[${generateValueExpr(rng, options, depth + 1)}, ${generateValueExpr(rng, options, depth + 1)}]`;
    case 3:
      return generateIdentifier(rng);
    default:
      return `"${generateFreeText(rng)}"`;
  }
}

function generateIdentifier(rng: XorShift32, allowBacktick: boolean = true): string {
  const plain = `${rng.pick(["Foo", "Bar", "Baz", "Thing", "Ns", "Api", "Item", "Node"])}${rng.int(0, 1000)}`;
  if (allowBacktick && rng.chance(0.15)) {
    return `\`${plain}-${rng.int(0, 10)}\``;
  }
  return plain;
}

function generateNamespacePath(rng: XorShift32): string {
  const segments = rng.int(1, 4);
  const values: string[] = [];
  for (let i = 0; i < segments; i++) {
    values.push(generateIdentifier(rng, false));
  }
  return values.join(".");
}

function generateFreeText(rng: XorShift32): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_ ";
  let text = "";
  const length = rng.int(1, 18);
  for (let i = 0; i < length; i++) {
    text += chars[rng.int(0, chars.length)];
  }
  return text.trim() || "x";
}

async function minimizeFailure(failure: OracleFailure, compilerOracle?: CompilerOracle): Promise<string> {
  let current = failure.source;
  let granularity = 2;

  while (current.length > 1) {
    const chunkSize = Math.ceil(current.length / granularity);
    let changed = false;

    for (let i = 0; i < granularity; i++) {
      const start = i * chunkSize;
      const end = Math.min(current.length, start + chunkSize);
      if (start >= end) continue;

      const candidate = `${current.slice(0, start)}${current.slice(end)}`;
      if (candidate.length === current.length) continue;
      if (await stillFails(failure.oracle, candidate, compilerOracle)) {
        current = candidate;
        granularity = Math.max(2, granularity - 1);
        changed = true;
        break;
      }
    }

    if (!changed) {
      if (granularity >= current.length) {
        break;
      }
      granularity = Math.min(current.length, granularity * 2);
    }
  }

  return current;
}

async function stillFails(
  oracle: OracleName,
  source: string,
  compilerOracle?: CompilerOracle,
): Promise<boolean> {
  try {
    switch (oracle) {
      case "scanner":
        runScannerOracle(source);
        break;
      case "parser":
        runParserOracle(source);
        break;
      case "formatter":
        if (runParserOracle(source).parseDiagnostics.length > 0) {
          return false;
        }
        await runFormatterOracle(source);
        break;
      case "compiler":
        if (compilerOracle === undefined) return false;
        await runCompilerOracle(source, compilerOracle);
        break;
    }
    return false;
  } catch {
    return true;
  }
}
