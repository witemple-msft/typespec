<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: com/azure/Test.proto

namespace GPBMetadata\Com\Azure;

class Test
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        $pool->internalAddGeneratedFile(
            '
�
com/azure/Test.protocom.azure.Test"
Input
testInputField (	"6
Output
testOutputField (
secondField (	2?
Service4
Foo.com.azure.Test.Input.com.azure.Test.Outputbproto3'
        , true);

        static::$is_initialized = true;
    }
}

