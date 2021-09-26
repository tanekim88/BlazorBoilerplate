/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Reflection;



namespace SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.PropertyInfoExtensions
{
    public static class GetAccessModifierSignatureExtension
    {
        public static string GetAccessModifierSignature(this PropertyInfo propertyInfo)
        {
            string signature = null;

            MethodInfo methodInfo = null;

            if (propertyInfo.SetMethod == null)
                methodInfo = propertyInfo.GetMethod;
            if (propertyInfo.GetMethod == null)
                methodInfo = propertyInfo.SetMethod;

            if (methodInfo == null)
            {
                if (propertyInfo.GetMethod.IsPublic) methodInfo = propertyInfo.GetMethod;

                if (propertyInfo.SetMethod.IsPublic) methodInfo = propertyInfo.GetMethod;

                if (propertyInfo.GetMethod.IsAssembly) methodInfo = propertyInfo.GetMethod;

                if (propertyInfo.SetMethod.IsAssembly) methodInfo = propertyInfo.GetMethod;

                if (propertyInfo.GetMethod.IsFamily) methodInfo = propertyInfo.GetMethod;

                if (propertyInfo.SetMethod.IsFamily) methodInfo = propertyInfo.GetMethod;

                if (propertyInfo.GetMethod.IsPrivate) methodInfo = propertyInfo.GetMethod;

                if (propertyInfo.SetMethod.IsPrivate) methodInfo = propertyInfo.GetMethod;
            }

            if (methodInfo.IsAssembly)
            {
                signature = "internal ";

                if (methodInfo.IsFamily)
                    signature += "protected ";
            }
            else if (methodInfo.IsPublic)
            {
                signature = "public ";
            }
            else if (methodInfo.IsPrivate)
            {
                signature = "private ";
            }
            else if (methodInfo.IsFamily)
            {
                signature = "protected ";
            }

            if (methodInfo.IsStatic)
                signature += "static ";

            return signature.Trim();
        }
    }
}