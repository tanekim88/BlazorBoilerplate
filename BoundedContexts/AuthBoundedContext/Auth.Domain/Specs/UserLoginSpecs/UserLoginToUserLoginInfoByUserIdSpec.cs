

using Ardalis.Specification;
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Microsoft.AspNetCore.Identity;



namespace Auth.Domain.Specs.UserLoginSpecs
{
    public class UserLoginToUserLoginInfoByUserIdSpec : Specification<UserLogin, UserLoginInfo>
    {
        public UserLoginToUserLoginInfoByUserIdSpec(UserId userId)
        {
            Query
                .Select(selector: b => new UserLoginInfo(b.LoginProvider, b.ProviderKey, b.ProviderDisplayName))
                .Where(criteria: b => b.UserId == userId);
        }
    }
}