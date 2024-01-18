# JSON Interoperability for TypeSpec Emitters

This document describes a standard JSON encoding for TypeSpec types. We use the language of RFC 2119 _Key words for use in RFCs to Indicate Requirement Levels_ to clarify the obligations of TypeSpec emitters for JSON interoperability.

In general, any two emitters that use this standard JSON encoding method will be compatible.

Emitters SHOULD encode JSON data according to the methods prescribed in this document, but MAY use alternative methods if appropriate. Emitters that do not follow this prescription exactly are likely incompatible with other TypeSpec emitters. Emitters that do follow this prescription will be referred to as "compliant emitters."

## Representative Values

TypeSpec describes the shapes of data, and "representative value" will mean a value that conforms to a given TypeSpec type. For example, a JavaScript `string` is a representative value for a TypeSpec `string`.

The following Python dictionary:

```python
{ "hello": "world" }
```

could be a representative value for the following TypeSpec model:

```tsp
model HelloWorld {
  hello: string;
}
```

A `string` is a TypeSpec `scalar` type, and `HelloWorld` is a TypeSpec `model`. We call the type of type (i.e. `model` or `scalar`) a "type class".

The next section prescribes how to encode representative values of a given type class in JSON for interoperability.

## JSON Encoding

Choosing a JSON encoding of a value given a TypeSpec type begins with the type class.

### Model

Model types are classified into two categories, standard library models and ordinary models.

#### Standard Models

If the model is a standard library model, compliant emitters MUST recognize it and encode it according to the following rules:

- `TypeSpec.Array<Element>`: encoded as a JSON array with any number of elements where each element MUST be a compliant encoding of the instance type of the template parameter `Element`.
- `TypeSpec.Record<Element>`: encoded as a JSON object with any number of properties, where the value of each property MUST be a compliant encoding of the instance type of the template parameter `Element`.

All other model types are considered "ordinary" models.

#### Ordinary Models

Compliant emitters must represent an ordinary model type as a JSON object.

For each property in the model type, the encoded JSON object must have a corresponding property where the key has the same text as the property's `name`.

