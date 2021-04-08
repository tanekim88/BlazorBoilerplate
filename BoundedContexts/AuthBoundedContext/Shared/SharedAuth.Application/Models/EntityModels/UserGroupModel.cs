

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;



namespace SharedAuth.Application.Models.EntityModels
{
    public class UserGroupModel
    {
        [Key] public int Id { get; set; }

        public virtual ICollection<UserGroupRoleModel> UserGroupRoles { get; set; } = null!;


        public virtual ICollection<User_UserGroupModel> User_UserGroups { get; set; } = null!;
    }
}