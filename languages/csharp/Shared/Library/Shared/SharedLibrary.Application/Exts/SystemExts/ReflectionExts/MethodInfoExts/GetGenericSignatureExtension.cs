/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System;
using System.Reflection;



namespace SharedLibrary.Application.Exts.SystemExts.ReflectionExts.MethodInfoExts
{
    public static class GetGenericSignatureExtension
    {
        public static string GetGenericFullSignature(this global::System.Reflection.MethodInfo method)
        {
            if (method == null) throw new ArgumentNullException(paramName: nameof(method));
            if (!method.IsGenericMethod) throw new ArgumentException(message: $"{method.Name} is not generic.");

            return TypeSignatureExtension.BuildGenericFullSignature(genericArgumentTypes: method.GetGenericArguments());
        }

        public static string GetGenericSignature(this global::System.Reflection.MethodInfo method)
        {
            if (method == null) throw new ArgumentNullException(paramName: nameof(method));
            if (!method.IsGenericMethod) throw new ArgumentException(message: $"{method.Name} is not generic.");

            return TypeSignatureExtension.BuildGenericSignature(genericArgumentTypes: method.GetGenericArguments());
        }
    }
}