/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Collections.Concurrent;



namespace System.Reflection
{
    public static class IsSimpleTypeExtension
    {
        private static readonly ConcurrentDictionary<Type, bool> IsSimpleTypeCache =
            new();

        public static bool IsSimpleType(this Type type)
        {
            return IsSimpleTypeCache.GetOrAdd(key: type, valueFactory: t =>
                type.IsPrimitive ||
                type.IsEnum ||
                type == typeof(string) ||
                type == typeof(decimal) ||
                type == typeof(DateTime) ||
                type == typeof(DateTimeOffset) ||
                type == typeof(TimeSpan) ||
                type == typeof(Guid) ||
                IsNullableSimpleType(t: type));

            static bool IsNullableSimpleType(Type t)
            {
                var underlyingType = Nullable.GetUnderlyingType(nullableType: t);
                return underlyingType != null && IsSimpleType(type: underlyingType);
            }
        }
    }
}