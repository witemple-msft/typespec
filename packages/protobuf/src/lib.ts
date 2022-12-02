// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createCadlLibrary, JSONSchemaType, paramMessage } from "@cadl-lang/compiler";

/**
 * Options that the Protobuf emitter accepts.
 */
export interface ProtobufEmitterOptions {
  /**
   * The directory where the emitter will write the Protobuf output tree.
   */
  outputDirectory?: string;

  /**
   * Don't emit anything.
   */
  noEmit?: boolean;
}

const EmitterOptionsSchema: JSONSchemaType<ProtobufEmitterOptions> = {
  type: "object",
  additionalProperties: false,
  properties: {
    outputDirectory: { type: "string", nullable: true },
    noEmit: { type: "boolean", nullable: true },
  },
  required: [],
};

const PACKAGE_NAME = "@cadl-lang/protobuf";

export const CadlProtobufLibrary = createCadlLibrary({
  name: PACKAGE_NAME,
  requireImports: [PACKAGE_NAME],
  diagnostics: {
    "field-index": {
      severity: "error",
      messages: {
        invalid: paramMessage`field index ${"index"} is invalid (must be an integer greater than zero)`,
        "out-of-bounds": paramMessage`field index ${"index"} is out of bounds (must be less than ${"max"})`,
        reserved: paramMessage`field index ${"index"} falls within the implementation-reserved range of 19000-19999 (try an index value of 20,000 or higher)`,
      },
    },
    "root-operation": {
      severity: "error",
      messages: {
        default:
          "operations in the root namespace are not supported (no associated Protobuf service)",
      },
    },
    "unsupported-return-type": {
      severity: "error",
      messages: {
        default: "Protobuf methods must return a named Model",
      },
    },
    "unsupported-input-type": {
      severity: "error",
      messages: {
        "wrong-number":
          "Protobuf methods must accept exactly one Model input (an empty model will do)",
        "wrong-type": "Protobuf methods may only accept a named Model as an input",
        unconvertible: "input parameters cannot be converted to a Protobuf message",
      },
    },
    "unsupported-field-type": {
      severity: "error",
      messages: {
        unconvertible: paramMessage`cannot convert a ${"type"} to a protobuf type (only intrinsic types and models are supported)`,
        "unknown-intrinsic": paramMessage`no known protobuf scalar for intrinsic type ${"name"}`,
        "unknown-scalar": paramMessage`no known protobuf scalar for Cadl scalar type ${"name"}`,
        "recursive-map": "a protobuf map's 'value' type may not refer to another map",
      },
    },
    "namespace-collision": {
      severity: "error",
      messages: {
        default: paramMessage`the package name ${"name"} has already been used`,
      },
    },
    "unconvertible-enum": {
      severity: "error",
      messages: {
        default:
          "enums must explicitly assign exactly one integer to each member to be used in a Protobuf message",
        "no-zero-first":
          "the first variant of an enum must be set to zero to be used in a Protobuf message",
      },
    },
    "nested-array": {
      severity: "error",
      messages: {
        default: "nested arrays are not supported by the Protobuf emitter",
      },
    },
    "invalid-package-name": {
      severity: "error",
      messages: {
        default: paramMessage`${"name"} is not a valid package name (must consist of letters and numbers separated by ".")`,
      },
    },
    "no-package": {
      severity: "error",
      messages: {
        default:
          "this type was used in a Protobuf service, but was outside the scope of any package namespace",
      },
    },
    "illegal-reservation": {
      severity: "error",
      messages: {
        default:
          "reservation value must be a string literal, uint32 literal, or a tuple of two uint32 literals denoting a range",
      },
    },
  },
  emitter: { options: EmitterOptionsSchema },
});

export const { reportDiagnostic } = CadlProtobufLibrary;

// TODO: onValidate?
export { $onEmit } from "./proto.js";

export type CadlProtobufLibrary = typeof CadlProtobufLibrary;

const keys = [
  "fieldIndex",
  "serviceInterface",
  "packageName",
  "externRef",
  "stream",
  "reserve",
] as const;

export const state = Object.fromEntries(keys.map((k) => [k, Symbol(`cadl-protobuf::${k}`)])) as {
  [K in typeof keys[number]]: symbol;
};