

using Microsoft.AspNetCore.Identity;



namespace SharedAuth.Application.Models.EntityModels
{
    public class UserClaimModel :
        IdentityUserClaim<int>
    {
        public virtual UserModel User { get; private set; }
    }
}