import { deepStrictEqual, notStrictEqual, ok, strictEqual } from "assert";
import { DecoratorContext, IntrinsicType, Model, ModelProperty, Operation, Scalar, Type } from "../../src/core/types.js";
import { getDoc } from "../../src/index.js";
import { TestHost, createTestHost, expectDiagnostics } from "../../src/testing/index.js";

describe("compiler: operations", () => {
  let testHost: TestHost;

  beforeEach(async () => {
    testHost = await createTestHost();
  });

  it("can return void", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      @test op foo(): void;
    `
    );

    const { foo } = (await testHost.compile("./main.tsp")) as { foo: Operation };
    strictEqual(foo.returnType.kind, "Intrinsic");
    strictEqual((foo.returnType as IntrinsicType).name, "void");
  });

  it("can accept a parameter", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      @test op foo(@test bar: string): void;
    `
    );

    const { foo, bar } = (await testHost.compile("./main.tsp")) as {
      foo: Operation,
      bar: ModelProperty
    };

    strictEqual(foo.returnType.kind, "Intrinsic");
    strictEqual((foo.returnType as IntrinsicType).name, "void");

    strictEqual(bar.kind, "ModelProperty");
    strictEqual(bar.type.kind, "Scalar");
    strictEqual((bar.type as Scalar).name, "string");
  });

  it("can accept an optional parameter", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      @test op foo(@test bar?: string): void;
    `
    );

    const { foo, bar } = (await testHost.compile("./main.tsp")) as {
      foo: Operation,
      bar: ModelProperty
    };

    strictEqual(foo.returnType.kind, "Intrinsic");
    strictEqual((foo.returnType as IntrinsicType).name, "void");

    strictEqual(bar.kind, "ModelProperty");
    strictEqual(bar.optional, true);
    strictEqual(bar.type.kind, "Scalar");
    strictEqual((bar.type as Scalar).name, "string");
  });

  it("keeps reference to source operation", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      @test op a(): void;
      @test op b is a;
      `
    );
    const { a, b } = (await testHost.compile("main.tsp")) as { a: Operation; b: Operation };
    strictEqual(b.sourceOperation, a);
  });

  it("operation reference parameters are spread in target operation", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      @test op a(one: string, two: string): void;
      @test op b is a;
      `
    );
    const { a, b } = (await testHost.compile("main.tsp")) as { a: Operation; b: Operation };
    notStrictEqual(b.parameters, a.parameters);
    notStrictEqual(b.parameters.properties.get("one"), a.parameters.properties.get("one"));
    notStrictEqual(b.parameters.properties.get("two"), a.parameters.properties.get("two"));
    strictEqual(
      b.parameters.properties.get("one")?.sourceProperty,
      a.parameters.properties.get("one")
    );
    strictEqual(
      b.parameters.properties.get("two")?.sourceProperty,
      a.parameters.properties.get("two")
    );
  });

  it("can decorate operation parameters independently", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      @test op a(@doc("base doc") one: string): void;
      @test op b is a;

      @@doc(b::parameters.one, "override for b")
      `
    );
    const { a, b } = (await testHost.compile("main.tsp")) as { a: Operation; b: Operation };
    strictEqual(getDoc(testHost.program, b.parameters.properties.get("one")!), "override for b");
    strictEqual(getDoc(testHost.program, a.parameters.properties.get("one")!), "base doc");
  });

  it("can decorate operation parameters independently from a template operation", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      @test op a<T>(@doc("base doc") one: T): void;
      @test op b is a<string>;
      @test op c is a<string>;

      @@doc(b::parameters.one, "override for b")
      `
    );
    const { b, c } = (await testHost.compile("main.tsp")) as { b: Operation; c: Operation };
    strictEqual(getDoc(testHost.program, b.parameters.properties.get("one")!), "override for b");
    strictEqual(getDoc(testHost.program, c.parameters.properties.get("one")!), "base doc");
  });

  it("can be templated and referenced to define other operations", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `op Foo<TName, TPayload>(name: TName, payload: TPayload): boolean;

      @test
      op newFoo is Foo<string, string>;`
    );

    const [result, diagnostics] = await testHost.compileAndDiagnose("./main.tsp");
    expectDiagnostics(diagnostics, []);

    const { newFoo } = result as { newFoo: Operation };
    strictEqual(newFoo.parameters.properties.size, 2);
    const props = Array.from(newFoo.parameters.properties.values());

    strictEqual(props[0].name, "name");
    strictEqual(props[0].type.kind, "Scalar");
    strictEqual(props[1].name, "payload");
    strictEqual(props[1].type.kind, "Scalar");
  });

  it("can be defined based on other operation references", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `op Foo<TName, TPayload>(name: TName, payload: TPayload): boolean;
      op NewFooBase<TPayload> is Foo<string, TPayload>;

      @test
      op newFoo is NewFooBase<string>;`
    );

    const [result, diagnostics] = await testHost.compileAndDiagnose("./main.tsp");
    expectDiagnostics(diagnostics, []);

    const { newFoo } = result as { newFoo: Operation };
    strictEqual(newFoo.parameters.properties.size, 2);
    const props = Array.from(newFoo.parameters.properties.values());

    strictEqual(props[0].name, "name");
    strictEqual(props[0].type.kind, "Scalar");
    strictEqual(props[1].name, "payload");
    strictEqual(props[1].type.kind, "Scalar");
  });

  it("can reference an operation when being defined in an interface", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `op Foo<TName, TPayload>(name: TName, payload: TPayload): boolean;

      interface Test {
        @test
        newFoo is Foo<string, string>;
      }`
    );

    const { newFoo } = (await testHost.compile("./main.tsp")) as { newFoo: Operation };
    strictEqual(newFoo.parameters.properties.size, 2);
    const props = Array.from(newFoo.parameters.properties.values());

    strictEqual(props[0].name, "name");
    strictEqual(props[0].type.kind, "Scalar");
    strictEqual(props[1].name, "payload");
    strictEqual(props[1].type.kind, "Scalar");
  });

  it("can reference an operation defined inside an interface", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      interface Foo {
        bar(): boolean;
      }
      
      @test op newFoo is Foo.bar;
      `
    );

    const { newFoo } = (await testHost.compile("./main.tsp")) as { newFoo: Operation };

    strictEqual(newFoo.returnType.kind, "Scalar" as const);
    strictEqual(newFoo.returnType.name, "boolean");
  });

  it("can reference an operation defined in the same interface", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      interface Foo {
        bar(): boolean;
        @test op newFoo is Foo.bar;
      }
      `
    );

    const { newFoo } = (await testHost.compile("./main.tsp")) as { newFoo: Operation };

    strictEqual(newFoo.returnType.kind, "Scalar" as const);
    strictEqual(newFoo.returnType.name, "boolean");
  });

  it("doesn't apply operation decorators to referenced signature", async () => {
    testHost.addJsFile("test.js", {
      $alpha() {},
      $beta() {},
    });

    testHost.addTypeSpecFile(
      "main.tsp",
      `
      import "./test.js";
      @alpha
      @test
      op Foo<T>(): T;

      @beta
      op bar is Foo<string>;
      `
    );

    const { Foo } = (await testHost.compile("./main.tsp")) as { Foo: Operation };
    deepStrictEqual(
      Foo.decorators.map((x) => x.decorator.name),
      ["$test", "$alpha"]
    );
  });

  it("applies the decorators of the referenced operation and its transitive references", async () => {
    const alphaTargets = new Map<Type, Type>();
    const betaTargets = new Set<Type>();
    const gammaTargets = new Set<Type>();

    testHost.addJsFile("test.js", {
      $alpha(context: DecoratorContext, target: Type, param: Type) {
        alphaTargets.set(target, param);
      },

      $beta(context: DecoratorContext, target: Type) {
        betaTargets.add(target);
      },

      $gamma(context: DecoratorContext, target: Type) {
        gammaTargets.add(target);
      },
    });

    testHost.addTypeSpecFile(
      "main.tsp",
      `
      import "./test.js";
      @alpha(TPayload)
      op Foo<TName, TPayload>(name: TName, payload: TPayload): boolean;

      @beta
      op NewFooBase<TPayload> is Foo<string, TPayload>;

      @test
      @gamma
      op newFoo is NewFooBase<string>;`
    );

    const { newFoo } = (await testHost.compile("./main.tsp")) as { newFoo: Operation };
    strictEqual(newFoo.parameters.properties.size, 2);

    // Check that the decorators were applied correctly to `newFoo`
    strictEqual(alphaTargets.get(newFoo)?.kind, "Scalar");
    ok(betaTargets.has(newFoo));
    ok(gammaTargets.has(newFoo));
  });

  it("emit diagnostic when operation is referencing itself as signature", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      op foo is foo;
      `
    );
    const diagnostics = await testHost.diagnose("main.tsp");
    expectDiagnostics(diagnostics, [
      {
        code: "circular-op-signature",
        message: "Operation 'foo' recursively references itself.",
      },
    ]);
  });

  it("emit diagnostic when operation(in interface) is referencing itself as signature", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      interface Group {
        foo is Group.foo;
      }
      `
    );
    const diagnostics = await testHost.diagnose("main.tsp");
    expectDiagnostics(diagnostics, [
      {
        code: "circular-op-signature",
        message: "Operation 'foo' recursively references itself.",
      },
    ]);
  });

  it("emit diagnostic when operations reference each other using signature", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      op foo is bar;
      op bar is foo;
      `
    );
    const diagnostics = await testHost.diagnose("main.tsp");
    expectDiagnostics(diagnostics, [
      {
        code: "circular-op-signature",
        message: "Operation 'foo' recursively references itself.",
      },
      {
        code: "circular-op-signature",
        message: "Operation 'bar' recursively references itself.",
      },
    ]);
  });

  it("emit diagnostic when operations(in same interface) reference each other using signature", async () => {
    testHost.addTypeSpecFile(
      "main.tsp",
      `
      interface Group {
        foo is Group.bar;
        bar is Group.foo;
      }
      `
    );
    const diagnostics = await testHost.diagnose("main.tsp");
    expectDiagnostics(diagnostics, [
      {
        code: "circular-op-signature",
        message: "Operation 'foo' recursively references itself.",
      },
      {
        code: "circular-op-signature",
        message: "Operation 'bar' recursively references itself.",
      },
    ]);
  });

  describe("circular ref in decorators", () => {
    let tracked: any[];
    beforeEach(() => {
      tracked = [];
      testHost.addJsFile("track.js", {
        $track: (context: DecoratorContext, ...args: any[]) => {
          tracked.push(args);
        },
      });
    });

    it("operation can reference itself in a decorator", async () => {
      testHost.addTypeSpecFile(
        "main.tsp",
        `
          import "./track.js";
          @test @track(foo)
          op foo(): void;
        `
      );
      const { foo } = await testHost.compile("main.tsp");

      deepStrictEqual(tracked, [[foo, foo]]);
    });

    it("operation can reference another operation which reference back to this one", async () => {
      testHost.addTypeSpecFile(
        "main.tsp",
        `
          import "./track.js";
          @test @track(foo)
          op bar(): void;

          @test @track(bar)
          op foo(): void;
        `
      );
      const { foo, bar } = await testHost.compile("main.tsp");

      deepStrictEqual(tracked, [
        [foo, bar],
        [bar, foo],
      ]);
    });
  });

  describe("type reference in parameter position", () => {
    it("is allowed", async () => {
      testHost.addTypeSpecFile("main.tsp", `
        @test
        model M {
          bar: string;
        }

        @test
        op foo(M): void;
      `);

      const { M, foo } = await testHost.compile("main.tsp") as {
        M: Model,
        foo: Operation
      };

      strictEqual(M.kind, "Model");
      strictEqual(foo.kind, "Operation");
      strictEqual(foo.parameters.properties.size, 1);
      strictEqual(foo.parameters, M);

      const fooBar = foo.parameters.properties.get("bar");
      strictEqual(fooBar?.type.kind, "Scalar");
      strictEqual((fooBar?.type as Scalar).name, "string");
    });

    it("admits templates", async () => {
      testHost.addTypeSpecFile("main.tsp", `
        @test
        model M {
          bar: string;
        }

        op fooLike<T>(T): void;

        @test
        op foo is fooLike<M>;
      `);

      const { M, foo } = await testHost.compile("main.tsp") as {
        M: Model,
        foo: Operation
      };

      strictEqual(M.kind, "Model");
      strictEqual(foo.kind, "Operation");
      strictEqual(foo.parameters.properties.size, 1);
      strictEqual(foo.parameters, M);

      const fooBar = foo.parameters.properties.get("bar");
      strictEqual(fooBar?.type.kind, "Scalar");
      strictEqual((fooBar?.type as Scalar).name, "string");
    });

    it("rejects a reference that is not a model", async () => {
      testHost.addTypeSpecFile("main.tsp", `
        @test
        op foo(string): void;
      `);

      const diagnostics = await testHost.diagnose("main.tsp");

      expectDiagnostics(diagnostics, [
        {
          code: "invalid-type-ref",
          message: "operation parameters refer to a scalar type, but must be a model"
        }
      ]);
    });

    it("rejects a reference that is decorated (parses as model property)", async () => {
      testHost.addTypeSpecFile("main.tsp", `
        @test
        op foo(@test bar): void;
      `);

      const [{ bar }, diagnostics] = await testHost.compileAndDiagnose("main.tsp");

      strictEqual(bar.kind, "ModelProperty");

      expectDiagnostics(diagnostics, [
        {
          code: "token-expected",
          message: "':' expected.",
          severity: "error"
        }
      ]);
    });

    it("handles undefined references", async () => {
      testHost.addTypeSpecFile("main.tsp", `
        op foo(bar): void;
      `);

      const diagnostics = await testHost.diagnose("main.tsp");

      expectDiagnostics(diagnostics, [
        {
          code: "unknown-identifier",
          severity: "error",
          message: "Unknown identifier bar"
        }
      ]);
    });

    it("can accept an optional parameter", async () => {
      testHost.addTypeSpecFile(
        "main.tsp",
        `
        @test op foo(bar?: string): void;
      `
      );

      const { foo } = (await testHost.compile("./main.tsp")) as {
        foo: Operation,
      };

      strictEqual(foo.parameters.properties.size, 1);

      const bar = foo.parameters.properties.get("bar");
      strictEqual(bar?.optional, true);
      strictEqual(bar?.type.kind, "Scalar");
      strictEqual((bar?.type as Scalar).name, "string");
    });
  });
});
