/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Reflection;



namespace SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.MethodInfoExtensions
{
    public static class GetTypeSignatureExtension
    {
        public static string GetTypeSignature(this global::System.Reflection.MethodInfo method)
        {
            return method.ReturnType.GetSignature();
        }

        public static string GetFullTypeSignature(this global::System.Reflection.MethodInfo method)
        {
            return method.ReturnType.GetFullSignature();
        }
    }
}