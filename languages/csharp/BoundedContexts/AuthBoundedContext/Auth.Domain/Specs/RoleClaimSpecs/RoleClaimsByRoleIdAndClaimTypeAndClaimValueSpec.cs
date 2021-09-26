

using Ardalis.Specification;
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using System.Security.Claims;



namespace Auth.Domain.Specs.RoleClaimSpecs
{
    public sealed class RoleClaimsByRoleIdAndClaimTypeAndClaimValueSpec : Specification<RoleClaim, Claim>
    {
        public RoleClaimsByRoleIdAndClaimTypeAndClaimValueSpec(RoleId roleId, string claimType, string claimValue)
        {
            Query
                .Where(criteria: b => b.RoleId == roleId && b.ClaimType == claimType && b.ClaimValue == claimValue);
        }
    }
}