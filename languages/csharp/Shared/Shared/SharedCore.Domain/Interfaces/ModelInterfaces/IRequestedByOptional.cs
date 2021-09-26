

using System.ComponentModel.DataAnnotations.Schema;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IRequestedByOptional<T>
    {
        int? RequestedById { get; set; }

        [ForeignKey(name: nameof(RequestedById))]
        T RequestedBy { get; set; }
    }
}