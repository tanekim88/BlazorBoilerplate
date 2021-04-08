

using Ardalis.Specification;
using Auth.Domain.Entities;



namespace Auth.Domain.Specs.UserClaimSpecs
{
    public class UserClaimsToUsersByClaimTypeAndClaimValueSpec : Specification<UserClaim, User>
    {
        public UserClaimsToUsersByClaimTypeAndClaimValueSpec(string claimType, string claimValue)
        {
            Query
                .Select(selector: x => x.User)
                .Include(includeExpression: x => x.User)
                .Where(criteria: b => b.ClaimType == claimType && b.ClaimValue == claimValue);
        }
    }
}