**`@encode`**: Compliant emitters MUST check for the presence of the `@encode` decorator on model properties using the `getEncode` standard library function. If a model property has an encoding specification, then encoding of the property value must be performed as described in the section [_Encoding Types_](#encoding-types) below.

Otherwise, the value corresponding to the JSON object property for the given model property MUST be a compliant encoding of the model property's `type`.

**NOTE**: Models in TypeSpec are "open," meaning that a JSON value encoding a TypeSpec model's representative value _MAY_ include more properties than are specified in the model, and compliant emitters _MUST NOT_ yield an error. Compliant emitters offer mechanisms to expose additional properties not specified in the model when decoding JSON.

### Scalar

Emitters will recognize a set of scalars, meaning that they have been programmed to account for the scalars' expected encoding.

**`@encode`**: Compliant emitters MUST check for the presence of the `@encode` decorator on scalar types using the `getEncode` standard library function. If a scalar has an encoding specification, then encoding must be performed as described in the section [_Encoding Types_](#encoding-types) below. Otherwise, it is as follows:

Compliant emitters _MUST_ recognize and encode all built-in scalar types (i.e. those scalars that are defined as direct children of the `TypeSpec` namespace) as follows:

- `TypeSpec.bytes`: a JSON string containing the bytes of the representative value encoded as Base64 according to RFC 4648.
- `TypeSpec.numeric`: a JSON string containing a base 10 representation of the number to an appropriate level of precision as specified by the representative value.
- `TypeSpec.integer`: a JSON string containing the base 10 representation of the integer with exact precision.
- `TypeSpec.float`: encoded as `TypeSpec.numeric`.
- `TypeSpec.int64`: encoded as `TypeSpec.integer`.
- `TypeSpec.int32`: encoded as `TypeSpec.safeint`.
- `TypeSpec.int16`: encoded as `TypeSpec.safeint`.
- `TypeSpec.int8`: encoded as `TypeSpec.safeint`.
- `TypeSpec.uint64`: encoded as `TypeSpec.integer`.
- `TypeSpec.uint32`: encoded as `TypeSpec.safeint`.
- `TypeSpec.uint16`: encoded as `TypeSpec.safeint`.
- `TypeSpec.uint8`: encoded as `TypeSpec.safeint`.
- `TypeSpec.safeint`: a JSON number with exact precision and no fractional part.
- `TypeSpec.float64`: a JSON number with exact precision.
- `TypeSpec.float32`: encoded as `TypeSpec.float32`.
- `TypeSpec.decimal`: encoded as `TypeSpec.numeric`.
- `TypeSpec.decimal128`: a JSON string containing a base 10 representation of the number to an appropriate level of precision as specified by the representative value.
- `TypeSpec.string`: a JSON string containing the same text as the representative value.
- `TypeSpec.plainDate`: a JSON string containing an ISO 8601 calendar date (e.g. "2024-01-18").
- `TypeSpec.plainTime`: a JSON string containing an ISO 8601 time string (e.g. "T01:18:00").
- `TypeSpec.utcDateTime`: a JSON string .
- `TypeSpec.offsetDateTime`: .
- `TypeSpec.duration`: .
- `TypeSpec.boolean`: a JSON boolean of the same truth value as the representative value.
- `TypeSpec.unixTimestamp32`: a JSON number containing the timestamp's value in seconds.
- `TypeSpec.url`: a JSON string containing the string representation of the representative URL value.

Compliant emitters MUST encode all other scalars as follows:

If the emitter recognizes the scalar and a particular encoding of the scalar is prescribed by the library where the scalar is defined, the emitter MUST honor the encoding prescribed by the library where the scalar is defined. Emitters MAY recognize any non-builtin scalar types that they see fit.

If the emitter does not recognize the scalar, and the scalar has a parent (i.e. it `extends` another scalar type), then the representative value MUST be encoded as if it were representative of the parent scalar.

If the emitter does not recognize the scalar, and the scalar does not have a parent type, the emitter MUST yield an error.

### Union

Compliant emitters MUST encode a union type's representative value as a JSON encoding satisfying _at least one_ variant of the union.

#### Discriminants

<!-- TODO -->

### Intersection

Compliant emitters MUST encode an intersection type's representative value as a JSON value satisfying _all_ constituents of the intersection.

In other words, decoding of the JSON value must succeed for each of the individual constituent types independently.

### Enum

### Intrinsic

Intrinsic types are built-in special types

#### `never` and `ErrorType`

Compliant emitters MUST NOT encode a `never` type or `ErrorType` type as any JSON value, and MUST yield an error instead.

#### `unknown`

Compliant emitters MUST encode an `unknown` type as any valid JSON value.

#### `null` and `void`

Compliant emitters MUST encode a `null` or `void` type as a JSON literal value `null`.

**NOTE**: Encoding `void` as JSON `null` is only required if the emitter must produce a JSON value for this type, but the emitter should try to avoid JSON entirely. For example, when an HTTP operation returns `void`, the response body is omitted entirely.

### Literals

TypeSpec supports several literal value types. In the case of literal types there may be no representative value, as the type itself captures the value. Encoding of literal types, therefore, MAY be performed without concern for the representative value, if one even exists.

#### String

Compliant emitters MUST encode string value types as JSON string values containing the same text as the type.

#### Number

Compliant emitters MUST encode number value types as JSON number values with the same value as contained in the type, with exact precision.

#### Boolean

Compliant emitters MUST encode boolean value types as JSON boolean values with the same value as contained in the type.

#### EnumMember

If the `EnumMember` type's `value` is a string, compliant emitters MUST encode the enum member type as if it were a string literal type with the value being equal to the enum member's `value`.

If the `EnumMember` type's `value` is a number, compliant emitters MUST
encode the enum member type as if it were a number literal type with the value being equal to the enum member's `value`.

#### Tuple

Compliant emitters MUST encode tuple value types as JSON array values of the same length as the tuple type.

The value at each position of the array MUST be a compliant encoding of the type at the corresponding position in the tuple type.

#### StringTemplate

Compliant emitters MUST encode string template value types as JSON string values with the same value as the instantiated string template.

Emitters MUST call `stringTemplateToString` to instantiate the string template.

#### Object

Compliant emitters MUST encode object literal value types as JSON object values with the same set of properties as the TypeSpec object literal type.

The value of each property in the JSON object MUST be a compliant encoding of the type of the corresponding property in the TypeSpec object literal type.

### Non-value Types

TypeSpec has several types for which there is no logical shape or "value." The JSON representation of such types is not defined. These include:

- Namespace (`namespace`)
- Interface (`interface`)
- Operation (`op`)
- ModelProperty
- Decorator
- TemplateParameter
- UnionVariant
- etc.

Any type not mentioned in the sections above is assumed to be a non-value type.

### Encoding Types

When encoding a type for which an `@encode` binding exists, compliant emitters MUST use the information returned by `getEncode` to transform the representative value. `getEncode` returns the following data:

```ts
interface EncodeData {
  encoding: string;
  type: Scalar;
}
```

The emitter may or may not recognize the `encoding` specified, meaning that it may or may not have been programmed to account for this encoding.

Compliant emitters MUST recognize the following well-known encodings:

- of `TypeSpec.dateTime`: `"rfc3339"`, `"rfc7231"`, `"unixTimestamp"`
- of `TypeSpec.duration`: `"ISO8601"`, `"seconds"`
- of `TypeSpec.bytes`: `"base64"`, `"base64url"`

Emitters MAY recognize additional encodings as they see fit.

If a compliant emitter does not recognize the `encoding`, or if it does not know how to transform a representative value of the original type using the encoding, it MUST yield an error.

Otherwise, a compliant emitter MUST transform the representative value according to the given `encoding`, and encode the value as JSON as if it is representative of the `type` in the `EncodeData`.

This process applies to scalar types, in which values of the `@encode`d scalar are transformed from the source type to the target type before encoding; as well as to model properties, in which the values of the properties are transformed before encoding as the target `type`.
