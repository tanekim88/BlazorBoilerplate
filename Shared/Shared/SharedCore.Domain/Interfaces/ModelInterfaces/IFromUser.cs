

using System.ComponentModel.DataAnnotations.Schema;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IFromUser<TUser>
    {
        int FromUserId { get; set; }
        [ForeignKey(name: nameof(FromUserId))] TUser FromUser { get; set; }
    }
}