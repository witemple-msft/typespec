import { getNamespaceFullName, Namespace, Program } from "../core/index.js";
import { Type } from "../core/types.js";
import { $, Typekit } from "./typekit/index.js";

export const TYPE_PROXY = Symbol.for("TypeSpec.TypeProxy");

/**
 * A value that represents a TypeSpec type and may be used _as if_ it were the type itself in proxiable contexts.
 *
 * If an API method accepts a `Proxiable` argument, it means that you can pass either a reference to the type itself
 * or a `TypeProxy` object, and the method will treat them as equivalent.
 *
 * @see {@link isTypeProxy}
 * @see {@link createTypeProxy}
 */
declare class TypeProxy<T extends Type = Type> {
  // This marker is here so that TypeScript does not remove the `T` type parameter from the class as unused,
  // thwarting type inference.
  // eslint-disable-next-line no-unused-private-class-members
  #marker: T;
}

export type { TypeProxy };

/**
 * Determines if a value is a type proxy.
 *
 * @param proxiable - a value that may be a `Type` or a `TypeProxy`
 * @returns true if the value is a `TypeProxy`, false otherwise
 */
export function isTypeProxy<T extends Type>(proxiable: Proxiable<T>): proxiable is TypeProxy<T> {
  return typeof (proxiable as any)?.[TYPE_PROXY] === "function";
}

/**
 * A type or a proxy for a type.
 */
export type Proxiable<T extends Type> = T | TypeProxy<T>;

/**
 * A specification for extra fields that may be exposed on a type proxy.
 */
export interface TypeProxySpec {
  [k: string]: Specified<Type>;
}

/**
 * An entry in a `TypeProxySpec` for a specific type and its fields.
 */
export type Specified<T extends Type> = TypeProxy<T> & (TypeProxySpec | {});

type TypeWith<K extends Type["kind"]> = Extract<Type, { kind: K }>;

/**
 * Creates a type proxy resolver that resolves a type by its fully-qualified name.
 *
 * This is the root resolver for type proxies created using `createTypeProxy`.
 *
 * @param kind - the expected `kind` of the proxied type
 * @param name - the fully-qualified name of the type to resolve
 * @returns a resolver function that resolves the type by its fully-qualified name
 * @throws if the type cannot be resolved in the given program or if the resolved type does not match the expected kind
 */
function createResolverByFqn<Kind extends Type["kind"]>(kind: Kind, name: string): Resolver<Kind> {
  return function resolve(program: Program) {
    const [type, diagnostics] = program.resolveTypeReference(name);

    if (diagnostics.length > 0) {
      throw new Error(`Failed to resolve type reference for ${name}`);
    }

    if (type?.kind !== kind) {
      throw new Error(`Expected '${name}' to have type kind '${kind}', but got '${type?.kind}'`);
    }

    return type as TypeWith<Kind>;
  };
}

interface Resolver<Kind extends Type["kind"]> {
  (program: Program): TypeWith<Kind>;
}

/**
 * Create a proxy for a type with the given fully-qualified name.
 *
 * A proxy may be used _as if_ it were a reference to the type itself in proxiable contexts. This allows you to create
 * ergonomic representations of TypeSpec types that can be passed to API methods that accept `Proxiable` arguments.
 *
 * Not all API methods accept proxies. If a method does not accept a `Proxiable` argument, you must pass a reference
 * to the type itself or `resolve` the proxy to a type within a specific program.
 *
 * @see {@link TypeProxy}
 *
 * @param kind - the `kind` of the type to proxy
 * @param fullyQualifiedName - the fully-qualified name of the type to proxy
 * @returns a proxy for the type
 */
export function createTypeProxy<Spec extends TypeProxySpec, Kind extends Type["kind"]>(
  kind: Kind,
  fullyQualifiedName: string,
): TypeProxy<TypeWith<Kind>> & Spec {
  return _createTypeProxy<Kind, Spec>(kind, createResolverByFqn(kind, fullyQualifiedName));
}

/**
 * Create a proxy for a type using the given resolver function.
 *
 * @internal
 * @param kind - the `kind` of the type under proxy
 * @param resolve - a resolver function that resolves the type within a given program
 * @returns a type proxy
 */
function _createTypeProxy<Kind extends Type["kind"], Spec extends TypeProxySpec>(
  kind: Kind,
  resolve: Resolver<Kind>,
): TypeProxy<TypeWith<Kind>> & Spec {
  const resolutionCache = new WeakMap<Program, TypeWith<Kind>>();
  const cache: Record<string, TypeProxy> = {};

  function resolveMemoized(program: Program): TypeWith<Kind> {
    const resolutionCached = resolutionCache.get(program);

    if (resolutionCached) return resolutionCached;

    const resolved = resolve(program);

    resolutionCache.set(program, resolved);

    return resolved;
  }

  const proxy = new Proxy(
    {},
    {
      get(target, prop) {
        if (prop === TYPE_PROXY) return resolveMemoized;

        if (typeof prop === "symbol") return undefined;

        const factory = MEMBER_PROXIES[kind];

        if (factory) return (cache[prop] ??= factory(resolve, prop));

        return Reflect.get(target, prop, target);
      },
      getPrototypeOf() {
        return TypeProxy.prototype;
      },
    },
  ) as TypeProxy<TypeWith<Kind>> & Spec;

  return proxy as TypeProxy<TypeWith<Kind>> & Spec;
}

