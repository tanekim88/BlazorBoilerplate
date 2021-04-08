//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserLogin" && entity.Properties.Exists(property => property.Name == "LoginProvider" && (property.IsSimpleType || property.IsValueObject )))
using System;
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserLoginSpecs
{
    public sealed class UserLoginsByLoginProviderSpec : Specification<UserLogin>
    {
        public UserLoginsByLoginProviderSpec(string loginProvider)
        {
            Query.Where(UserLogin => UserLogin.LoginProvider == loginProvider);
        }
    }
}