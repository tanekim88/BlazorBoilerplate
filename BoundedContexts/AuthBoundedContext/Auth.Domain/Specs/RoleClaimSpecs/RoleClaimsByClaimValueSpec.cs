//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "RoleClaim" && entity.Properties.Exists(property => property.Name == "ClaimValue" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using System;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.RoleClaimSpecs
{
    public sealed class RoleClaimsByClaimValueSpec : Specification<RoleClaim>
    {
        public RoleClaimsByClaimValueSpec(string claimValue)
        {
            Query.Where(RoleClaim => RoleClaim.ClaimValue == claimValue);
        }
    }
}