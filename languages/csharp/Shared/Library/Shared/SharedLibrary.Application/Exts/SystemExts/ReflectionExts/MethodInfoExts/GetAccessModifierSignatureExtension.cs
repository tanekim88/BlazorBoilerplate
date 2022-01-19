/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Reflection;



namespace SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.MethodInfoExtensions
{
    public static class GetAccessModifierSignatureExtension
    {
        public static string GetAccessModifierSignature(this global::System.Reflection.MethodInfo method)
        {
            string signature = null;

            if (method.IsAssembly)
            {
                signature = "internal ";

                if (method.IsFamily)
                    signature += "protected ";
            }
            else if (method.IsPublic)
            {
                signature = "public ";
            }
            else if (method.IsPrivate)
            {
                signature = "private ";
            }
            else if (method.IsFamily)
            {
                signature = "protected ";
            }

            if (method.IsStatic)
                signature += "static ";

            return signature.Trim();
        }
    }
}