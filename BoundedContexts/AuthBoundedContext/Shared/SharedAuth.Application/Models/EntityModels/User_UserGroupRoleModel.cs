

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedAuth.Application.Models.EntityModels
{
    public class User_UserGroupRoleModel
    {
        public int Id { get; set; }

        [Key] [Column(Order = 0)] public int UserId { get; set; } 


        [ForeignKey(name: nameof(UserId))] public virtual UserModel User { get; set; } = null!;


        [Key] [Column(Order = 1)] public int UserGroupRoleId { get; set; }


        [ForeignKey(name: nameof(UserGroupRoleId))]
        public virtual UserGroupRoleModel UserGroupRole { get; set; } = null!;
    }
}