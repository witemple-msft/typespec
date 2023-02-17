// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: main.proto

#include "main.pb.h"

#include <algorithm>
#include "google/protobuf/io/coded_stream.h"
#include "google/protobuf/extension_set.h"
#include "google/protobuf/wire_format_lite.h"
#include "google/protobuf/descriptor.h"
#include "google/protobuf/generated_message_reflection.h"
#include "google/protobuf/reflection_ops.h"
#include "google/protobuf/wire_format.h"
// @@protoc_insertion_point(includes)

// Must be included last.
#include "google/protobuf/port_def.inc"
PROTOBUF_PRAGMA_INIT_SEG
namespace _pb = ::PROTOBUF_NAMESPACE_ID;
namespace _pbi = ::PROTOBUF_NAMESPACE_ID::internal;
PROTOBUF_CONSTEXPR Input::Input(
    ::_pbi::ConstantInitialized): _impl_{
    /*decltype(_impl_.testinputfield_)*/{&::_pbi::fixed_address_empty_string, ::_pbi::ConstantInitialized{}}
  , /*decltype(_impl_._cached_size_)*/{}} {}
struct InputDefaultTypeInternal {
  PROTOBUF_CONSTEXPR InputDefaultTypeInternal() : _instance(::_pbi::ConstantInitialized{}) {}
  ~InputDefaultTypeInternal() {}
  union {
    Input _instance;
  };
};

PROTOBUF_ATTRIBUTE_NO_DESTROY PROTOBUF_CONSTINIT
    PROTOBUF_ATTRIBUTE_INIT_PRIORITY1 InputDefaultTypeInternal _Input_default_instance_;
PROTOBUF_CONSTEXPR Output::Output(
    ::_pbi::ConstantInitialized): _impl_{
    /* ._impl_.testoutputfield_ = */ 0

  , /*decltype(_impl_._cached_size_)*/{}} {}
struct OutputDefaultTypeInternal {
  PROTOBUF_CONSTEXPR OutputDefaultTypeInternal() : _instance(::_pbi::ConstantInitialized{}) {}
  ~OutputDefaultTypeInternal() {}
  union {
    Output _instance;
  };
};

PROTOBUF_ATTRIBUTE_NO_DESTROY PROTOBUF_CONSTINIT
    PROTOBUF_ATTRIBUTE_INIT_PRIORITY1 OutputDefaultTypeInternal _Output_default_instance_;
static ::_pb::Metadata file_level_metadata_main_2eproto[2];
static constexpr const ::_pb::EnumDescriptor**
    file_level_enum_descriptors_main_2eproto = nullptr;
static constexpr const ::_pb::ServiceDescriptor**
    file_level_service_descriptors_main_2eproto = nullptr;
const ::uint32_t TableStruct_main_2eproto::offsets[] PROTOBUF_SECTION_VARIABLE(
    protodesc_cold) = {
    ~0u,  // no _has_bits_
    PROTOBUF_FIELD_OFFSET(::Input, _internal_metadata_),
    ~0u,  // no _extensions_
    ~0u,  // no _oneof_case_
    ~0u,  // no _weak_field_map_
    ~0u,  // no _inlined_string_donated_
    ~0u,  // no _split_
    ~0u,  // no sizeof(Split)
    PROTOBUF_FIELD_OFFSET(::Input, _impl_.testinputfield_),
    ~0u,  // no _has_bits_
    PROTOBUF_FIELD_OFFSET(::Output, _internal_metadata_),
    ~0u,  // no _extensions_
    ~0u,  // no _oneof_case_
    ~0u,  // no _weak_field_map_
    ~0u,  // no _inlined_string_donated_
    ~0u,  // no _split_
    ~0u,  // no sizeof(Split)
    PROTOBUF_FIELD_OFFSET(::Output, _impl_.testoutputfield_),
};

static const ::_pbi::MigrationSchema
    schemas[] PROTOBUF_SECTION_VARIABLE(protodesc_cold) = {
        { 0, -1, -1, sizeof(::Input)},
        { 9, -1, -1, sizeof(::Output)},
};

