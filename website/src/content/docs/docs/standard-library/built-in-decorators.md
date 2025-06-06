---
title: "Built-in Decorators"
toc_min_heading_level: 2
toc_max_heading_level: 3
---
## TypeSpec
### `@continuationToken` {#@continuationToken}

Pagination property defining the token to get to the next page.
It MUST be specified both on the request parameter and the response.
```typespec
@continuationToken
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
  @continuationToken continuationToken: string;
}
@list op listPets(@continuationToken continuationToken: string): Page<Pet>;
```


### `@defaultVisibility` {#@defaultVisibility}

Declares the default visibility modifiers for a visibility class.

The default modifiers are used when a property does not have any visibility decorators
applied to it.

The modifiers passed to this decorator _MUST_ be members of the target Enum.
```typespec
@defaultVisibility(...visibilities: valueof EnumMember[])
```

#### Target

`Enum`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilities | `valueof EnumMember[]` | the list of modifiers to use as the default visibility modifiers. |



### `@discriminated` {#@discriminated}

Specify that this union is discriminated.
```typespec
@discriminated(options?: valueof DiscriminatedOptions)
```

#### Target

`Union`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| options | [valueof `DiscriminatedOptions`](./built-in-data-types.md#DiscriminatedOptions) | Options to configure the serialization of the discriminated union. |

#### Examples

```typespec
@discriminated
union Pet{ cat: Cat, dog: Dog }

model Cat { name: string, meow: boolean }
model Dog { name: string, bark: boolean }
```
Serialized as:
```json
{
  "kind": "cat",
  "value": {
    "name": "Whiskers",
    "meow": true
  }
},
{
  "kind": "dog",
  "value": {
    "name": "Rex",
    "bark": false
  }
}
```

##### Custom property names


```typespec
@discriminated(#{discriminatorPropertyName: "dataKind", envelopePropertyName: "data"})
union Pet{ cat: Cat, dog: Dog }

model Cat { name: string, meow: boolean }
model Dog { name: string, bark: boolean }
```
Serialized as:
```json
{
  "dataKind": "cat",
  "data": {
    "name": "Whiskers",
    "meow": true
  }
},
{
  "dataKind": "dog",
  "data": {
    "name": "Rex",
    "bark": false
  }
}
```


### `@discriminator` {#@discriminator}

Specify the property to be used to discriminate this type.
```typespec
@discriminator(propertyName: valueof string)
```

#### Target

`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| propertyName | [valueof `string`](#string) | The property name to use for discrimination |

#### Examples

```typespec
@discriminator("kind")
model Pet{ kind: string }

model Cat extends Pet {kind: "cat", meow: boolean}
model Dog extends Pet  {kind: "dog", bark: boolean}
```


### `@doc` {#@doc}

Attach a documentation string. Content support CommonMark markdown formatting.
```typespec
@doc(doc: valueof string, formatArgs?: {})
```

#### Target

`unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| doc | [valueof `string`](#string) | Documentation string |
| formatArgs | `{}` | Record with key value pair that can be interpolated in the doc. |

#### Examples

```typespec
@doc("Represent a Pet available in the PetStore")
model Pet {}
```


### `@encode` {#@encode}

Specify how to encode the target type.
```typespec
@encode(encodingOrEncodeAs: Scalar | valueof string | EnumMember, encodedAs?: Scalar)
```

#### Target

`Scalar | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| encodingOrEncodeAs | `Scalar` \| `valueof string \| EnumMember` | Known name of an encoding or a scalar type to encode as(Only for numeric types to encode as string). |
| encodedAs | `Scalar` | What target type is this being encoded as. Default to string. |

#### Examples
##### offsetDateTime encoded with rfc7231


```tsp
@encode("rfc7231")
scalar myDateTime extends offsetDateTime;
```

##### utcDateTime encoded with unixTimestamp


```tsp
@encode("unixTimestamp", int32)
scalar myDateTime extends unixTimestamp;
```

##### encode numeric type to string


```tsp
model Pet {
  @encode(string) id: int64;
}
```


### `@encodedName` {#@encodedName}

Provide an alternative name for this type when serialized to the given mime type.
```typespec
@encodedName(mimeType: valueof string, name: valueof string)
```

#### Target

`unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| mimeType | [valueof `string`](#string) | Mime type this should apply to. The mime type should be a known mime type as described here https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types without any suffix (e.g. `+json`) |
| name | [valueof `string`](#string) | Alternative name |

#### Examples

```typespec
model Certificate {
  @encodedName("application/json", "exp")
  @encodedName("application/xml", "expiry")
  expireAt: int32;
}
```

##### Invalid values


```typespec
@encodedName("application/merge-patch+json", "exp")
             ^ error cannot use subtype
```


### `@error` {#@error}

Specify that this model is an error type. Operations return error types when the operation has failed.
```typespec
@error
```

#### Target

`Model`

#### Parameters
None

#### Examples

```typespec
@error
model PetStoreError {
  code: string;
  message: string;
}
```


### `@errorsDoc` {#@errorsDoc}

Attach a documentation string to describe the error return types of an operation.
If an operation returns a union of success and errors it only describes the errors. See `@returnsDoc` for success documentation.
```typespec
@errorsDoc(doc: valueof string)
```

#### Target

`Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| doc | [valueof `string`](#string) | Documentation string |

#### Examples

```typespec
@errorsDoc("Errors doc")
op get(): Pet | NotFound;
```


### `@example` {#@example}

Provide an example value for a data type.
```typespec
@example(example: valueof unknown, options?: valueof ExampleOptions)
```

#### Target

`Model | Enum | Scalar | Union | ModelProperty | UnionVariant`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| example | `valueof unknown` | Example value. |
| options | [valueof `ExampleOptions`](./built-in-data-types.md#ExampleOptions) | Optional metadata for the example. |

#### Examples

```tsp
@example(#{name: "Fluffy", age: 2})
model Pet {
 name: string;
 age: int32;
}
```


### `@firstLink` {#@firstLink}

Pagination property defining a link to the first page.

It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.
```typespec
@firstLink
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
  @nextLink next: url;
  @prevLink prev: url;
  @firstLink first: url;
  @lastLink last: url;
}
@list op listPets(): Page<Pet>;
```


### `@format` {#@format}

Specify a known data format hint for this string type. For example `uuid`, `uri`, etc.
This differs from the `@pattern` decorator which is meant to specify a regular expression while `@format` accepts a known format name.
The format names are open ended and are left to emitter to interpret.
```typespec
@format(format: valueof string)
```

#### Target

`string | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| format | [valueof `string`](#string) | format name. |

#### Examples

```typespec
@format("uuid")
scalar uuid extends string;
```


### `@friendlyName` {#@friendlyName}

Specifies how a templated type should name their instances.
```typespec
@friendlyName(name: valueof string, formatArgs?: unknown)
```

#### Target

`unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| name | [valueof `string`](#string) | name the template instance should take |
| formatArgs | `unknown` | Model with key value used to interpolate the name |

#### Examples

```typespec
@friendlyName("{name}List", T)
model List<Item> {
  value: Item[];
  nextLink: string;
}
```


### `@inspectType` {#@inspectType}

A debugging decorator used to inspect a type.
```typespec
@inspectType(text: valueof string)
```

#### Target

`unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| text | [valueof `string`](#string) | Custom text to log |



### `@inspectTypeName` {#@inspectTypeName}

A debugging decorator used to inspect a type name.
```typespec
@inspectTypeName(text: valueof string)
```

#### Target

`unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| text | [valueof `string`](#string) | Custom text to log |



### `@invisible` {#@invisible}

Indicates that a property is not visible in the given visibility class.

This decorator removes all active visibility modifiers from the property within
the given visibility class, making it invisible to any context that selects for
visibility modifiers within that class.
```typespec
@invisible(visibilityClass: Enum)
```

#### Target

`ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilityClass | `Enum` | The visibility class to make the property invisible within. |

#### Examples

```typespec
model Example {
  @invisible(Lifecycle)
  hidden_property: string;
}
```


### `@key` {#@key}

Mark a model property as the key to identify instances of that type
```typespec
@key(altName?: valueof string)
```

#### Target

`ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| altName | [valueof `string`](#string) | Name of the property. If not specified, the decorated property name is used. |

#### Examples

```typespec
model Pet {
  @key id: string;
}
```


### `@lastLink` {#@lastLink}

Pagination property defining a link to the last page.

It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.
```typespec
@lastLink
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
  @nextLink next: url;
  @prevLink prev: url;
  @firstLink first: url;
  @lastLink last: url;
}
@list op listPets(): Page<Pet>;
```


### `@list` {#@list}

Mark this operation as a `list` operation that returns a paginated list of items.
```typespec
@list
```

#### Target

`Operation`

#### Parameters
None



### `@maxItems` {#@maxItems}

Specify the maximum number of items this array should have.
```typespec
@maxItems(value: valueof integer)
```

#### Target

`unknown[] | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | [valueof `integer`](#integer) | Maximum number |

#### Examples

```typespec
@maxItems(5)
model Endpoints is string[];
```


### `@maxLength` {#@maxLength}

Specify the maximum length this string type should be.
```typespec
@maxLength(value: valueof integer)
```

#### Target

`string | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | [valueof `integer`](#integer) | Maximum length |

#### Examples

```typespec
@maxLength(20)
scalar Username extends string;
```


### `@maxValue` {#@maxValue}

Specify the maximum value this numeric type should be.
```typespec
@maxValue(value: valueof numeric)
```

#### Target

`numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | [valueof `numeric`](#numeric) | Maximum value |

#### Examples

```typespec
@maxValue(200)
scalar Age is int32;
```


### `@maxValueExclusive` {#@maxValueExclusive}

Specify the maximum value this numeric type should be, exclusive of the given
value.
```typespec
@maxValueExclusive(value: valueof numeric)
```

#### Target

`numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | [valueof `numeric`](#numeric) | Maximum value |

#### Examples

```typespec
@maxValueExclusive(50)
scalar distance is float64;
```


### `@mediaTypeHint` {#@mediaTypeHint}

Applies a media type hint to a TypeSpec type. Emitters and libraries may choose to use this hint to determine how a
type should be serialized. For example, the `@typespec/http` library will use the media type hint of the response
body type as a default `Content-Type` if one is not explicitly specified in the operation.

Media types (also known as MIME types) are defined by RFC 6838. The media type hint should be a valid media type
string as defined by the RFC, but the decorator does not enforce or validate this constraint.

Notes: the applied media type is _only_ a hint. It may be overridden or not used at all. Media type hints are
inherited by subtypes. If a media type hint is applied to a model, it will be inherited by all other models that
`extend` it unless they delcare their own media type hint.
```typespec
@mediaTypeHint(mediaType: valueof string)
```

#### Target

`Model | Scalar | Enum | Union`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| mediaType | [valueof `string`](#string) | The media type hint to apply to the target type. |

#### Examples
##### create a model that serializes as XML by default


```tsp
@mediaTypeHint("application/xml")
model Example {
  @visibility(Lifecycle.Read)
  id: string;

  name: string;
}
```


### `@minItems` {#@minItems}

Specify the minimum number of items this array should have.
```typespec
@minItems(value: valueof integer)
```

#### Target

`unknown[] | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | [valueof `integer`](#integer) | Minimum number |

#### Examples

```typespec
@minItems(1)
model Endpoints is string[];
```


### `@minLength` {#@minLength}

Specify the minimum length this string type should be.
```typespec
@minLength(value: valueof integer)
```

#### Target

`string | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | [valueof `integer`](#integer) | Minimum length |

#### Examples

```typespec
@minLength(2)
scalar Username extends string;
```


### `@minValue` {#@minValue}

Specify the minimum value this numeric type should be.
```typespec
@minValue(value: valueof numeric)
```

#### Target

`numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | [valueof `numeric`](#numeric) | Minimum value |

#### Examples

```typespec
@minValue(18)
scalar Age is int32;
```


### `@minValueExclusive` {#@minValueExclusive}

Specify the minimum value this numeric type should be, exclusive of the given
value.
```typespec
@minValueExclusive(value: valueof numeric)
```

#### Target

`numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | [valueof `numeric`](#numeric) | Minimum value |

#### Examples

```typespec
@minValueExclusive(0)
scalar distance is float64;
```


### `@nextLink` {#@nextLink}

Pagination property defining a link to the next page.

It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.
```typespec
@nextLink
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
  @nextLink next: url;
  @prevLink prev: url;
  @firstLink first: url;
  @lastLink last: url;
}
@list op listPets(): Page<Pet>;
```


### `@offset` {#@offset}

Pagination property defining the number of items to skip.
```typespec
@offset
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
}
@list op listPets(@offset skip: int32, @pageSize pageSize: int8): Page<Pet>;
```


### `@opExample` {#@opExample}

Provide example values for an operation's parameters and corresponding return type.
```typespec
@opExample(example: valueof OperationExample, options?: valueof ExampleOptions)
```

#### Target

`Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| example | [valueof `OperationExample`](./built-in-data-types.md#OperationExample) | Example value. |
| options | [valueof `ExampleOptions`](./built-in-data-types.md#ExampleOptions) | Optional metadata for the example. |

#### Examples

```tsp
@opExample(#{parameters: #{name: "Fluffy", age: 2}, returnType: #{name: "Fluffy", age: 2, id: "abc"})
op createPet(pet: Pet): Pet;
```


### `@overload` {#@overload}

Specify this operation is an overload of the given operation.
```typespec
@overload(overloadbase: Operation)
```

#### Target

`Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| overloadbase | `Operation` | Base operation that should be a union of all overloads |

#### Examples

```typespec
op upload(data: string | bytes, @header contentType: "text/plain" | "application/octet-stream"): void;
@overload(upload)
op uploadString(data: string, @header contentType: "text/plain" ): void;
@overload(upload)
op uploadBytes(data: bytes, @header contentType: "application/octet-stream"): void;
```


### `@pageIndex` {#@pageIndex}

Pagination property defining the page index.
```typespec
@pageIndex
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
}
@list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;
```


### `@pageItems` {#@pageItems}

Specify the the property that contains the array of page items.
```typespec
@pageItems
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
}
@list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;
```


### `@pageSize` {#@pageSize}

Specify the pagination parameter that controls the maximum number of items to include in a page.
```typespec
@pageSize
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
}
@list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;
```


### `@parameterVisibility` {#@parameterVisibility}

Declares the visibility constraint of the parameters of a given operation.

A parameter or property nested within a parameter will be visible if it has _any_ of the visibilities
in the list.

It is invalid to call this decorator with no visibility modifiers.
```typespec
@parameterVisibility(...visibilities: valueof EnumMember[])
```

#### Target

`Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilities | `valueof EnumMember[]` | List of visibility modifiers that apply to the parameters of this operation. |



### `@pattern` {#@pattern}

Specify the the pattern this string should respect using simple regular expression syntax.
The following syntax is allowed: alternations (`|`), quantifiers (`?`, `*`, `+`, and `{ }`), wildcard (`.`), and grouping parentheses.
Advanced features like look-around, capture groups, and references are not supported.

This decorator may optionally provide a custom validation _message_. Emitters may choose to use the message to provide
context when pattern validation fails. For the sake of consistency, the message should be a phrase that describes in
plain language what sort of content the pattern attempts to validate. For example, a complex regular expression that
validates a GUID string might have a message like "Must be a valid GUID."
```typespec
@pattern(pattern: valueof string, validationMessage?: valueof string)
```

#### Target

`string | bytes | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| pattern | [valueof `string`](#string) | Regular expression. |
| validationMessage | [valueof `string`](#string) | Optional validation message that may provide context when validation fails. |

#### Examples

```typespec
@pattern("[a-z]+", "Must be a string consisting of only lower case letters and of at least one character.")
scalar LowerAlpha extends string;
```


### `@prevLink` {#@prevLink}

Pagination property defining a link to the previous page.

It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.
```typespec
@prevLink
```

#### Target

`ModelProperty`

#### Parameters
None

#### Examples

```tsp
model Page<T> {
  @pageItems items: T[];
  @nextLink next: url;
  @prevLink prev: url;
  @firstLink first: url;
  @lastLink last: url;
}
@list op listPets(): Page<Pet>;
```


### `@removeVisibility` {#@removeVisibility}

Removes visibility modifiers from a property.

If the visibility modifiers for a visibility class have not been initialized,
this decorator will use the default visibility modifiers for the visibility
class as the default modifier set.
```typespec
@removeVisibility(...visibilities: valueof EnumMember[])
```

#### Target
The property to remove visibility from.
`ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilities | `valueof EnumMember[]` | The visibility modifiers to remove from the target property. |

#### Examples

```typespec
model Example {
  // This property will have all Lifecycle visibilities except the Read
  // visibility, since it is removed.
  @removeVisibility(Lifecycle.Read)
  secret_property: string;
}
```


### `@returnsDoc` {#@returnsDoc}

Attach a documentation string to describe the successful return types of an operation.
If an operation returns a union of success and errors it only describes the success. See `@errorsDoc` for error documentation.
```typespec
@returnsDoc(doc: valueof string)
```

#### Target

`Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| doc | [valueof `string`](#string) | Documentation string |

#### Examples

```typespec
@returnsDoc("Returns doc")
op get(): Pet | NotFound;
```


### `@returnTypeVisibility` {#@returnTypeVisibility}

Declares the visibility constraint of the return type of a given operation.

A property within the return type of the operation will be visible if it has _any_ of the visibilities
in the list.

It is invalid to call this decorator with no visibility modifiers.
```typespec
@returnTypeVisibility(...visibilities: valueof EnumMember[])
```

#### Target

`Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilities | `valueof EnumMember[]` | List of visibility modifiers that apply to the return type of this operation. |



### `@secret` {#@secret}

Mark this string as a secret value that should be treated carefully to avoid exposure
```typespec
@secret
```

#### Target

`string | ModelProperty`

#### Parameters
None

#### Examples

```typespec
@secret
scalar Password is string;
```


### `@service` {#@service}

Mark this namespace as describing a service and configure service properties.
```typespec
@service(options?: valueof ServiceOptions)
```

#### Target

`Namespace`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| options | [valueof `ServiceOptions`](./built-in-data-types.md#ServiceOptions) | Optional configuration for the service. |

#### Examples

```typespec
@service
namespace PetStore;
```

##### Setting service title

```typespec
@service(#{title: "Pet store"})
namespace PetStore;
```

##### Setting service version

```typespec
@service(#{version: "1.0"})
namespace PetStore;
```


### `@summary` {#@summary}

Typically a short, single-line description.
```typespec
@summary(summary: valueof string)
```

#### Target

`unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| summary | [valueof `string`](#string) | Summary string. |

#### Examples

```typespec
@summary("This is a pet")
model Pet {}
```


### `@tag` {#@tag}

Attaches a tag to an operation, interface, or namespace. Multiple `@tag` decorators can be specified to attach multiple tags to a TypeSpec element.
```typespec
@tag(tag: valueof string)
```

#### Target

`Namespace | Interface | Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| tag | [valueof `string`](#string) | Tag value |



### `@visibility` {#@visibility}

Sets the visibility modifiers that are active on a property, indicating that it is only considered to be present
(or "visible") in contexts that select for the given modifiers.

A property without any visibility settings applied for any visibility class (e.g. `Lifecycle`) is considered to have
the default visibility settings for that class.

If visibility for the property has already been set for a visibility class (for example, using `@invisible` or
`@removeVisibility`), this decorator will **add** the specified visibility modifiers to the property.

See: [Visibility](https://typespec.io/docs/language-basics/visibility)

The `@typespec/http` library uses `Lifecycle` visibility to determine which properties are included in the request or
response bodies of HTTP operations. By default, it uses the following visibility settings:

- For the return type of operations, properties are included if they have `Lifecycle.Read` visibility.
- For POST operation parameters, properties are included if they have `Lifecycle.Create` visibility.
- For PUT operation parameters, properties are included if they have `Lifecycle.Create` or `Lifecycle.Update` visibility.
- For PATCH operation parameters, properties are included if they have `Lifecycle.Update` visibility.
- For DELETE operation parameters, properties are included if they have `Lifecycle.Delete` visibility.
- For GET or HEAD operation parameters, properties are included if they have `Lifecycle.Query` visibility.

By default, properties have all five Lifecycle visibility modifiers enabled, so a property is visible in all contexts
by default.

The default settings may be overridden using the `@returnTypeVisibility` and `@parameterVisibility` decorators.

See also: [Automatic visibility](https://typespec.io/docs/libraries/http/operations#automatic-visibility)
```typespec
@visibility(...visibilities: valueof EnumMember[])
```

#### Target

`ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilities | `valueof EnumMember[]` | List of visibilities which apply to this property. |

#### Examples

```typespec
model Dog {
  // The service will generate an ID, so you don't need to send it.
  @visibility(Lifecycle.Read)
  id: int32;

  // The service will store this secret name, but won't ever return it.
  @visibility(Lifecycle.Create, Lifecycle.Update)
  secretName: string;

  // The regular name has all vi
  name: string;
}
```


### `@withDefaultKeyVisibility` {#@withDefaultKeyVisibility}

Set the visibility of key properties in a model if not already set.

This will set the visibility modifiers of all key properties in the model if the visibility is not already _explicitly_ set,
but will not change the visibility of any properties that have visibility set _explicitly_, even if the visibility
is the same as the default visibility.

Visibility may be set explicitly using any of the following decorators:

- `@visibility`
- `@removeVisibility`
- `@invisible`
```typespec
@withDefaultKeyVisibility(visibility: valueof EnumMember)
```

#### Target

`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibility | `valueof EnumMember` | The desired default visibility value. If a key property already has visibility set, it will not be changed. |



### `@withLifecycleUpdate` {#@withLifecycleUpdate}

Transforms the `target` model to include only properties that are visible during the
"Update" lifecycle phase.

Any nested models of optional properties will be transformed into the "CreateOrUpdate"
lifecycle phase instead of the "Update" lifecycle phase, so that nested models may be
fully updated.

If a `nameTemplate` is provided, newly-created type instances will be named according
to the template. See the `@friendlyName` decorator for more information on the template
syntax. The transformed type is provided as the argument to the template.
```typespec
@withLifecycleUpdate(nameTemplate?: valueof string)
```

#### Target
The model to apply the transformation to.
`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| nameTemplate | [valueof `string`](#string) | The name template to use when renaming new model instances. |

#### Examples

```typespec
model Dog {
  @visibility(Lifecycle.Read)
  id: int32;

  @visibility(Lifecycle.Create, Lifecycle.Update)
  secretName: string;

  name: string;
}

@withLifecycleUpdate
model DogUpdate {
  ...Dog
}
```


### `@withOptionalProperties` {#@withOptionalProperties}

Returns the model with required properties removed.
```typespec
@withOptionalProperties
```

#### Target

`Model`

#### Parameters
None



### `@withoutDefaultValues` {#@withoutDefaultValues}

Returns the model with any default values removed.
```typespec
@withoutDefaultValues
```

#### Target

`Model`

#### Parameters
None



### `@withoutOmittedProperties` {#@withoutOmittedProperties}

Returns the model with the given properties omitted.
```typespec
@withoutOmittedProperties(omit: string | Union)
```

#### Target

`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| omit | `string \| Union` | List of properties to omit |



### `@withPickedProperties` {#@withPickedProperties}

Returns the model with only the given properties included.
```typespec
@withPickedProperties(pick: string | Union)
```

#### Target

`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| pick | `string \| Union` | List of properties to include |



### `@withUpdateableProperties` {#@withUpdateableProperties}

Returns the model with non-updateable properties removed.
```typespec
@withUpdateableProperties
```

#### Target

`Model`

#### Parameters
None



### `@withVisibility` {#@withVisibility}

Removes properties that do not have at least one of the given visibility modifiers
active.

If no visibility modifiers are supplied, this decorator has no effect.

See also: [Automatic visibility](https://typespec.io/docs/libraries/http/operations#automatic-visibility)

When using an emitter that applies visibility automatically, it is generally
not necessary to use this decorator.
```typespec
@withVisibility(...visibilities: valueof EnumMember[])
```

#### Target

`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilities | `valueof EnumMember[]` | List of visibilities that apply to this property. |

#### Examples

```typespec
model Dog {
  @visibility(Lifecycle.Read)
  id: int32;

  @visibility(Lifecycle.Create, Lifecycle.Update)
  secretName: string;

  name: string;
}

// The spread operator will copy all the properties of Dog into DogRead,
// and @withVisibility will then remove those that are not visible with
// create or update visibility.
//
// In this case, the id property is removed, and the name and secretName
// properties are kept.
@withVisibility(Lifecycle.Create, Lifecycle.Update)
model DogCreateOrUpdate {
  ...Dog;
}

// In this case the id and name properties are kept and the secretName property
// is removed.
@withVisibility(Lifecycle.Read)
model DogRead {
  ...Dog;
}
```


### `@withVisibilityFilter` {#@withVisibilityFilter}

Applies the given visibility filter to the properties of the target model.

This transformation is recursive, so it will also apply the filter to any nested
or referenced models that are the types of any properties in the `target`.

If a `nameTemplate` is provided, newly-created type instances will be named according
to the template. See the `@friendlyName` decorator for more information on the template
syntax. The transformed type is provided as the argument to the template.
```typespec
@withVisibilityFilter(filter: valueof VisibilityFilter, nameTemplate?: valueof string)
```

#### Target
The model to apply the visibility filter to.
`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| filter | [valueof `VisibilityFilter`](./built-in-data-types.md#VisibilityFilter) | The visibility filter to apply to the properties of the target model. |
| nameTemplate | [valueof `string`](#string) | The name template to use when renaming new model instances. |

#### Examples

```typespec
model Dog {
  @visibility(Lifecycle.Read)
  id: int32;

  name: string;
}

@withVisibilityFilter(#{ all: #[Lifecycle.Read] })
model DogRead {
 ...Dog
}
```

