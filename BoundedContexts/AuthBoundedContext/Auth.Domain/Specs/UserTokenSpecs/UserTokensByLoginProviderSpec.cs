//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserToken" && entity.Properties.Exists(property => property.Name == "LoginProvider" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using System;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserTokenSpecs
{
    public sealed class UserTokensByLoginProviderSpec : Specification<UserToken>
    {
        public UserTokensByLoginProviderSpec(string loginProvider)
        {
            Query.Where(UserToken => UserToken.LoginProvider == loginProvider);
        }
    }
}