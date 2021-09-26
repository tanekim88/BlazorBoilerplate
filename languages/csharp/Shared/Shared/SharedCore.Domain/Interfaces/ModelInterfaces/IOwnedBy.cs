

using System.ComponentModel.DataAnnotations.Schema;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IOwnedBy<T>
    {
        int OwnedById { get; set; }
        [ForeignKey(name: nameof(OwnedById))] T OwnedBy { get; set; }
    }
}