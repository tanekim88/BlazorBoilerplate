//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserToken" && entity.Properties.Exists(property => property.Name == "Name" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using System;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserTokenSpecs
{
    public sealed class UserTokensByNameSpec : Specification<UserToken>
    {
        public UserTokensByNameSpec(string name)
        {
            Query.Where(UserToken => UserToken.Name == name);
        }
    }
}