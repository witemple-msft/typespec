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

#import "Main.pbobjc.h"
// @@protoc_insertion_point(imports)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
#pragma clang diagnostic ignored "-Wdollar-in-identifier-extension"

#pragma mark - Objective C Class declarations
// Forward declarations of Objective C classes that we can use as
// static values in struct initializers.
// We don't use [Foo class] because it is not a static value.
GPBObjCClassDeclaration(Input);

#pragma mark - MainRoot

@implementation MainRoot

// No extensions in the file and none of the imports (direct or indirect)
// defined extensions, so no need to generate +extensionRegistry.

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

#pragma mark - Input

@implementation Input

@dynamic testInputField, testInputField_Count;

typedef struct Input__storage_ {
  uint32_t _has_storage_[1];
  GPBInt32ObjectDictionary *testInputField;
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
        .hasIndex = GPBNoHasBit,
        .offset = (uint32_t)offsetof(Input__storage_, testInputField),
        .flags = (GPBFieldFlags)(GPBFieldMapKeySFixed32 | GPBFieldTextFormatNameCustom),
        .dataType = GPBDataTypeString,
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


#pragma clang diagnostic pop

// @@protoc_insertion_point(global_scope)

// clang-format on
