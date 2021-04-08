//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserLogin" && entity.Properties.Exists(property => property.Name == "UserId" && (property.IsSimpleType || property.IsValueObject )))
using System;
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserLoginSpecs
{
    public sealed class UserLoginsByUserIdSpec : Specification<UserLogin>
    {
        public UserLoginsByUserIdSpec(UserId userId)
        {
            Query.Where(UserLogin => UserLogin.UserId == userId);
        }
    }
}