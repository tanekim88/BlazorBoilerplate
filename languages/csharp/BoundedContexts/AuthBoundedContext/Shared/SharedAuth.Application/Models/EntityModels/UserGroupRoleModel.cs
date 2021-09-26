

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedAuth.Application.Models.EntityModels
{
    public class UserGroupRoleModel
    {
        [Key] public int Id { get; set; }

        public string Name { get; set; } = null!;


        public int UserGroupId { get; set; } 

        [ForeignKey(name: nameof(UserGroupId))]
        public virtual UserGroupModel UserGroup { get; set; } = null!;


        [InverseProperty(property: nameof(User_UserGroupRoleModel.UserGroupRole))]
        public virtual ICollection<User_UserGroupRoleModel> User_UserGroupRoles { get; set; } = null!;
    }
}