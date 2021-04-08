

using Ardalis.Specification;
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using System.Security.Claims;



namespace Auth.Domain.Specs.RoleClaimSpecs
{
    public sealed class RoleClaimsToClaimsByRoleIdSpec : Specification<RoleClaim, Claim>
    {
        public RoleClaimsToClaimsByRoleIdSpec(RoleId roleId)
        {
            Query
                .Select(selector: x => new Claim(x.ClaimType, x.ClaimValue))
                .Where(criteria: b => b.RoleId == roleId);
        }
    }
}