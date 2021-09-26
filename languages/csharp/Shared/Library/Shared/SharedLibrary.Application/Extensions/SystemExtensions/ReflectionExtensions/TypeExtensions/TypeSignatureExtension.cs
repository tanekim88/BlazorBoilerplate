/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Collections.Generic;
using System.Linq;



namespace System.Reflection
{
    public static class TypeSignatureExtension
    {
        /// <summary>
        ///     Get a fully qualified signature for <paramref name="type" />
        /// </summary>
        /// <param name="type">Type. May be generic or <see cref="Nullable{T}" /></param>
        /// <returns>Fully qualified signature</returns>
        public static string GetFullSignature(this Type type)
        {
            var isNullableType = type.IsNullable(underlyingType: out var underlyingNullableType);

            var signatureType = isNullableType
                ? underlyingNullableType
                : type;

            var isGenericType = signatureType.IsGeneric();

            var signature = TypeExtensionMethods.GetQualifiedTypeName(type: signatureType);

            if (isGenericType)
                // Add the generic arguments
                signature += BuildGenericFullSignature(genericArgumentTypes: signatureType.GetGenericArguments());

            if (isNullableType) signature += "?";

            return signature;
        }

        /// <summary>
        ///     Get a fully qualified signature for <paramref name="type" />
        /// </summary>
        /// <param name="type">Type. May be generic or <see cref="Nullable{T}" /></param>
        /// <returns>Fully qualified signature</returns>
        public static string GetSignature(this Type type)
        {
            var isNullableType = type.IsNullable(underlyingType: out var underlyingNullableType);

            var signatureType = isNullableType
                ? underlyingNullableType
                : type;

            var isGenericType = signatureType.IsGeneric();

            var signature = TypeExtensionMethods.GetQualifiedTypeName(type: signatureType);

            var splitted = signature.Split(separator: ".");
            signature = splitted[splitted.Length - 1];

            if (isGenericType)
                // Add the generic arguments
                signature += BuildGenericSignature(genericArgumentTypes: signatureType.GetGenericArguments());

            if (isNullableType) signature += "?";

            return signature;
        }

        /// <summary>
        ///     Takes an <see cref="IEnumerable{T}" /> and creates a generic type signature (&lt;string, string&gt; for example)
        /// </summary>
        /// <param name="genericArgumentTypes"></param>
        /// <returns>Generic type signature like &lt;Type, ...&gt;</returns>
        public static string BuildGenericSignature(IEnumerable<Type> genericArgumentTypes)
        {
            var argumentSignatures = genericArgumentTypes.Select(selector: GetSignature);

            return "<" + string.Join(separator: ", ", values: argumentSignatures) + ">";
        }

        /// <summary>
        ///     Takes an <see cref="IEnumerable{T}" /> and creates a generic type signature (&lt;string, string&gt; for example)
        /// </summary>
        /// <param name="genericArgumentTypes"></param>
        /// <returns>Generic type signature like &lt;Type, ...&gt;</returns>
        public static string BuildGenericFullSignature(IEnumerable<Type> genericArgumentTypes)
        {
            var argumentSignatures = genericArgumentTypes.Select(selector: GetFullSignature);

            return ("<" + string.Join(separator: ", ", values: argumentSignatures) + ">").Replace(oldValue: "+",
                newValue: ".");
        }
    }
}