static const ::_pb::Message* const file_default_instances[] = {
    &::_Input_default_instance_._instance,
    &::_Output_default_instance_._instance,
};
const char descriptor_table_protodef_main_2eproto[] PROTOBUF_SECTION_VARIABLE(protodesc_cold) = {
    "\n\nmain.proto\"\037\n\005Input\022\026\n\016testInputField\030"
    "\001 \001(\t\"!\n\006Output\022\027\n\017testOutputField\030\001 \001(\005"
    "2!\n\007Service\022\026\n\003Foo\022\006.Input\032\007.Outputb\006pro"
    "to3"
};
static ::absl::once_flag descriptor_table_main_2eproto_once;
const ::_pbi::DescriptorTable descriptor_table_main_2eproto = {
    false,
    false,
    123,
    descriptor_table_protodef_main_2eproto,
    "main.proto",
    &descriptor_table_main_2eproto_once,
    nullptr,
    0,
    2,
    schemas,
    file_default_instances,
    TableStruct_main_2eproto::offsets,
    file_level_metadata_main_2eproto,
    file_level_enum_descriptors_main_2eproto,
    file_level_service_descriptors_main_2eproto,
};

// This function exists to be marked as weak.
// It can significantly speed up compilation by breaking up LLVM's SCC
// in the .pb.cc translation units. Large translation units see a
// reduction of more than 35% of walltime for optimized builds. Without
// the weak attribute all the messages in the file, including all the
// vtables and everything they use become part of the same SCC through
// a cycle like:
// GetMetadata -> descriptor table -> default instances ->
//   vtables -> GetMetadata
// By adding a weak function here we break the connection from the
// individual vtables back into the descriptor table.
PROTOBUF_ATTRIBUTE_WEAK const ::_pbi::DescriptorTable* descriptor_table_main_2eproto_getter() {
  return &descriptor_table_main_2eproto;
}
// Force running AddDescriptors() at dynamic initialization time.
PROTOBUF_ATTRIBUTE_INIT_PRIORITY2
static ::_pbi::AddDescriptorsRunner dynamic_init_dummy_main_2eproto(&descriptor_table_main_2eproto);
// ===================================================================

class Input::_Internal {
 public:
};

Input::Input(::PROTOBUF_NAMESPACE_ID::Arena* arena)
  : ::PROTOBUF_NAMESPACE_ID::Message(arena) {
  SharedCtor(arena);
  // @@protoc_insertion_point(arena_constructor:Input)
}
Input::Input(const Input& from)
  : ::PROTOBUF_NAMESPACE_ID::Message() {
  Input* const _this = this; (void)_this;
  new (&_impl_) Impl_{
      decltype(_impl_.testinputfield_){}
    , /*decltype(_impl_._cached_size_)*/{}};

  _internal_metadata_.MergeFrom<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>(from._internal_metadata_);
  _impl_.testinputfield_.InitDefault();
  #ifdef PROTOBUF_FORCE_COPY_DEFAULT_STRING
    _impl_.testinputfield_.Set("", GetArenaForAllocation());
  #endif // PROTOBUF_FORCE_COPY_DEFAULT_STRING
  if (!from._internal_testinputfield().empty()) {
    _this->_impl_.testinputfield_.Set(from._internal_testinputfield(), 
      _this->GetArenaForAllocation());
  }
  // @@protoc_insertion_point(copy_constructor:Input)
}

inline void Input::SharedCtor(::_pb::Arena* arena) {
  (void)arena;
  new (&_impl_) Impl_{
      decltype(_impl_.testinputfield_){}
    , /*decltype(_impl_._cached_size_)*/{}
  };
  _impl_.testinputfield_.InitDefault();
  #ifdef PROTOBUF_FORCE_COPY_DEFAULT_STRING
    _impl_.testinputfield_.Set("", GetArenaForAllocation());
  #endif // PROTOBUF_FORCE_COPY_DEFAULT_STRING
}

Input::~Input() {
  // @@protoc_insertion_point(destructor:Input)
  if (auto *arena = _internal_metadata_.DeleteReturnArena<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>()) {
  (void)arena;
    return;
  }
  SharedDtor();
}

inline void Input::SharedDtor() {
  ABSL_DCHECK(GetArenaForAllocation() == nullptr);
  _impl_.testinputfield_.Destroy();
}

void Input::SetCachedSize(int size) const {
  _impl_._cached_size_.Set(size);
}

