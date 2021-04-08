

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedAuth.Application.Models.EntityModels
{
    public class User_RoleModel :
        IdentityUserRole<int>
    {
        [ForeignKey(name: nameof(UserId))] public virtual UserModel User { get; set; } = null!;

        [ForeignKey(name: nameof(RoleId))] public virtual RoleModel Role { get; set; } = null!;
    }
}