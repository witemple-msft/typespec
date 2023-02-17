// Generated by the protocol buffer compiler.  DO NOT EDIT!
// clang-format off
// source: com/azure/test.proto

// This CPP symbol can be defined to use imports that match up to the framework
// imports needed when using CocoaPods.
#if !defined(GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS)
 #define GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS 0
#endif

#if GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS
 #import <Protobuf/GPBProtocolBuffers.h>
#else
 #import "GPBProtocolBuffers.h"
#endif

#if GOOGLE_PROTOBUF_OBJC_VERSION < 30006
#error This file was generated by a newer version of protoc which is incompatible with your Protocol Buffer library sources.
#endif
#if 30006 < GOOGLE_PROTOBUF_OBJC_MIN_SUPPORTED_VERSION
#error This file was generated by an older version of protoc which is incompatible with your Protocol Buffer library sources.
#endif

// @@protoc_insertion_point(imports)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

CF_EXTERN_C_BEGIN

NS_ASSUME_NONNULL_BEGIN

#pragma mark - TestRoot

/**
 * Exposes the extension registry for this file.
 *
 * The base class provides:
 * @code
 *   + (GPBExtensionRegistry *)extensionRegistry;
 * @endcode
 * which is a @c GPBExtensionRegistry that includes all the extensions defined by
 * this file and all files that it depends on.
 **/
GPB_FINAL @interface TestRoot : GPBRootObject
@end

#pragma mark - Input

typedef GPB_ENUM(Input_FieldNumber) {
  Input_FieldNumber_TestInputFieldArray = 1,
};

GPB_FINAL @interface Input : GPBMessage

@property(nonatomic, readwrite, strong, null_resettable) NSMutableArray<NSString*> *testInputFieldArray;
/** The number of items in @c testInputFieldArray without causing the container to be created. */
@property(nonatomic, readonly) NSUInteger testInputFieldArray_Count;

@end

#pragma mark - Output

typedef GPB_ENUM(Output_FieldNumber) {
  Output_FieldNumber_TestOutputFieldArray = 1,
  Output_FieldNumber_SecondField = 2,
};

GPB_FINAL @interface Output : GPBMessage

@property(nonatomic, readwrite, strong, null_resettable) GPBInt32Array *testOutputFieldArray;
/** The number of items in @c testOutputFieldArray without causing the container to be created. */
@property(nonatomic, readonly) NSUInteger testOutputFieldArray_Count;

@property(nonatomic, readwrite, copy, null_resettable) NSString *secondField;

@end

NS_ASSUME_NONNULL_END

CF_EXTERN_C_END

#pragma clang diagnostic pop

// @@protoc_insertion_point(global_scope)

// clang-format on
