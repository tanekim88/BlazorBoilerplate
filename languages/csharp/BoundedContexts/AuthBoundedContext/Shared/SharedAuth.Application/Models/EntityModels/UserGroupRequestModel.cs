

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedAuth.Application.Models.EntityModels
{
    public class UserGroupRequestModel
    {
        public int Id { get; set; }

        [Key] [Column(Order = 0)] public int UserId { get; set; } 


        [ForeignKey(name: nameof(UserId))] public virtual UserModel User { get; set; } = null!;


        [Key] [Column(Order = 1)] public int UserGroupId { get; set; }


        [ForeignKey(name: nameof(UserGroupId))]
        public virtual UserGroupModel UserGroup { get; set; } = null!;


        public virtual ICollection<User_UserGroupModel> Target_User_UserGroups { get; set; } = null!;
    }
}