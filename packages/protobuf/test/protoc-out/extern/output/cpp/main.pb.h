// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: main.proto

#ifndef GOOGLE_PROTOBUF_INCLUDED_main_2eproto_2epb_2eh
#define GOOGLE_PROTOBUF_INCLUDED_main_2eproto_2epb_2eh

#include <limits>
#include <string>
#include <type_traits>

#include "google/protobuf/port_def.inc"
#if PROTOBUF_VERSION < 4022000
#error "This file was generated by a newer version of protoc which is"
#error "incompatible with your Protocol Buffer headers. Please update"
#error "your headers."
#endif  // PROTOBUF_VERSION

#if 4022000 < PROTOBUF_MIN_PROTOC_VERSION
#error "This file was generated by an older version of protoc which is"
#error "incompatible with your Protocol Buffer headers. Please"
#error "regenerate this file with a newer version of protoc."
#endif  // PROTOBUF_MIN_PROTOC_VERSION
#include "google/protobuf/port_undef.inc"
#include "google/protobuf/io/coded_stream.h"
#include "google/protobuf/arena.h"
#include "google/protobuf/arenastring.h"
#include "google/protobuf/generated_message_util.h"
#include "google/protobuf/metadata_lite.h"
#include "google/protobuf/generated_message_reflection.h"
#include "google/protobuf/message.h"
#include "google/protobuf/repeated_field.h"  // IWYU pragma: export
#include "google/protobuf/extension_set.h"  // IWYU pragma: export
#include "google/protobuf/unknown_field_set.h"
#include "foo/bar.pb.h"
#include "google/protobuf/empty.pb.h"
// @@protoc_insertion_point(includes)

// Must be included last.
#include "google/protobuf/port_def.inc"

#define PROTOBUF_INTERNAL_EXPORT_main_2eproto

PROTOBUF_NAMESPACE_OPEN
namespace internal {
class AnyMetadata;
}  // namespace internal
PROTOBUF_NAMESPACE_CLOSE

// Internal implementation detail -- do not use these members.
struct TableStruct_main_2eproto {
  static const ::uint32_t offsets[];
};
extern const ::PROTOBUF_NAMESPACE_ID::internal::DescriptorTable
    descriptor_table_main_2eproto;
class BarRequest;
struct BarRequestDefaultTypeInternal;
extern BarRequestDefaultTypeInternal _BarRequest_default_instance_;
class BarResponse;
struct BarResponseDefaultTypeInternal;
extern BarResponseDefaultTypeInternal _BarResponse_default_instance_;
PROTOBUF_NAMESPACE_OPEN
template <>
::BarRequest* Arena::CreateMaybeMessage<::BarRequest>(Arena*);
template <>
::BarResponse* Arena::CreateMaybeMessage<::BarResponse>(Arena*);
PROTOBUF_NAMESPACE_CLOSE


// ===================================================================


// -------------------------------------------------------------------

