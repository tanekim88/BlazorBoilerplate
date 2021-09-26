/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Reflection;
using System.Text;



namespace SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.MethodInfoExtensions
{
    public static class GetNameWithGenericSignatureExtension
    {
        public static string GetNameWithGenericSignature(this MethodInfo method)
        {
            var signatureBuilder = new StringBuilder();

            // Add method name
            signatureBuilder.Append(value: method.Name);

            // Add method generics
            if (method.IsGenericMethod) signatureBuilder.Append(value: method.GetGenericSignature());

            return signatureBuilder.ToString();
        }
    }
}