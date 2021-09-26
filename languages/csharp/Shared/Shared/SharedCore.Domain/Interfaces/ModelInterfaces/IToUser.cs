

using System.ComponentModel.DataAnnotations.Schema;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IToUser<TUser>
    {
        public int ToUserId { get; set; }
        [ForeignKey(name: nameof(ToUserId))] public TUser ToUser { get; set; }
    }
}