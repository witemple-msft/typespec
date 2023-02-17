// Generated by the protocol buffer compiler.  DO NOT EDIT!
// clang-format off
// source: main.proto

// This CPP symbol can be defined to use imports that match up to the framework
// imports needed when using CocoaPods.
#if !defined(GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS)
 #define GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS 0
#endif

#if GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS
 #import <Protobuf/GPBProtocolBuffers_RuntimeSupport.h>
#else
 #import "GPBProtocolBuffers_RuntimeSupport.h"
#endif

#import <stdatomic.h>

#import "Main.pbobjc.h"
// @@protoc_insertion_point(imports)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

#pragma mark - MainRoot

@implementation MainRoot

// No extensions in the file and no imports, so no need to generate
// +extensionRegistry.

@end

#pragma mark - MainRoot_FileDescriptor

static GPBFileDescriptor *MainRoot_FileDescriptor(void) {
  // This is called by +initialize so there is no need to worry
  // about thread safety of the singleton.
  static GPBFileDescriptor *descriptor = NULL;
  if (!descriptor) {
    GPB_DEBUG_CHECK_RUNTIME_VERSIONS();
    descriptor = [[GPBFileDescriptor alloc] initWithPackage:@""
                                                     syntax:GPBFileSyntaxProto3];
  }
  return descriptor;
}

#pragma mark - Enum InputType

GPBEnumDescriptor *InputType_EnumDescriptor(void) {
  static _Atomic(GPBEnumDescriptor*) descriptor = nil;
  if (!descriptor) {
    static const char *valueNames =
        "Foo\000Bar\000";
    static const int32_t values[] = {
        InputType_Foo,
        InputType_Bar,
    };
    GPBEnumDescriptor *worker =
        [GPBEnumDescriptor allocDescriptorForName:GPBNSStringifySymbol(InputType)
                                       valueNames:valueNames
                                           values:values
                                            count:(uint32_t)(sizeof(values) / sizeof(int32_t))
                                     enumVerifier:InputType_IsValidValue
                                            flags:GPBEnumDescriptorInitializationFlag_None];
    GPBEnumDescriptor *expected = nil;
    if (!atomic_compare_exchange_strong(&descriptor, &expected, worker)) {
      [worker release];
    }
  }
  return descriptor;
}

BOOL InputType_IsValidValue(int32_t value__) {
  switch (value__) {
    case InputType_Foo:
    case InputType_Bar:
      return YES;
    default:
      return NO;
  }
}

#pragma mark - Enum InputTypeWithAlias

GPBEnumDescriptor *InputTypeWithAlias_EnumDescriptor(void) {
  static _Atomic(GPBEnumDescriptor*) descriptor = nil;
  if (!descriptor) {
    static const char *valueNames =
        "Baz\000Qux\000Fuz\000";
    static const int32_t values[] = {
        InputTypeWithAlias_Baz,
        InputTypeWithAlias_Qux,
        InputTypeWithAlias_Fuz,
    };
    GPBEnumDescriptor *worker =
        [GPBEnumDescriptor allocDescriptorForName:GPBNSStringifySymbol(InputTypeWithAlias)
                                       valueNames:valueNames
                                           values:values
                                            count:(uint32_t)(sizeof(values) / sizeof(int32_t))
                                     enumVerifier:InputTypeWithAlias_IsValidValue
                                            flags:GPBEnumDescriptorInitializationFlag_None];
    GPBEnumDescriptor *expected = nil;
    if (!atomic_compare_exchange_strong(&descriptor, &expected, worker)) {
      [worker release];
    }
  }
  return descriptor;
}

BOOL InputTypeWithAlias_IsValidValue(int32_t value__) {
  switch (value__) {
    case InputTypeWithAlias_Baz:
    case InputTypeWithAlias_Qux:
      return YES;
    default:
      return NO;
  }
}

#pragma mark - Input

@implementation Input

@dynamic testInputField;
@dynamic type;
@dynamic aliased;

