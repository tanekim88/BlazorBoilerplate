

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using AutoMapper.Internal;
using HotChocolate.Types.Descriptors;



namespace Core.Infrastructure.Modules.GraphqlModule.Models
{
    public class CustomGraphqlTypeInspector : DefaultTypeInspector
    {
        public override IEnumerable<MemberInfo> GetMembers(Type type)
        {
            var memberInfos = base.GetMembers(type: type)
                .Where(predicate: memberInfo =>
                {
                    return !(memberInfo.DeclaringType == typeof(Claim) &&
                             !(memberInfo.MemberType == MemberTypes.Property &&
                               !memberInfo.GetMemberType().IsClass));
                });

            return memberInfos;

            return base.GetMembers(type: type)
                .Where(predicate: memberInfo => memberInfo.DeclaringType == type);
        }
    }
}