interface MemberProxyFactory<Kind extends Type["kind"]> {
  (resolve: Resolver<Kind>, name: string): TypeProxy;
}

function getFullyQualifiedName(type: Extract<Type, { namespace?: Namespace }>): string {
  if (type.kind === "Namespace" && type.name === "") {
    return "";
  } else if (!type.namespace) {
    return type.name ?? "<anonymous>";
  } else {
    return getNamespaceFullName(type.namespace) + "." + type.name;
  }
}

/**
 * Definitions for methods of accessing members of a type by kind.
 *
 * The type proxy implementation uses this to forward accesses to properties of the proxy to the underlying type's
 * primary members.
 *
 * For example, the primary members of Enum types are EnumMembers, so the Enum member proxy handler will first resolve
 * the proxied Enum type and then look up the requested enum member by name, throwing an error if no such member exists.
 *
 * This creates a "resolver chain" where member proxies resolve their parent types and then look up the requested member.
 *
 * All resolver computations are memoized by the type proxy implementation to avoid redundant resolutions.
 */
const MEMBER_PROXIES: { [Kind in Type["kind"]]?: MemberProxyFactory<Kind> } = {
  Enum(resolve, name) {
    return _createTypeProxy("EnumMember", function resolveEnumMember(program) {
      const enumType = resolve(program);

      const member = enumType.members.get(name);

      if (!member) {
        const fqn = getFullyQualifiedName(enumType);

        throw new Error(`No such member '${name}' in enum '${fqn}'`);
      }

      return member;
    });
  },
  Interface(resolve, name) {
    return _createTypeProxy("Operation", function resolveOperation(program) {
      const interfaceType = resolve(program);

      const operation = interfaceType.operations.get(name);

      if (!operation) {
        const fqn = getFullyQualifiedName(interfaceType);

        throw new Error(`No such operation '${name}' in interface '${fqn}'`);
      }

      return operation;
    });
  },
  Scalar(resolve, name) {
    return _createTypeProxy("ScalarConstructor", function resolveScalarMember(program) {
      const scalarType = resolve(program);

      const member = scalarType.constructors.get(name);

      if (!member) {
        const fqn = getFullyQualifiedName(scalarType);

        throw new Error(`No such constructor '${name}' in scalar '${fqn}'`);
      }

      return member;
    });
  },
  Model(resolve, name) {
    return _createTypeProxy("ModelProperty", function resolveProperty(program) {
      const modelType = resolve(program);

      const property = modelType.properties.get(name);

      if (!property) {
        const fqn = getFullyQualifiedName(modelType);

        throw new Error(`No such property '${name}' in model '${fqn}'`);
      }

      return property;
    });
  },
};

/**
 * A set of types that accepts proxies as inputs, but always resolves them to their underlying types.
 *
 * This can be used in place of a Set<Type> to allow users to pass proxies as entries into the Set.
 */
export class ProxySet<T extends Type> {
  #inner: Set<T>;
  #tk: Typekit;

  /**
   * Create a new ProxySet with the given program and initial values.
   *
   * @param program - the program to bind this set to
   * @param values - an optional sequence of values to initialize the set with
   */
  constructor(
    private readonly program: Program,
    values: Iterable<Proxiable<T>> = [],
  ) {
    this.#tk = $(program);
    this.#inner = new Set<T>();

    for (const v of values) {
      this.#inner.add(this.#tk.proxy.resolve(v));
    }
  }

  add(value: Proxiable<T>): this {
    this.#inner.add(this.#tk.proxy.resolve(value));

    return this;
  }

  clear(): void {
    this.#inner.clear();
  }

  delete(value: Proxiable<T>): boolean {
    return this.#inner.delete(this.#tk.proxy.resolve(value));
  }

  forEach(callbackfn: (value: T, value2: T, set: ProxySet<T>) => void, that?: any): void {
    this.#inner.forEach((value, value2) => {
      return callbackfn.apply(that, [
        this.#tk.proxy.resolve(value),
        this.#tk.proxy.resolve(value2),
        this,
      ]);
    });
  }

  has(value: Proxiable<T>): boolean {
    return this.#inner.has(this.#tk.proxy.resolve(value));
  }

  get size(): number {
    return this.#inner.size;
  }

  entries(): IterableIterator<[T, T]> {
    return this.#inner.entries();
  }

  keys(): IterableIterator<T> {
    return this.#inner.keys();
  }

  values(): IterableIterator<T> {
    return this.#inner.values();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.#inner[Symbol.iterator]();
  }

  [Symbol.toStringTag]: string = "ProxySet";
}