class BarRequest final :
    public ::PROTOBUF_NAMESPACE_ID::Message /* @@protoc_insertion_point(class_definition:BarRequest) */ {
 public:
  inline BarRequest() : BarRequest(nullptr) {}
  ~BarRequest() override;
  explicit PROTOBUF_CONSTEXPR BarRequest(::PROTOBUF_NAMESPACE_ID::internal::ConstantInitialized);

  BarRequest(const BarRequest& from);
  BarRequest(BarRequest&& from) noexcept
    : BarRequest() {
    *this = ::std::move(from);
  }

  inline BarRequest& operator=(const BarRequest& from) {
    CopyFrom(from);
    return *this;
  }
  inline BarRequest& operator=(BarRequest&& from) noexcept {
    if (this == &from) return *this;
    if (GetOwningArena() == from.GetOwningArena()
  #ifdef PROTOBUF_FORCE_COPY_IN_MOVE
        && GetOwningArena() != nullptr
  #endif  // !PROTOBUF_FORCE_COPY_IN_MOVE
    ) {
      InternalSwap(&from);
    } else {
      CopyFrom(from);
    }
    return *this;
  }

  static const ::PROTOBUF_NAMESPACE_ID::Descriptor* descriptor() {
    return GetDescriptor();
  }
  static const ::PROTOBUF_NAMESPACE_ID::Descriptor* GetDescriptor() {
    return default_instance().GetMetadata().descriptor;
  }
  static const ::PROTOBUF_NAMESPACE_ID::Reflection* GetReflection() {
    return default_instance().GetMetadata().reflection;
  }
  static const BarRequest& default_instance() {
    return *internal_default_instance();
  }
  static inline const BarRequest* internal_default_instance() {
    return reinterpret_cast<const BarRequest*>(
               &_BarRequest_default_instance_);
  }
  static constexpr int kIndexInFileMessages =
    0;

  friend void swap(BarRequest& a, BarRequest& b) {
    a.Swap(&b);
  }
  inline void Swap(BarRequest* other) {
    if (other == this) return;
  #ifdef PROTOBUF_FORCE_COPY_IN_SWAP
    if (GetOwningArena() != nullptr &&
        GetOwningArena() == other->GetOwningArena()) {
   #else  // PROTOBUF_FORCE_COPY_IN_SWAP
    if (GetOwningArena() == other->GetOwningArena()) {
  #endif  // !PROTOBUF_FORCE_COPY_IN_SWAP
      InternalSwap(other);
    } else {
      ::PROTOBUF_NAMESPACE_ID::internal::GenericSwap(this, other);
    }
  }
  void UnsafeArenaSwap(BarRequest* other) {
    if (other == this) return;
    ABSL_DCHECK(GetOwningArena() == other->GetOwningArena());
    InternalSwap(other);
  }

  // implements Message ----------------------------------------------

  BarRequest* New(::PROTOBUF_NAMESPACE_ID::Arena* arena = nullptr) const final {
    return CreateMaybeMessage<BarRequest>(arena);
  }
  using ::PROTOBUF_NAMESPACE_ID::Message::CopyFrom;
  void CopyFrom(const BarRequest& from);
  using ::PROTOBUF_NAMESPACE_ID::Message::MergeFrom;
  void MergeFrom( const BarRequest& from) {
    BarRequest::MergeImpl(*this, from);
  }
  private:
  static void MergeImpl(::PROTOBUF_NAMESPACE_ID::Message& to_msg, const ::PROTOBUF_NAMESPACE_ID::Message& from_msg);
  public:
  PROTOBUF_ATTRIBUTE_REINITIALIZES void Clear() final;
  bool IsInitialized() const final;

  ::size_t ByteSizeLong() const final;
  const char* _InternalParse(const char* ptr, ::PROTOBUF_NAMESPACE_ID::internal::ParseContext* ctx) final;
  ::uint8_t* _InternalSerialize(
      ::uint8_t* target, ::PROTOBUF_NAMESPACE_ID::io::EpsCopyOutputStream* stream) const final;
  int GetCachedSize() const final { return _impl_._cached_size_.Get(); }

  private:
  void SharedCtor(::PROTOBUF_NAMESPACE_ID::Arena* arena);
  void SharedDtor();
  void SetCachedSize(int size) const final;
  void InternalSwap(BarRequest* other);

  private:
  friend class ::PROTOBUF_NAMESPACE_ID::internal::AnyMetadata;
  static ::absl::string_view FullMessageName() {
    return "BarRequest";
  }
  protected:
  explicit BarRequest(::PROTOBUF_NAMESPACE_ID::Arena* arena);
  public:

  static const ClassData _class_data_;
  const ::PROTOBUF_NAMESPACE_ID::Message::ClassData*GetClassData() const final;

  ::PROTOBUF_NAMESPACE_ID::Metadata GetMetadata() const final;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  enum : int {
    kEmptyFieldNumber = 1,
  };
  // .google.protobuf.Empty empty = 1;
  bool has_empty() const;
  private:
  bool _internal_has_empty() const;

  public:
  void clear_empty() ;
  const ::PROTOBUF_NAMESPACE_ID::Empty& empty() const;
  PROTOBUF_NODISCARD ::PROTOBUF_NAMESPACE_ID::Empty* release_empty();
  ::PROTOBUF_NAMESPACE_ID::Empty* mutable_empty();
  void set_allocated_empty(::PROTOBUF_NAMESPACE_ID::Empty* empty);
  private:
  const ::PROTOBUF_NAMESPACE_ID::Empty& _internal_empty() const;
  ::PROTOBUF_NAMESPACE_ID::Empty* _internal_mutable_empty();
  public:
  void unsafe_arena_set_allocated_empty(
      ::PROTOBUF_NAMESPACE_ID::Empty* empty);
  ::PROTOBUF_NAMESPACE_ID::Empty* unsafe_arena_release_empty();
  // @@protoc_insertion_point(class_scope:BarRequest)
 private:
  class _Internal;

  template <typename T> friend class ::PROTOBUF_NAMESPACE_ID::Arena::InternalHelper;
  typedef void InternalArenaConstructable_;
  typedef void DestructorSkippable_;
  struct Impl_ {
    ::PROTOBUF_NAMESPACE_ID::Empty* empty_;
    mutable ::PROTOBUF_NAMESPACE_ID::internal::CachedSize _cached_size_;
  };
  union { Impl_ _impl_; };
  friend struct ::TableStruct_main_2eproto;
};// -------------------------------------------------------------------

class BarResponse final :
    public ::PROTOBUF_NAMESPACE_ID::Message /* @@protoc_insertion_point(class_definition:BarResponse) */ {
 public:
  inline BarResponse() : BarResponse(nullptr) {}
  ~BarResponse() override;
  explicit PROTOBUF_CONSTEXPR BarResponse(::PROTOBUF_NAMESPACE_ID::internal::ConstantInitialized);

  BarResponse(const BarResponse& from);
  BarResponse(BarResponse&& from) noexcept
    : BarResponse() {
    *this = ::std::move(from);
  }

  inline BarResponse& operator=(const BarResponse& from) {
    CopyFrom(from);
    return *this;
  }
  inline BarResponse& operator=(BarResponse&& from) noexcept {
    if (this == &from) return *this;
    if (GetOwningArena() == from.GetOwningArena()
  #ifdef PROTOBUF_FORCE_COPY_IN_MOVE
        && GetOwningArena() != nullptr
  #endif  // !PROTOBUF_FORCE_COPY_IN_MOVE
    ) {
      InternalSwap(&from);
    } else {
      CopyFrom(from);
    }
    return *this;
  }

  static const ::PROTOBUF_NAMESPACE_ID::Descriptor* descriptor() {
    return GetDescriptor();
  }
  static const ::PROTOBUF_NAMESPACE_ID::Descriptor* GetDescriptor() {
    return default_instance().GetMetadata().descriptor;
  }
  static const ::PROTOBUF_NAMESPACE_ID::Reflection* GetReflection() {
    return default_instance().GetMetadata().reflection;
  }
  static const BarResponse& default_instance() {
    return *internal_default_instance();
  }
  static inline const BarResponse* internal_default_instance() {
    return reinterpret_cast<const BarResponse*>(
               &_BarResponse_default_instance_);
  }
  static constexpr int kIndexInFileMessages =
    1;

  friend void swap(BarResponse& a, BarResponse& b) {
    a.Swap(&b);
  }
  inline void Swap(BarResponse* other) {
    if (other == this) return;
  #ifdef PROTOBUF_FORCE_COPY_IN_SWAP
    if (GetOwningArena() != nullptr &&
        GetOwningArena() == other->GetOwningArena()) {
   #else  // PROTOBUF_FORCE_COPY_IN_SWAP
    if (GetOwningArena() == other->GetOwningArena()) {
  #endif  // !PROTOBUF_FORCE_COPY_IN_SWAP
      InternalSwap(other);
    } else {
      ::PROTOBUF_NAMESPACE_ID::internal::GenericSwap(this, other);
    }
  }
  void UnsafeArenaSwap(BarResponse* other) {
    if (other == this) return;
    ABSL_DCHECK(GetOwningArena() == other->GetOwningArena());
    InternalSwap(other);
  }

  // implements Message ----------------------------------------------

  BarResponse* New(::PROTOBUF_NAMESPACE_ID::Arena* arena = nullptr) const final {
    return CreateMaybeMessage<BarResponse>(arena);
  }
  using ::PROTOBUF_NAMESPACE_ID::Message::CopyFrom;
  void CopyFrom(const BarResponse& from);
  using ::PROTOBUF_NAMESPACE_ID::Message::MergeFrom;
  void MergeFrom( const BarResponse& from) {
    BarResponse::MergeImpl(*this, from);
  }
  private:
  static void MergeImpl(::PROTOBUF_NAMESPACE_ID::Message& to_msg, const ::PROTOBUF_NAMESPACE_ID::Message& from_msg);
  public:
  PROTOBUF_ATTRIBUTE_REINITIALIZES void Clear() final;
  bool IsInitialized() const final;

  ::size_t ByteSizeLong() const final;
  const char* _InternalParse(const char* ptr, ::PROTOBUF_NAMESPACE_ID::internal::ParseContext* ctx) final;
  ::uint8_t* _InternalSerialize(
      ::uint8_t* target, ::PROTOBUF_NAMESPACE_ID::io::EpsCopyOutputStream* stream) const final;
  int GetCachedSize() const final { return _impl_._cached_size_.Get(); }

  private:
  void SharedCtor(::PROTOBUF_NAMESPACE_ID::Arena* arena);
  void SharedDtor();
  void SetCachedSize(int size) const final;
  void InternalSwap(BarResponse* other);

  private:
  friend class ::PROTOBUF_NAMESPACE_ID::internal::AnyMetadata;
  static ::absl::string_view FullMessageName() {
    return "BarResponse";
  }
  protected:
  explicit BarResponse(::PROTOBUF_NAMESPACE_ID::Arena* arena);
  public:

  static const ClassData _class_data_;
  const ::PROTOBUF_NAMESPACE_ID::Message::ClassData*GetClassData() const final;

  ::PROTOBUF_NAMESPACE_ID::Metadata GetMetadata() const final;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  enum : int {
    kMyExternFieldNumber = 1,
  };
  // .foo.Bar myExtern = 1;
  bool has_myextern() const;
  private:
  bool _internal_has_myextern() const;

  public:
  void clear_myextern() ;
  const ::foo::Bar& myextern() const;
  PROTOBUF_NODISCARD ::foo::Bar* release_myextern();
  ::foo::Bar* mutable_myextern();
  void set_allocated_myextern(::foo::Bar* myextern);
  private:
  const ::foo::Bar& _internal_myextern() const;
  ::foo::Bar* _internal_mutable_myextern();
  public:
  void unsafe_arena_set_allocated_myextern(
      ::foo::Bar* myextern);
  ::foo::Bar* unsafe_arena_release_myextern();
  // @@protoc_insertion_point(class_scope:BarResponse)
 private:
  class _Internal;

  template <typename T> friend class ::PROTOBUF_NAMESPACE_ID::Arena::InternalHelper;
  typedef void InternalArenaConstructable_;
  typedef void DestructorSkippable_;
  struct Impl_ {
    ::foo::Bar* myextern_;
    mutable ::PROTOBUF_NAMESPACE_ID::internal::CachedSize _cached_size_;
  };
  union { Impl_ _impl_; };
  friend struct ::TableStruct_main_2eproto;
};

// ===================================================================




// ===================================================================


#ifdef __GNUC__
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wstrict-aliasing"
#endif  // __GNUC__
// -------------------------------------------------------------------

// BarRequest

// .google.protobuf.Empty empty = 1;
inline bool BarRequest::_internal_has_empty() const {
  return this != internal_default_instance() && _impl_.empty_ != nullptr;
}
inline bool BarRequest::has_empty() const {
  return _internal_has_empty();
}
inline const ::PROTOBUF_NAMESPACE_ID::Empty& BarRequest::_internal_empty() const {
  const ::PROTOBUF_NAMESPACE_ID::Empty* p = _impl_.empty_;
  return p != nullptr ? *p : reinterpret_cast<const ::PROTOBUF_NAMESPACE_ID::Empty&>(
      ::PROTOBUF_NAMESPACE_ID::_Empty_default_instance_);
}
inline const ::PROTOBUF_NAMESPACE_ID::Empty& BarRequest::empty() const {
  // @@protoc_insertion_point(field_get:BarRequest.empty)
  return _internal_empty();
}
inline void BarRequest::unsafe_arena_set_allocated_empty(
    ::PROTOBUF_NAMESPACE_ID::Empty* empty) {
  if (GetArenaForAllocation() == nullptr) {
    delete reinterpret_cast<::PROTOBUF_NAMESPACE_ID::MessageLite*>(_impl_.empty_);
  }
  _impl_.empty_ = empty;
  // @@protoc_insertion_point(field_unsafe_arena_set_allocated:BarRequest.empty)
}
inline ::PROTOBUF_NAMESPACE_ID::Empty* BarRequest::release_empty() {
  
  ::PROTOBUF_NAMESPACE_ID::Empty* temp = _impl_.empty_;
  _impl_.empty_ = nullptr;
#ifdef PROTOBUF_FORCE_COPY_IN_RELEASE
  auto* old =  reinterpret_cast<::PROTOBUF_NAMESPACE_ID::MessageLite*>(temp);
  temp = ::PROTOBUF_NAMESPACE_ID::internal::DuplicateIfNonNull(temp);
  if (GetArenaForAllocation() == nullptr) { delete old; }
#else  // PROTOBUF_FORCE_COPY_IN_RELEASE
  if (GetArenaForAllocation() != nullptr) {
    temp = ::PROTOBUF_NAMESPACE_ID::internal::DuplicateIfNonNull(temp);
  }
#endif  // !PROTOBUF_FORCE_COPY_IN_RELEASE
  return temp;
}
inline ::PROTOBUF_NAMESPACE_ID::Empty* BarRequest::unsafe_arena_release_empty() {
  // @@protoc_insertion_point(field_release:BarRequest.empty)
  
  ::PROTOBUF_NAMESPACE_ID::Empty* temp = _impl_.empty_;
  _impl_.empty_ = nullptr;
  return temp;
}
inline ::PROTOBUF_NAMESPACE_ID::Empty* BarRequest::_internal_mutable_empty() {
  
  if (_impl_.empty_ == nullptr) {
    auto* p = CreateMaybeMessage<::PROTOBUF_NAMESPACE_ID::Empty>(GetArenaForAllocation());
    _impl_.empty_ = p;
  }
  return _impl_.empty_;
}
inline ::PROTOBUF_NAMESPACE_ID::Empty* BarRequest::mutable_empty() {
  ::PROTOBUF_NAMESPACE_ID::Empty* _msg = _internal_mutable_empty();
  // @@protoc_insertion_point(field_mutable:BarRequest.empty)
  return _msg;
}
inline void BarRequest::set_allocated_empty(::PROTOBUF_NAMESPACE_ID::Empty* empty) {
  ::PROTOBUF_NAMESPACE_ID::Arena* message_arena = GetArenaForAllocation();
  if (message_arena == nullptr) {
    delete reinterpret_cast< ::PROTOBUF_NAMESPACE_ID::MessageLite*>(_impl_.empty_);
  }
  if (empty) {
    ::PROTOBUF_NAMESPACE_ID::Arena* submessage_arena =
        ::PROTOBUF_NAMESPACE_ID::Arena::InternalGetOwningArena(
                reinterpret_cast<::PROTOBUF_NAMESPACE_ID::MessageLite*>(empty));
    if (message_arena != submessage_arena) {
      empty = ::PROTOBUF_NAMESPACE_ID::internal::GetOwnedMessage(
          message_arena, empty, submessage_arena);
    }

  } else {

  }
  _impl_.empty_ = empty;
  // @@protoc_insertion_point(field_set_allocated:BarRequest.empty)
}

// -------------------------------------------------------------------

// BarResponse

// .foo.Bar myExtern = 1;
inline bool BarResponse::_internal_has_myextern() const {
  return this != internal_default_instance() && _impl_.myextern_ != nullptr;
}
inline bool BarResponse::has_myextern() const {
  return _internal_has_myextern();
}
inline const ::foo::Bar& BarResponse::_internal_myextern() const {
  const ::foo::Bar* p = _impl_.myextern_;
  return p != nullptr ? *p : reinterpret_cast<const ::foo::Bar&>(
      ::foo::_Bar_default_instance_);
}
inline const ::foo::Bar& BarResponse::myextern() const {
  // @@protoc_insertion_point(field_get:BarResponse.myExtern)
  return _internal_myextern();
}
inline void BarResponse::unsafe_arena_set_allocated_myextern(
    ::foo::Bar* myextern) {
  if (GetArenaForAllocation() == nullptr) {
    delete reinterpret_cast<::PROTOBUF_NAMESPACE_ID::MessageLite*>(_impl_.myextern_);
  }
  _impl_.myextern_ = myextern;
  // @@protoc_insertion_point(field_unsafe_arena_set_allocated:BarResponse.myExtern)
}
inline ::foo::Bar* BarResponse::release_myextern() {
  
  ::foo::Bar* temp = _impl_.myextern_;
  _impl_.myextern_ = nullptr;
#ifdef PROTOBUF_FORCE_COPY_IN_RELEASE
  auto* old =  reinterpret_cast<::PROTOBUF_NAMESPACE_ID::MessageLite*>(temp);
  temp = ::PROTOBUF_NAMESPACE_ID::internal::DuplicateIfNonNull(temp);
  if (GetArenaForAllocation() == nullptr) { delete old; }
#else  // PROTOBUF_FORCE_COPY_IN_RELEASE
  if (GetArenaForAllocation() != nullptr) {
    temp = ::PROTOBUF_NAMESPACE_ID::internal::DuplicateIfNonNull(temp);
  }
#endif  // !PROTOBUF_FORCE_COPY_IN_RELEASE
  return temp;
}
inline ::foo::Bar* BarResponse::unsafe_arena_release_myextern() {
  // @@protoc_insertion_point(field_release:BarResponse.myExtern)
  
  ::foo::Bar* temp = _impl_.myextern_;
  _impl_.myextern_ = nullptr;
  return temp;
}
inline ::foo::Bar* BarResponse::_internal_mutable_myextern() {
  
  if (_impl_.myextern_ == nullptr) {
    auto* p = CreateMaybeMessage<::foo::Bar>(GetArenaForAllocation());
    _impl_.myextern_ = p;
  }
  return _impl_.myextern_;
}
inline ::foo::Bar* BarResponse::mutable_myextern() {
  ::foo::Bar* _msg = _internal_mutable_myextern();
  // @@protoc_insertion_point(field_mutable:BarResponse.myExtern)
  return _msg;
}
inline void BarResponse::set_allocated_myextern(::foo::Bar* myextern) {
  ::PROTOBUF_NAMESPACE_ID::Arena* message_arena = GetArenaForAllocation();
  if (message_arena == nullptr) {
    delete reinterpret_cast< ::PROTOBUF_NAMESPACE_ID::MessageLite*>(_impl_.myextern_);
  }
  if (myextern) {
    ::PROTOBUF_NAMESPACE_ID::Arena* submessage_arena =
        ::PROTOBUF_NAMESPACE_ID::Arena::InternalGetOwningArena(
                reinterpret_cast<::PROTOBUF_NAMESPACE_ID::MessageLite*>(myextern));
    if (message_arena != submessage_arena) {
      myextern = ::PROTOBUF_NAMESPACE_ID::internal::GetOwnedMessage(
          message_arena, myextern, submessage_arena);
    }

  } else {

  }
  _impl_.myextern_ = myextern;
  // @@protoc_insertion_point(field_set_allocated:BarResponse.myExtern)
}

#ifdef __GNUC__
#pragma GCC diagnostic pop
#endif  // __GNUC__

// @@protoc_insertion_point(namespace_scope)


// @@protoc_insertion_point(global_scope)

#include "google/protobuf/port_undef.inc"

#endif  // GOOGLE_PROTOBUF_INCLUDED_main_2eproto_2epb_2eh
