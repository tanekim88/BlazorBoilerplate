//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserClaim" && entity.Properties.Exists(property => property.Name == "ClaimValue" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using System;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserClaimSpecs
{
    public sealed class UserClaimsByClaimValueSpec : Specification<UserClaim>
    {
        public UserClaimsByClaimValueSpec(string claimValue)
        {
            Query.Where(UserClaim => UserClaim.ClaimValue == claimValue);
        }
    }
}