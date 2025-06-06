// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Microsoft.TypeSpec.Generator.Expressions;
using Microsoft.TypeSpec.Generator.Input;
using Microsoft.TypeSpec.Generator.Primitives;
using Microsoft.TypeSpec.Generator.Snippets;
using Microsoft.TypeSpec.Generator.Statements;
using Microsoft.TypeSpec.Generator.Utilities;

namespace Microsoft.TypeSpec.Generator.Providers
{
    [DebuggerDisplay("{GetDebuggerDisplay(),nq}")]
    public class PropertyProvider
    {
        private VariableExpression? _variable;
        private Lazy<ParameterProvider> _parameter;

        public FormattableString? Description { get; }
        public MethodSignatureModifiers Modifiers { get; internal set; }
        public CSharpType Type { get; internal set; }
        public string Name { get; internal set; }
        public PropertyBody Body { get; internal set; }
        public CSharpType? ExplicitInterface { get; }
        public XmlDocProvider? XmlDocs { get; private set; }
        public PropertyWireInformation? WireInfo { get; internal set; }
        public bool IsDiscriminator { get; internal set; }
        public bool IsAdditionalProperties { get; init; }
        public FieldProvider? BackingField { get; set; }
        public PropertyProvider? BaseProperty { get; set; }

        /// <summary>
        /// Converts this property to a parameter.
        /// </summary>
        public ParameterProvider AsParameter => _parameter.Value;

        public TypeProvider EnclosingType { get; }

        public string? OriginalName { get; internal init; }

        internal Lazy<NamedTypeSymbolProvider?>? CustomProvider { get; init; }

        // for mocking
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        protected PropertyProvider()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }

        internal static bool TryCreate(InputModelProperty inputProperty, TypeProvider enclosingType, [NotNullWhen(true)] out PropertyProvider? property)
        {
            var type = CodeModelGenerator.Instance.TypeFactory.CreateCSharpType(inputProperty.Type);
            if (type == null)
            {
                property = null;
                return false;
            }
            property = new PropertyProvider(inputProperty, type, enclosingType);
            return true;
        }

        public PropertyProvider(InputModelProperty inputProperty, TypeProvider enclosingType)
        : this(
            inputProperty,
            CodeModelGenerator.Instance.TypeFactory.CreateCSharpType(inputProperty.Type) ?? throw new InvalidOperationException($"Could not create CSharpType for property {inputProperty.Name}"),
            enclosingType)
        {
        }

        private PropertyProvider(InputModelProperty inputProperty, CSharpType propertyType, TypeProvider enclosingType)
        {
            if (!inputProperty.IsRequired && !propertyType.IsCollection)
            {
                propertyType = propertyType.WithNullable(true);
            }

            EnclosingType = enclosingType;
            var serializationFormat = CodeModelGenerator.Instance.TypeFactory.GetSerializationFormat(inputProperty.Type);
            var propHasSetter = PropertyHasSetter(propertyType, inputProperty);
            MethodSignatureModifiers setterModifier = propHasSetter ? MethodSignatureModifiers.Public : MethodSignatureModifiers.None;

            Type = inputProperty.IsReadOnly ? propertyType.OutputType : propertyType;
            Modifiers = inputProperty.IsDiscriminator ? MethodSignatureModifiers.Internal : MethodSignatureModifiers.Public;
            Name = inputProperty.Name == enclosingType.Name
                ? $"{inputProperty.Name.ToCleanName()}Property"
                : inputProperty.Name.ToCleanName();
            Body = new AutoPropertyBody(propHasSetter, setterModifier, GetPropertyInitializationValue(propertyType, inputProperty));
            Description = DocHelpers.GetFormattableDescription(inputProperty.Summary, inputProperty.Doc) ?? PropertyDescriptionBuilder.CreateDefaultPropertyDescription(Name, !Body.HasSetter);
            XmlDocs = new XmlDocProvider(PropertyDescriptionBuilder.BuildPropertyDescription(
                inputProperty,
                propertyType,
                serializationFormat,
                Description))
            {
                // TODO -- should write parameter xml doc if this is an IndexerDeclaration: https://github.com/microsoft/typespec/issues/3276
            };
            WireInfo = new PropertyWireInformation(inputProperty);
            IsDiscriminator = inputProperty.IsDiscriminator;

            InitializeParameter(DocHelpers.GetFormattableDescription(inputProperty.Summary, inputProperty.Doc) ?? FormattableStringHelpers.Empty);
        }

