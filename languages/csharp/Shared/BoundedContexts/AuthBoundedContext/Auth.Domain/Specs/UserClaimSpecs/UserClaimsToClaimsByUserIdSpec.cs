

using Ardalis.Specification;
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using System.Security.Claims;



namespace Auth.Domain.Specs.UserClaimSpecs
{
    public class UserClaimsToClaimsByUserIdSpec : Specification<UserClaim, Claim>
    {
        public UserClaimsToClaimsByUserIdSpec(UserId userId)
        {
            Query
                .Select(selector: x => new Claim(x.ClaimType, x.ClaimValue))
                .Where(criteria: b => b.UserId == userId);
        }
    }
}