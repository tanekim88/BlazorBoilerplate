

using System.ComponentModel.DataAnnotations.Schema;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IRequestReceivedByOptional<TUser>
    {
        int? RequestReceivedById { get; set; }

        [ForeignKey(name: nameof(RequestReceivedById))]
        TUser RequestReceivedBy { get; set; }
    }
}