void Input::Clear() {
// @@protoc_insertion_point(message_clear_start:Input)
  ::uint32_t cached_has_bits = 0;
  // Prevent compiler warnings about cached_has_bits being unused
  (void) cached_has_bits;

  _impl_.testinputfield_.ClearToEmpty();
  _internal_metadata_.Clear<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>();
}

const char* Input::_InternalParse(const char* ptr, ::_pbi::ParseContext* ctx) {
#define CHK_(x) if (PROTOBUF_PREDICT_FALSE(!(x))) goto failure
  while (!ctx->Done(&ptr)) {
    ::uint32_t tag;
    ptr = ::_pbi::ReadTag(ptr, &tag);
    switch (tag >> 3) {
      // string testInputField = 1;
      case 1:
        if (PROTOBUF_PREDICT_TRUE(static_cast<::uint8_t>(tag) == 10)) {
          auto str = _internal_mutable_testinputfield();
          ptr = ::_pbi::InlineGreedyStringParser(str, ptr, ctx);
          CHK_(ptr);
          CHK_(::_pbi::VerifyUTF8(str, "Input.testInputField"));
        } else {
          goto handle_unusual;
        }
        continue;
      default:
        goto handle_unusual;
    }  // switch
  handle_unusual:
    if ((tag == 0) || ((tag & 7) == 4)) {
      CHK_(ptr);
      ctx->SetLastTag(tag);
      goto message_done;
    }
    ptr = UnknownFieldParse(
        tag,
        _internal_metadata_.mutable_unknown_fields<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>(),
        ptr, ctx);
    CHK_(ptr != nullptr);
  }  // while
message_done:
  return ptr;
failure:
  ptr = nullptr;
  goto message_done;
#undef CHK_
}

::uint8_t* Input::_InternalSerialize(
    ::uint8_t* target, ::PROTOBUF_NAMESPACE_ID::io::EpsCopyOutputStream* stream) const {
  // @@protoc_insertion_point(serialize_to_array_start:Input)
  ::uint32_t cached_has_bits = 0;
  (void) cached_has_bits;

  // string testInputField = 1;
  if (!this->_internal_testinputfield().empty()) {
    ::PROTOBUF_NAMESPACE_ID::internal::WireFormatLite::VerifyUtf8String(
      this->_internal_testinputfield().data(), static_cast<int>(this->_internal_testinputfield().length()),
      ::PROTOBUF_NAMESPACE_ID::internal::WireFormatLite::SERIALIZE,
      "Input.testInputField");
    target = stream->WriteStringMaybeAliased(
        1, this->_internal_testinputfield(), target);
  }

  if (PROTOBUF_PREDICT_FALSE(_internal_metadata_.have_unknown_fields())) {
    target = ::_pbi::WireFormat::InternalSerializeUnknownFieldsToArray(
        _internal_metadata_.unknown_fields<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>(::PROTOBUF_NAMESPACE_ID::UnknownFieldSet::default_instance), target, stream);
  }
  // @@protoc_insertion_point(serialize_to_array_end:Input)
  return target;
}

::size_t Input::ByteSizeLong() const {
// @@protoc_insertion_point(message_byte_size_start:Input)
  ::size_t total_size = 0;

  ::uint32_t cached_has_bits = 0;
  // Prevent compiler warnings about cached_has_bits being unused
  (void) cached_has_bits;

  // string testInputField = 1;
  if (!this->_internal_testinputfield().empty()) {
    total_size += 1 +
      ::PROTOBUF_NAMESPACE_ID::internal::WireFormatLite::StringSize(
        this->_internal_testinputfield());
  }

  return MaybeComputeUnknownFieldsSize(total_size, &_impl_._cached_size_);
}

const ::PROTOBUF_NAMESPACE_ID::Message::ClassData Input::_class_data_ = {
    ::PROTOBUF_NAMESPACE_ID::Message::CopyWithSourceCheck,
    Input::MergeImpl
};
const ::PROTOBUF_NAMESPACE_ID::Message::ClassData*Input::GetClassData() const { return &_class_data_; }


