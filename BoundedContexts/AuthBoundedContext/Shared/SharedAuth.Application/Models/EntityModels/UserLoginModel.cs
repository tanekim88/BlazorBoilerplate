

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedAuth.Application.Models.EntityModels
{
    public class UserLoginModel :
        IdentityUserLogin<int>
    {
        [ForeignKey(name: nameof(UserId))] public virtual UserModel User { get; set; } = null!;
    }
}