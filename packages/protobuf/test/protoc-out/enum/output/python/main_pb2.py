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




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\nmain.proto\"_\n\x05Input\x12\x16\n\x0etestInputField\x18\x01 \x01(\t\x12\x18\n\x04type\x18\x02 \x01(\x0e\x32\n.InputType\x12$\n\x07\x61liased\x18\x03 \x01(\x0e\x32\x13.InputTypeWithAlias\"6\n\x06Output\x12\x17\n\x0ftestOutputField\x18\x01 \x01(\x05\x12\x13\n\x0bsecondField\x18\x02 \x01(\t*\x1d\n\tInputType\x12\x07\n\x03\x46OO\x10\x00\x12\x07\n\x03\x42\x41R\x10\x01*3\n\x12InputTypeWithAlias\x12\x07\n\x03\x42\x41Z\x10\x00\x12\x07\n\x03QUX\x10\x01\x12\x07\n\x03\x46UZ\x10\x01\x1a\x02\x10\x01\x32!\n\x07Service\x12\x16\n\x03\x46oo\x12\x06.Input\x1a\x07.Outputb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'main_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _INPUTTYPEWITHALIAS._options = None
  _INPUTTYPEWITHALIAS._serialized_options = b'\020\001'
  _globals['_INPUTTYPE']._serialized_start=167
  _globals['_INPUTTYPE']._serialized_end=196
  _globals['_INPUTTYPEWITHALIAS']._serialized_start=198
  _globals['_INPUTTYPEWITHALIAS']._serialized_end=249
  _globals['_INPUT']._serialized_start=14
  _globals['_INPUT']._serialized_end=109
  _globals['_OUTPUT']._serialized_start=111
  _globals['_OUTPUT']._serialized_end=165
  _globals['_SERVICE']._serialized_start=251
  _globals['_SERVICE']._serialized_end=284
# @@protoc_insertion_point(module_scope)