void Input::MergeImpl(::PROTOBUF_NAMESPACE_ID::Message& to_msg, const ::PROTOBUF_NAMESPACE_ID::Message& from_msg) {
  auto* const _this = static_cast<Input*>(&to_msg);
  auto& from = static_cast<const Input&>(from_msg);
  // @@protoc_insertion_point(class_specific_merge_from_start:Input)
  ABSL_DCHECK_NE(&from, _this);
  ::uint32_t cached_has_bits = 0;
  (void) cached_has_bits;

  if (!from._internal_testinputfield().empty()) {
    _this->_internal_set_testinputfield(from._internal_testinputfield());
  }
  _this->_internal_metadata_.MergeFrom<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>(from._internal_metadata_);
}

void Input::CopyFrom(const Input& from) {
// @@protoc_insertion_point(class_specific_copy_from_start:Input)
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool Input::IsInitialized() const {
  return true;
}

void Input::InternalSwap(Input* other) {
  using std::swap;
  auto* lhs_arena = GetArenaForAllocation();
  auto* rhs_arena = other->GetArenaForAllocation();
  _internal_metadata_.InternalSwap(&other->_internal_metadata_);
  ::PROTOBUF_NAMESPACE_ID::internal::ArenaStringPtr::InternalSwap(
      &_impl_.testinputfield_, lhs_arena,
      &other->_impl_.testinputfield_, rhs_arena
  );
}

::PROTOBUF_NAMESPACE_ID::Metadata Input::GetMetadata() const {
  return ::_pbi::AssignDescriptors(
      &descriptor_table_main_2eproto_getter, &descriptor_table_main_2eproto_once,
      file_level_metadata_main_2eproto[0]);
}
// ===================================================================

class Output::_Internal {
 public:
};

Output::Output(::PROTOBUF_NAMESPACE_ID::Arena* arena)
  : ::PROTOBUF_NAMESPACE_ID::Message(arena) {
  SharedCtor(arena);
  // @@protoc_insertion_point(arena_constructor:Output)
}
Output::Output(const Output& from)
  : ::PROTOBUF_NAMESPACE_ID::Message(), _impl_(from._impl_) {
  _internal_metadata_.MergeFrom<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>(
      from._internal_metadata_);
  // @@protoc_insertion_point(copy_constructor:Output)
}

inline void Output::SharedCtor(::_pb::Arena* arena) {
  (void)arena;
  new (&_impl_) Impl_{
      decltype(_impl_.testoutputfield_) { 0 }

    , /*decltype(_impl_._cached_size_)*/{}
  };
}

Output::~Output() {
  // @@protoc_insertion_point(destructor:Output)
  if (auto *arena = _internal_metadata_.DeleteReturnArena<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>()) {
  (void)arena;
    return;
  }
  SharedDtor();
}

inline void Output::SharedDtor() {
  ABSL_DCHECK(GetArenaForAllocation() == nullptr);
}

void Output::SetCachedSize(int size) const {
  _impl_._cached_size_.Set(size);
}

void Output::Clear() {
// @@protoc_insertion_point(message_clear_start:Output)
  ::uint32_t cached_has_bits = 0;
  // Prevent compiler warnings about cached_has_bits being unused
  (void) cached_has_bits;

  _impl_.testoutputfield_ = 0;
  _internal_metadata_.Clear<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>();
}

const char* Output::_InternalParse(const char* ptr, ::_pbi::ParseContext* ctx) {
#define CHK_(x) if (PROTOBUF_PREDICT_FALSE(!(x))) goto failure
  while (!ctx->Done(&ptr)) {
    ::uint32_t tag;
    ptr = ::_pbi::ReadTag(ptr, &tag);
    switch (tag >> 3) {
      // int32 testOutputField = 1;
      case 1:
        if (PROTOBUF_PREDICT_TRUE(static_cast<::uint8_t>(tag) == 8)) {
          _impl_.testoutputfield_ = ::PROTOBUF_NAMESPACE_ID::internal::ReadVarint32(&ptr);
          CHK_(ptr);
        } else {
          goto handle_unusual;
        }
        continue;
      default:
        goto handle_unusual;
    }  // switch
  handle_unusual:
    if ((tag == 0) || ((tag & 7) == 4)) {
      CHK_(ptr);
      ctx->SetLastTag(tag);
      goto message_done;
    }
    ptr = UnknownFieldParse(
        tag,
        _internal_metadata_.mutable_unknown_fields<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>(),
        ptr, ctx);
    CHK_(ptr != nullptr);
  }  // while
message_done:
  return ptr;
failure:
  ptr = nullptr;
  goto message_done;
#undef CHK_
}

::uint8_t* Output::_InternalSerialize(
    ::uint8_t* target, ::PROTOBUF_NAMESPACE_ID::io::EpsCopyOutputStream* stream) const {
  // @@protoc_insertion_point(serialize_to_array_start:Output)
  ::uint32_t cached_has_bits = 0;
  (void) cached_has_bits;

  // int32 testOutputField = 1;
  if (this->_internal_testoutputfield() != 0) {
    target = stream->EnsureSpace(target);
    target = ::_pbi::WireFormatLite::WriteInt32ToArray(
        1, this->_internal_testoutputfield(), target);
  }

  if (PROTOBUF_PREDICT_FALSE(_internal_metadata_.have_unknown_fields())) {
    target = ::_pbi::WireFormat::InternalSerializeUnknownFieldsToArray(
        _internal_metadata_.unknown_fields<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>(::PROTOBUF_NAMESPACE_ID::UnknownFieldSet::default_instance), target, stream);
  }
  // @@protoc_insertion_point(serialize_to_array_end:Output)
  return target;
}

::size_t Output::ByteSizeLong() const {
// @@protoc_insertion_point(message_byte_size_start:Output)
  ::size_t total_size = 0;

  ::uint32_t cached_has_bits = 0;
  // Prevent compiler warnings about cached_has_bits being unused
  (void) cached_has_bits;

  // int32 testOutputField = 1;
  if (this->_internal_testoutputfield() != 0) {
    total_size += ::_pbi::WireFormatLite::Int32SizePlusOne(
        this->_internal_testoutputfield());
  }

  return MaybeComputeUnknownFieldsSize(total_size, &_impl_._cached_size_);
}

const ::PROTOBUF_NAMESPACE_ID::Message::ClassData Output::_class_data_ = {
    ::PROTOBUF_NAMESPACE_ID::Message::CopyWithSourceCheck,
    Output::MergeImpl
};
const ::PROTOBUF_NAMESPACE_ID::Message::ClassData*Output::GetClassData() const { return &_class_data_; }


void Output::MergeImpl(::PROTOBUF_NAMESPACE_ID::Message& to_msg, const ::PROTOBUF_NAMESPACE_ID::Message& from_msg) {
  auto* const _this = static_cast<Output*>(&to_msg);
  auto& from = static_cast<const Output&>(from_msg);
  // @@protoc_insertion_point(class_specific_merge_from_start:Output)
  ABSL_DCHECK_NE(&from, _this);
  ::uint32_t cached_has_bits = 0;
  (void) cached_has_bits;

  if (from._internal_testoutputfield() != 0) {
    _this->_internal_set_testoutputfield(from._internal_testoutputfield());
  }
  _this->_internal_metadata_.MergeFrom<::PROTOBUF_NAMESPACE_ID::UnknownFieldSet>(from._internal_metadata_);
}

void Output::CopyFrom(const Output& from) {
// @@protoc_insertion_point(class_specific_copy_from_start:Output)
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool Output::IsInitialized() const {
  return true;
}

void Output::InternalSwap(Output* other) {
  using std::swap;
  _internal_metadata_.InternalSwap(&other->_internal_metadata_);

  swap(_impl_.testoutputfield_, other->_impl_.testoutputfield_);
}

::PROTOBUF_NAMESPACE_ID::Metadata Output::GetMetadata() const {
  return ::_pbi::AssignDescriptors(
      &descriptor_table_main_2eproto_getter, &descriptor_table_main_2eproto_once,
      file_level_metadata_main_2eproto[1]);
}
// @@protoc_insertion_point(namespace_scope)
PROTOBUF_NAMESPACE_OPEN
template<> PROTOBUF_NOINLINE ::Input*
Arena::CreateMaybeMessage< ::Input >(Arena* arena) {
  return Arena::CreateMessageInternal< ::Input >(arena);
}
template<> PROTOBUF_NOINLINE ::Output*
Arena::CreateMaybeMessage< ::Output >(Arena* arena) {
  return Arena::CreateMessageInternal< ::Output >(arena);
}
PROTOBUF_NAMESPACE_CLOSE
// @@protoc_insertion_point(global_scope)
#include "google/protobuf/port_undef.inc"
