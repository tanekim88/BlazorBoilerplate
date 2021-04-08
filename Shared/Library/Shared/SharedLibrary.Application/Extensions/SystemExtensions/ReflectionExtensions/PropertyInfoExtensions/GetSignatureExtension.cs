/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Reflection;
using System.Text;



namespace SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.PropertyInfoExtensions
{
    public static class GetSignatureExtension
    {
        public static string GetSignature(this PropertyInfo propertyInfo)
        {
            var signatureBuilder = new StringBuilder();

            var signature = propertyInfo.GetAccessModifierSignature() + " ";
            signature += propertyInfo.PropertyType.GetSignature();

            signatureBuilder.Append(value: signature);
            signatureBuilder.Append(value: " ");

            signatureBuilder.Append(value: propertyInfo.Name);


            return signatureBuilder.ToString();
        }

        public static string GetFullSignature(this PropertyInfo propertyInfo)
        {
            var signatureBuilder = new StringBuilder();

            var signature = propertyInfo.GetAccessModifierSignature() + " ";
            signature += propertyInfo.PropertyType.GetFullSignature();

            signatureBuilder.Append(value: signature);
            signatureBuilder.Append(value: " ");

            signatureBuilder.Append(value: propertyInfo.Name);


            return signatureBuilder.ToString();
        }
    }
}