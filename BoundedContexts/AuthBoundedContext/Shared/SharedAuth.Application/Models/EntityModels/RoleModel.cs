

using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;



namespace SharedAuth.Application.Models.EntityModels
{
    public class RoleModel :
        IdentityRole<int>
    {
        public virtual ICollection<User_RoleModel> Role_Users { get; set; } = null!;

        public virtual ICollection<RoleClaimModel> RoleClaims { get; set; } = null!;
    }
}