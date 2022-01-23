

using ProtoBuf;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedAuth.Application.Models.EntityModels
{
    [ProtoContract]
    public class User_UserGroupModel
    {
        public int Id { get; set; }

        [Key] [Column(Order = 0)] public int UserId { get; set; } 


        [ForeignKey(name: nameof(UserId))] public virtual UserModel User { get; set; } = null!;


        [Key] [Column(Order = 1)] public int UserGroupId { get; set; }


        [ForeignKey(name: nameof(UserGroupId))]
        public virtual UserGroupModel UserGroup { get; set; } = null!;


        public virtual ICollection<User_UserGroupRoleModel> User_UserGroupRoles { get; set; } = null!;
    }
}