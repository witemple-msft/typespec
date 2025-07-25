import { isPathAbsolute, isUrl, normalizePath, resolvePath } from "../core/path-utils.js";
import type {
  MutableSymbolTable,
  RekeyableMap,
  SourceFile,
  SymbolTable,
  SystemHost,
} from "../core/types.js";

/**
 * Recursively calls Object.freeze such that all objects and arrays
 * referenced are frozen.
 *
 * Does not support cycles. Intended to be used only on plain data that can
 * be directly represented in JSON.
 */
export function deepFreeze<T>(value: T): T {
  if (Array.isArray(value)) {
    value.forEach(deepFreeze);
  } else if (typeof value === "object") {
    for (const prop in value) {
      deepFreeze(value[prop]);
    }
  }

  return Object.freeze(value);
}

/**
 * Deeply clones an object.
 *
 * Does not support cycles. Intended to be used only on plain data that can
 * be directly represented in JSON.
 */
export function deepClone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(deepClone) as any;
  }

  if (typeof value === "object") {
    const obj: any = {};
    for (const prop in value) {
      obj[prop] = deepClone(value[prop]);
    }
    return obj;
  }

  return value;
}

/**
 * Checks if two objects are deeply equal.
 *
 * Does not support cycles. Intended to be used only on plain data that can
 * be directly represented in JSON.
 */
export function deepEquals(left: unknown, right: unknown): boolean {
  if (left === right) {
    return true;
  }
  if (left === null || right === null || typeof left !== "object" || typeof right !== "object") {
    return false;
  }
  if (Array.isArray(left)) {
    return Array.isArray(right) ? arrayEquals(left, right, deepEquals) : false;
  }
  return mapEquals(new Map(Object.entries(left)), new Map(Object.entries(right)), deepEquals);
}

export type EqualityComparer<T> = (x: T, y: T) => boolean;

/**
 * Check if two arrays have the same elements.
 *
 * @param equals Optional callback for element equality comparison.
 *               Default is to compare by identity using `===`.
 */
