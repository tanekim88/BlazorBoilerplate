/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Reflection;
using System.Text;



namespace SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.MethodInfoExtensions
{
    public static class GetSignatureExtension
    {
        public static string GetFullSignature(this global::System.Reflection.MethodInfo method, bool invokable = false)
        {
            var signatureBuilder = new StringBuilder();

            // Add our method accessors if it's not invokable
            if (!invokable)
            {
                var signature = method.GetAccessModifierSignature() + " ";

                signature += method.ReturnType.GetFullSignature();

                signatureBuilder.Append(value: signature);
                signatureBuilder.Append(value: " ");
            }

            // Add method name
            signatureBuilder.Append(value: method.Name);

            // Add method generics
            if (method.IsGenericMethod) signatureBuilder.Append(value: method.GetGenericFullSignature());

            // Add method parameters
            signatureBuilder.Append(value: "(" + string.Join(separator: ',',
                values: method.GetFullParameterSignatures(invokable: invokable)) + ")");

            return signatureBuilder.ToString().Replace(oldValue: "+", newValue: ".");
        }

        public static string GetSignature(this global::System.Reflection.MethodInfo method, bool invokable = false)
        {
            var signatureBuilder = new StringBuilder();

            // Add our method accessors if it's not invokable
            if (!invokable)
            {
                var signature = method.GetAccessModifierSignature() + " ";

                signature += method.ReturnType.GetSignature();

                signatureBuilder.Append(value: signature);
                signatureBuilder.Append(value: " ");
            }

            // Add method name
            signatureBuilder.Append(value: method.Name);

            // Add method generics
            if (method.IsGenericMethod) signatureBuilder.Append(value: method.GetGenericSignature());

            // Add method parameters
            signatureBuilder.Append(value: "(" +
                                           string.Join(separator: ',',
                                               values: method.GetParameterSignatures(invokable: invokable)) + ")");

            return signatureBuilder.ToString().Replace(oldValue: "+", newValue: ".");
        }
    }
}