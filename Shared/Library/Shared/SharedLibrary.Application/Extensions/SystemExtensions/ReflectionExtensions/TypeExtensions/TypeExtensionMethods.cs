/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

namespace System.Reflection
{
    public static class TypeExtensionMethods
    {
        public static bool IsNullable(this Type type, out Type underlyingType)
        {
            underlyingType = Nullable.GetUnderlyingType(nullableType: type);
            return underlyingType != null;
        }

        /// <summary>
        ///     Is this type a generic type
        /// </summary>
        /// <param name="type"></param>
        /// <returns>True if generic, otherwise False</returns>
        public static bool IsGeneric(this Type type)
        {
            return type.IsGenericType
                   && type.Name
                       .Contains(value: "`");
        }

        /// <summary>
        ///     Gets the fully qualified type name of <paramref name="type" />.
        ///     This will use any keywords in place of types where possible (string instead of System.String for example)
        /// </summary>
        /// <param name="type"></param>
        /// <returns>The fully qualified name for <paramref name="type" /></returns>
        public static string GetQualifiedTypeName(Type type)
        {
            switch (type.Name)
            {
                case "String":
                    return "string";
                case "Int32":
                    return "int";
                case "Decimal":
                    return "decimal";
                case "Object":
                    return "object";
                case "Void":
                    return "void";
                case "Boolean":
                    return "bool";
            }


            //TODO: Figure out how type.FullName could be null and document (or remove) this conditional
            var signature = string.IsNullOrWhiteSpace(value: type.FullName)
                ? type.Name
                : type.FullName;


            if (type.FullName == null && type.IsGenericType)
            {
                if (type.ReflectedType == null)
                    signature = type.Namespace + "." + type.Name;
                else
                    signature = type.ReflectedType.FullName + "." + type.Name;

                signature = signature.Replace(oldValue: "+", newValue: ".");
            }

            if (IsGeneric(type: type))
                signature = RemoveGenericTypeNameArgumentCount(genericTypeSignature: signature);

            return signature;
        }


        /// <summary>
        ///     This removes the `{argumentcount} from a the signature of a generic type
        /// </summary>
        /// <param name="genericTypeSignature">Signature of a generic type</param>
        /// <returns><paramref name="genericTypeSignature" /> without any argument count</returns>
        public static string RemoveGenericTypeNameArgumentCount(string genericTypeSignature)
        {
            return genericTypeSignature.Substring(startIndex: 0, length: genericTypeSignature.IndexOf(value: '`'));
        }
    }
}