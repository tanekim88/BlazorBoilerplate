

using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedAuth.Application.Models.EntityModels
{
    public class UserModel : IdentityUser<int>
    {
        public string FirstName { get; set; } = null!;

        public string MiddleInitial { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public virtual ICollection<UserClaimModel> UserClaims { get; set; } = null!;

        public virtual ICollection<UserLoginModel> UserLogins { get; set; } = null!;

        public virtual ICollection<UserTokenModel> UserTokens { get; set; } = null!;

        public virtual ICollection<User_RoleModel> User_Roles { get; set; } = null!;

        [InverseProperty(property: nameof(User_UserGroupModel.User))]
        public virtual ICollection<User_UserGroupModel> User_UserGroups { get; set; } = null!;


        [InverseProperty(property: nameof(User_UserGroupRoleModel.User))]
        public virtual ICollection<User_UserGroupRoleModel> User_UserGroupRoles { get; set; } = null!;


    }
}