export function arrayEquals<T>(
  left: T[],
  right: T[],
  equals: EqualityComparer<T> = (x, y) => x === y,
): boolean {
  if (left === right) {
    return true;
  }
  if (left.length !== right.length) {
    return false;
  }
  for (let i = 0; i < left.length; i++) {
    if (!equals(left[i], right[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Check if two maps have the same entries.
 *
 * @param equals Optional callback for value equality comparison.
 *               Default is to compare by identity using `===`.
 */
export function mapEquals<K, V>(
  left: Map<K, V>,
  right: Map<K, V>,
  equals: EqualityComparer<V> = (x, y) => x === y,
): boolean {
  if (left === right) {
    return true;
  }
  if (left.size !== right.size) {
    return false;
  }
  for (const [key, value] of left) {
    if (!right.has(key) || !equals(value, right.get(key)!)) {
      return false;
    }
  }
  return true;
}

export async function getNormalizedRealPath(host: SystemHost, path: string) {
  try {
    return normalizePath(await host.realpath(path));
  } catch (error: any) {
    // This could mean the file got deleted but VSCode still has it in memory. So keep the original path.
    if (error.code === "ENOENT") {
      return normalizePath(path);
    }
    throw error;
  }
}

export async function readUrlOrPath(host: SystemHost, pathOrUrl: string): Promise<SourceFile> {
  if (isUrl(pathOrUrl)) {
    return host.readUrl(pathOrUrl);
  }
  return host.readFile(pathOrUrl);
}

export function resolveRelativeUrlOrPath(base: string, relativeOrAbsolute: string): string {
  if (isUrl(relativeOrAbsolute)) {
    return relativeOrAbsolute;
  } else if (isPathAbsolute(relativeOrAbsolute)) {
    return relativeOrAbsolute;
  } else if (isUrl(base)) {
    return new URL(relativeOrAbsolute, base).href;
  } else {
    return resolvePath(base, relativeOrAbsolute);
  }
}

/**
 * A specially typed version of `Array.isArray` to work around [this issue](https://github.com/microsoft/TypeScript/issues/17002).
 */
export function isArray<T>(
  arg: T | {},
): arg is T extends readonly any[] ? (unknown extends T ? never : readonly any[]) : any[] {
  return Array.isArray(arg);
}

/**
 * Check if argument is not undefined.
 */
export function isDefined<T>(arg: T | undefined): arg is T {
  return arg !== undefined;
}

export function isWhitespaceStringOrUndefined(str: string | undefined): boolean {
  return !str || /^\s*$/.test(str);
}

export function firstNonWhitespaceCharacterIndex(line: string): number {
  return line.search(/\S/);
}

export function distinctArray<T, P>(arr: T[], keySelector: (item: T) => P): T[] {
  const map = new Map<P, T>();
  for (const item of arr) {
    map.set(keySelector(item), item);
  }
  return Array.from(map.values());
}

export function tryParseJson(content: string): any | undefined {
  try {
    return JSON.parse(content);
  } catch {
    return undefined;
  }
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delayInMs: number): T {
  let timer: NodeJS.Timeout | undefined;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delayInMs);
  } as T;
}

/**
 * Remove undefined properties from object.
 */
export function omitUndefined<T extends Record<string, unknown>>(data: T): T {
  return Object.fromEntries(Object.entries(data).filter(([k, v]) => v !== undefined)) as any;
}

/**
 * Extract package.json's tspMain entry point in a given path.
 * @param path Path that contains package.json
 * @param reportDiagnostic optional diagnostic handler.
 */
export function resolveTspMain(packageJson: any): string | undefined {
  if (packageJson?.tspMain !== undefined) {
    return packageJson.tspMain;
  }
  return undefined;
}

/**
 * A map keyed by a set of objects.
 *
 * This is likely non-optimal.
 */
export class MultiKeyMap<K extends readonly object[], V> {
  #currentId = 0;
  #idMap = new WeakMap<object, number>();
  #items = new Map<string, V>();

  get(items: K): V | undefined {
    return this.#items.get(this.compositeKeyFor(items));
  }

  set(items: K, value: V): void {
    const key = this.compositeKeyFor(items);
    this.#items.set(key, value);
  }

  private compositeKeyFor(items: K) {
    return items.map((i) => this.keyFor(i)).join(",");
  }

  private keyFor(item: object) {
    if (this.#idMap.has(item)) {
      return this.#idMap.get(item);
    }

    const id = this.#currentId++;
    this.#idMap.set(item, id);
    return id;
  }
}

/**
 * A map with exactly two keys per value.
 *
 * Functionally the same as `MultiKeyMap<[K1, K2], V>`, but more efficient.
 * @hidden bug in typedoc
 */
export class TwoLevelMap<K1, K2, V> extends Map<K1, Map<K2, V>> {
  /**
   * Get an existing entry in the map or add a new one if not found.
   *
   * @param key1 The first key
   * @param key2 The second key
   * @param create A callback to create the new entry when not found.
   * @param sentinel An optional sentinel value to use to indicate that the
   *                 entry is being created.
   */
  getOrAdd(key1: K1, key2: K2, create: () => V, sentinel?: V): V {
    let map = this.get(key1);
    if (map === undefined) {
      map = new Map();
      this.set(key1, map);
    }
    let entry = map.get(key2);
    if (entry === undefined) {
      if (sentinel !== undefined) {
        map.set(key2, sentinel);
      }
      entry = create();
      map.set(key2, entry);
    }
    return entry;
  }
}

// Adapted from https://github.com/microsoft/TypeScript/blob/bc52ff6f4be9347981de415a35da90497eae84ac/src/compiler/core.ts#L1507
export class Queue<T> {
  #elements: T[];
  #headIndex = 0;

  constructor(elements?: T[]) {
    this.#elements = elements?.slice() ?? [];
  }

  isEmpty(): boolean {
    return this.#headIndex === this.#elements.length;
  }

  enqueue(...items: T[]): void {
    this.#elements.push(...items);
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("Queue is empty.");
    }

    const result = this.#elements[this.#headIndex];
    this.#elements[this.#headIndex] = undefined!; // Don't keep referencing dequeued item
    this.#headIndex++;

    // If more than half of the queue is empty, copy the remaining elements to the
    // front and shrink the array (unless we'd be saving fewer than 100 slots)
    if (this.#headIndex > 100 && this.#headIndex > this.#elements.length >> 1) {
      const newLength = this.#elements.length - this.#headIndex;
      this.#elements.copyWithin(0, this.#headIndex);
      this.#elements.length = newLength;
      this.#headIndex = 0;
    }

    return result;
  }
}

/**
 * The mutable equivalent of a type.
 */
//prettier-ignore
export type Mutable<T> =
  T extends SymbolTable ? T & MutableSymbolTable :
  T extends ReadonlyMap<infer K, infer V> ? Map<K, V> :
  T extends ReadonlySet<infer T> ? Set<T> :
  T extends readonly (infer V)[] ? V[] :
  // brand to force explicit conversion.
  { -readonly [P in keyof T]: T[P] };

//prettier-ignore
type MutableExt<T> =
T extends SymbolTable ? T & MutableSymbolTable :
T extends ReadonlyMap<infer K, infer V> ? Map<K, V> :
T extends ReadonlySet<infer T> ? Set<T> :
T extends readonly (infer V)[] ? V[] :
// brand to force explicit conversion.
{ -readonly [P in keyof T]: T[P] } & { __writableBrand: never };

/**
 * Casts away readonly typing.
 *
 * Use it like this when it is safe to override readonly typing:
 *   mutate(item).prop = value;
 */
export function mutate<T>(value: T): MutableExt<T> {
  return value as MutableExt<T>;
}

export function createStringMap<T>(caseInsensitive: boolean): Map<string, T> {
  return caseInsensitive ? new CaseInsensitiveMap<T>() : new Map<string, T>();
}

class CaseInsensitiveMap<T> extends Map<string, T> {
  get(key: string) {
    return super.get(key.toUpperCase());
  }
  set(key: string, value: T) {
    return super.set(key.toUpperCase(), value);
  }
  has(key: string) {
    return super.has(key.toUpperCase());
  }
  delete(key: string) {
    return super.delete(key.toUpperCase());
  }
}

export function createRekeyableMap<K, V>(entries?: Iterable<[K, V]>): RekeyableMap<K, V> {
  return new RekeyableMapImpl<K, V>(entries);
}

interface RekeyableMapKey<K> {
  key: K;
}

class RekeyableMapImpl<K, V> implements RekeyableMap<K, V> {
  #keys = new Map<K, RekeyableMapKey<K>>();
  #values = new Map<RekeyableMapKey<K>, V>();

  constructor(entries?: Iterable<[K, V]>) {
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  clear(): void {
    this.#keys.clear();
    this.#values.clear();
  }

  delete(key: K): boolean {
    const keyItem = this.#keys.get(key);
    if (keyItem) {
      this.#keys.delete(key);
      return this.#values.delete(keyItem);
    }
    return false;
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    this.#values.forEach((value, keyItem) => {
      callbackfn(value, keyItem.key, this);
    }, thisArg);
  }

  get(key: K): V | undefined {
    const keyItem = this.#keys.get(key);
    return keyItem ? this.#values.get(keyItem) : undefined;
  }

  has(key: K): boolean {
    return this.#keys.has(key);
  }

  set(key: K, value: V): this {
    let keyItem = this.#keys.get(key);
    if (!keyItem) {
      keyItem = { key };
      this.#keys.set(key, keyItem);
    }

    this.#values.set(keyItem, value);
    return this;
  }

  get size() {
    return this.#values.size;
  }

  *entries(): MapIterator<[K, V]> {
    for (const [k, v] of this.#values) {
      yield [k.key, v];
    }
  }

  *keys(): MapIterator<K> {
    for (const k of this.#values.keys()) {
      yield k.key;
    }
  }

  values(): MapIterator<V> {
    return this.#values.values();
  }

  [Symbol.iterator](): MapIterator<[K, V]> {
    return this.entries();
  }

  [Symbol.toStringTag] = "RekeyableMap";

  rekey(existingKey: K, newKey: K): boolean {
    const keyItem = this.#keys.get(existingKey);
    if (!keyItem) {
      return false;
    }
    this.#keys.delete(existingKey);
    const newKeyItem = this.#keys.get(newKey);
    if (newKeyItem) {
      this.#values.delete(newKeyItem);
    }
    keyItem.key = newKey;
    this.#keys.set(newKey, keyItem);
    return true;
  }
}
