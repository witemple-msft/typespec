# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: com/azure/test.proto

require 'google/protobuf'

Google::Protobuf::DescriptorPool.generated_pool.build do
  add_file("com/azure/test.proto", :syntax => :proto3) do
    add_message "com.azure.test.FooRequest" do
      optional :testInputField, :string, 1
    end
    add_message "com.azure.test.FooResponse" do
      optional :testOutputField, :int32, 1
      optional :secondField, :string, 2
    end
  end
end

module Com
  module Azure
    module Test
      FooRequest = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("com.azure.test.FooRequest").msgclass
      FooResponse = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("com.azure.test.FooResponse").msgclass
    end
  end
end
