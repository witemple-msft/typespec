# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: main.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import empty_pb2 as google_dot_protobuf_dot_empty__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\nmain.proto\x1a\x1bgoogle/protobuf/empty.proto\"r\n\x05Input\x12\x32\n\x0etestInputField\x18\x01 \x03(\x0b\x32\x1a.Input.TestInputFieldEntry\x1a\x35\n\x13TestInputFieldEntry\x12\x0b\n\x03key\x18\x01 \x01(\x0f\x12\r\n\x05value\x18\x02 \x01(\t:\x02\x38\x01\x32\x30\n\x07Service\x12%\n\x03\x46oo\x12\x06.Input\x1a\x16.google.protobuf.Emptyb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'main_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _INPUT_TESTINPUTFIELDENTRY._options = None
  _INPUT_TESTINPUTFIELDENTRY._serialized_options = b'8\001'
  _globals['_INPUT']._serialized_start=43
  _globals['_INPUT']._serialized_end=157
  _globals['_INPUT_TESTINPUTFIELDENTRY']._serialized_start=104
  _globals['_INPUT_TESTINPUTFIELDENTRY']._serialized_end=157
  _globals['_SERVICE']._serialized_start=159
  _globals['_SERVICE']._serialized_end=207
# @@protoc_insertion_point(module_scope)