        public PropertyProvider(
            FormattableString? description,
            MethodSignatureModifiers modifiers,
            CSharpType type,
            string name,
            PropertyBody body,
            TypeProvider enclosingType,
            CSharpType? explicitInterface = null,
            PropertyWireInformation? wireInfo = null)
        {
            Description = description ?? (IsPropertyPrivate(modifiers, enclosingType.DeclarationModifiers) ? null
                : PropertyDescriptionBuilder.CreateDefaultPropertyDescription(name, !body.HasSetter));

            if (Description != null)
            {
                XmlDocs = new XmlDocProvider(new XmlDocSummaryStatement([Description]));
            }

            Modifiers = modifiers;
            Type = type;
            Name = name;
            Body = body;
            ExplicitInterface = explicitInterface;

            WireInfo = wireInfo;
            EnclosingType = enclosingType;

            InitializeParameter(description ?? FormattableStringHelpers.Empty);
        }

        private static bool IsPropertyPrivate(MethodSignatureModifiers modifiers, TypeSignatureModifiers enclosingTypeModifiers)
        {
            return (modifiers.HasFlag(MethodSignatureModifiers.Private) && !modifiers.HasFlag(MethodSignatureModifiers.Protected))
                   || enclosingTypeModifiers.HasFlag(TypeSignatureModifiers.Private);
        }

        [MemberNotNull(nameof(_parameter))]
        private void InitializeParameter(FormattableString description)
        {
            _parameter = new(() => new ParameterProvider(Name.ToVariableName(), description, Type, property: this));
        }

        public VariableExpression AsVariableExpression => _variable ??= new(Type, Name.ToVariableName());

        /// <summary>
        /// Returns true if the property has a setter.
        /// </summary>
        protected virtual bool PropertyHasSetter(CSharpType type, InputModelProperty inputProperty)
        {
            if (inputProperty.IsDiscriminator)
            {
                return true;
            }

            if (inputProperty.IsReadOnly)
            {
                return false;
            }

            if (type.IsLiteral && inputProperty.IsRequired)
            {
                return false;
            }

            // Output-only properties don't need setters.
            if (!inputProperty.EnclosingType!.Usage.HasFlag(InputModelTypeUsage.Input))
            {
                return false;
            }

            // At this point, we know that we are dealing with an Input model.
            // If the property is required and is not on a round-trip model, it doesn't need a setter as it can just be set via
            // constructor.
            // Round-trip models need setters so that a model returned from a service method can be modified.
            if (inputProperty.IsRequired && !inputProperty.EnclosingType!.Usage.HasFlag(InputModelTypeUsage.Output))
            {
                return false;
            }

            if (EnclosingType.DeclarationModifiers.HasFlag(TypeSignatureModifiers.Struct | TypeSignatureModifiers.ReadOnly))
            {
                return false;
            }

            if (type is { IsCollection: true, IsReadOnlyMemory: false })
            {
                return type.IsNullable;
            }

            return true;
        }

        private ValueExpression? GetPropertyInitializationValue(CSharpType propertyType, InputModelProperty inputProperty)
        {
            if (!inputProperty.IsRequired)
                return null;

            if (propertyType.IsLiteral)
            {
                if (!propertyType.IsNullable)
                {
                    return Snippet.Literal(propertyType.Literal);
                }
                else
                {
                    return Snippet.DefaultOf(propertyType);
                }
            }

            return null;
        }

        private string GetDebuggerDisplay()
        {
            return $"Name: {Name}, Type: {Type}";
        }

        private MemberExpression? _asMember;
        public static implicit operator MemberExpression(PropertyProvider property)
            => property._asMember ??= new MemberExpression(null, property.Name);

        public void Update(
            PropertyBody? body = null,
            XmlDocProvider? xmlDocs = null)
        {
            if (body != null)
            {
                Body = body;
            }
            if (xmlDocs != null)
            {
                XmlDocs = xmlDocs;
            }
        }
    }
}
