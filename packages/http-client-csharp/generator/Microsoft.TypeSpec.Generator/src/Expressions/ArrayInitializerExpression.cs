// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System.Collections.Generic;

namespace Microsoft.TypeSpec.Generator.Expressions
{
    /// <summary>
    /// Represents an array initializer expression.
    /// </summary>
    /// <param name="Elements">The elements to initialize the array to.</param>
    /// <param name="IsInline">Flag to determine if the array should be initialized inline.</param>
    public sealed record ArrayInitializerExpression(IReadOnlyList<ValueExpression>? Elements = null, bool IsInline = true) : ValueExpression
    {
        internal override void Write(CodeWriter writer)
        {
            if (Elements is not { Count: > 0 })
            {
                writer.AppendRaw("{ }");
                return;
            }

            if (IsInline)
            {
                writer.AppendRaw("{ ");
                for (int i = 0; i < Elements.Count; i++)
                {
                    Elements[i].Write(writer);
                    if (i < Elements.Count - 1)
                        writer.AppendRaw(", ");
                }
                writer.AppendRaw(" }");
            }
            else
            {
                writer.WriteLine();
                using (writer.ScopeRaw(newLine: false))
                {
                    for (int i = 0; i < Elements.Count; i++)
                    {
                        Elements[i].Write(writer);
                        if (i < Elements.Count - 1)
                            writer.WriteRawLine(",");
                        else
                            writer.WriteLine();
                    }
                }
            }
        }
    }
}
