

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedAuth.Application.Models.EntityModels
{
    public class RoleClaimModel : IdentityRoleClaim<int>
    {
        [ForeignKey(name: nameof(RoleId))] public virtual RoleModel Role { get; set; } = null!;
    }
}