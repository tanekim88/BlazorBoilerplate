/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Reflection;



namespace SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.PropertyInfoExtensions
{
    public static class GetTypeSignatureExtension
    {
        public static string GetTypeSignature(this global::System.Reflection.PropertyInfo propertyInfo)
        {
            return propertyInfo.PropertyType.GetSignature();
        }

        public static string GetFullTypeSignature(this global::System.Reflection.PropertyInfo propertyInfo)
        {
            return propertyInfo.PropertyType.GetFullSignature();
        }
    }
}