typedef struct Input__storage_ {
  uint32_t _has_storage_[1];
  InputType type;
  InputTypeWithAlias aliased;
  NSString *testInputField;
} Input__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "testInputField",
        .dataTypeSpecific.clazz = Nil,
        .number = Input_FieldNumber_TestInputField,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(Input__storage_, testInputField),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldTextFormatNameCustom | GPBFieldClearHasIvarOnZero),
        .dataType = GPBDataTypeString,
      },
      {
        .name = "type",
        .dataTypeSpecific.enumDescFunc = InputType_EnumDescriptor,
        .number = Input_FieldNumber_Type,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(Input__storage_, type),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldHasEnumDescriptor | GPBFieldClearHasIvarOnZero),
        .dataType = GPBDataTypeEnum,
      },
      {
        .name = "aliased",
        .dataTypeSpecific.enumDescFunc = InputTypeWithAlias_EnumDescriptor,
        .number = Input_FieldNumber_Aliased,
        .hasIndex = 2,
        .offset = (uint32_t)offsetof(Input__storage_, aliased),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldHasEnumDescriptor | GPBFieldClearHasIvarOnZero),
        .dataType = GPBDataTypeEnum,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[Input class]
                                          file:MainRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(Input__storage_)
                                         flags:(GPBDescriptorInitializationFlags)(GPBDescriptorInitializationFlag_UsesClassRefs | GPBDescriptorInitializationFlag_Proto3OptionalKnown | GPBDescriptorInitializationFlag_ClosedEnumSupportKnown)];
#if !GPBOBJC_SKIP_MESSAGE_TEXTFORMAT_EXTRAS
    static const char *extraTextFormatInfo =
        "\001\001\016\000";
    [localDescriptor setupExtraTextInfo:extraTextFormatInfo];
#endif  // !GPBOBJC_SKIP_MESSAGE_TEXTFORMAT_EXTRAS
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

int32_t Input_Type_RawValue(Input *message) {
  GPBDescriptor *descriptor = [Input descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:Input_FieldNumber_Type];
  return GPBGetMessageRawEnumField(message, field);
}

void SetInput_Type_RawValue(Input *message, int32_t value) {
  GPBDescriptor *descriptor = [Input descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:Input_FieldNumber_Type];
  GPBSetMessageRawEnumField(message, field, value);
}

int32_t Input_Aliased_RawValue(Input *message) {
  GPBDescriptor *descriptor = [Input descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:Input_FieldNumber_Aliased];
  return GPBGetMessageRawEnumField(message, field);
}

void SetInput_Aliased_RawValue(Input *message, int32_t value) {
  GPBDescriptor *descriptor = [Input descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:Input_FieldNumber_Aliased];
  GPBSetMessageRawEnumField(message, field, value);
}

#pragma mark - Output

@implementation Output

@dynamic testOutputField;
@dynamic secondField;

typedef struct Output__storage_ {
  uint32_t _has_storage_[1];
  int32_t testOutputField;
  NSString *secondField;
} Output__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "testOutputField",
        .dataTypeSpecific.clazz = Nil,
        .number = Output_FieldNumber_TestOutputField,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(Output__storage_, testOutputField),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldTextFormatNameCustom | GPBFieldClearHasIvarOnZero),
        .dataType = GPBDataTypeInt32,
      },
      {
        .name = "secondField",
        .dataTypeSpecific.clazz = Nil,
        .number = Output_FieldNumber_SecondField,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(Output__storage_, secondField),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldTextFormatNameCustom | GPBFieldClearHasIvarOnZero),
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[Output class]
                                          file:MainRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(Output__storage_)
                                         flags:(GPBDescriptorInitializationFlags)(GPBDescriptorInitializationFlag_UsesClassRefs | GPBDescriptorInitializationFlag_Proto3OptionalKnown | GPBDescriptorInitializationFlag_ClosedEnumSupportKnown)];
#if !GPBOBJC_SKIP_MESSAGE_TEXTFORMAT_EXTRAS
    static const char *extraTextFormatInfo =
        "\002\001\017\000\002\013\000";
    [localDescriptor setupExtraTextInfo:extraTextFormatInfo];
#endif  // !GPBOBJC_SKIP_MESSAGE_TEXTFORMAT_EXTRAS
    #if defined(DEBUG) && DEBUG
      NSAssert(descriptor == nil, @"Startup recursed!");
    #endif  // DEBUG
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end


#pragma clang diagnostic pop

// @@protoc_insertion_point(global_scope)

// clang-format on
