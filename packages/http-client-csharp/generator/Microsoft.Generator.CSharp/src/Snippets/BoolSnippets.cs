// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Microsoft.Generator.CSharp.Expressions;

namespace Microsoft.Generator.CSharp.Snippets
{
    public static class BoolSnippets
    {
        public static ScopedApi<bool> Or(this ScopedApi<bool> boolExpression, ValueExpression other) => new(new BinaryOperatorExpression("||", boolExpression, other));

        public static ScopedApi<bool> And(this ScopedApi<bool> boolExpression, ValueExpression other) => new(new BinaryOperatorExpression("&&", boolExpression, other));
    }
}
