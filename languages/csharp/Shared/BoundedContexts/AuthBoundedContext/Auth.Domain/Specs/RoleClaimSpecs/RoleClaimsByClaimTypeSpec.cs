//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "RoleClaim" && entity.Properties.Exists(property => property.Name == "ClaimType" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using System;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.RoleClaimSpecs
{
    public sealed class RoleClaimsByClaimTypeSpec : Specification<RoleClaim>
    {
        public RoleClaimsByClaimTypeSpec(string claimType)
        {
            Query.Where(roleClaim => roleClaim.ClaimType == claimType);
        }
    }
}