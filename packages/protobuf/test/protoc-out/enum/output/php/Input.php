<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: main.proto

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>Input</code>
 */
class Input extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>string testInputField = 1;</code>
     */
    protected $testInputField = '';
    /**
     * Generated from protobuf field <code>.InputType type = 2;</code>
     */
    protected $type = 0;
    /**
     * Generated from protobuf field <code>.InputTypeWithAlias aliased = 3;</code>
     */
    protected $aliased = 0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $testInputField
     *     @type int $type
     *     @type int $aliased
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Main::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string testInputField = 1;</code>
     * @return string
     */
    public function getTestInputField()
    {
        return $this->testInputField;
    }

    /**
     * Generated from protobuf field <code>string testInputField = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setTestInputField($var)
    {
        GPBUtil::checkString($var, True);
        $this->testInputField = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.InputType type = 2;</code>
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Generated from protobuf field <code>.InputType type = 2;</code>
     * @param int $var
     * @return $this
     */
    public function setType($var)
    {
        GPBUtil::checkEnum($var, \InputType::class);
        $this->type = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.InputTypeWithAlias aliased = 3;</code>
     * @return int
     */
    public function getAliased()
    {
        return $this->aliased;
    }

    /**
     * Generated from protobuf field <code>.InputTypeWithAlias aliased = 3;</code>
     * @param int $var
     * @return $this
     */
    public function setAliased($var)
    {
        GPBUtil::checkEnum($var, \InputTypeWithAlias::class);
        $this->aliased = $var;

        return $this;
    }

}

