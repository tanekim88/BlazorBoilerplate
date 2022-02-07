/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



using System.Reflection;



namespace SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.PropertyInfoExtensions
{
    public static class IsPublicExtension
    {

        public static bool IsPublic(this global::System.Reflection.PropertyInfo propertyInfo)
        {
            if (propertyInfo.GetMethod.IsPrivate && propertyInfo.SetMethod.IsPrivate)
                return false;

            return true;
        }
    }
}