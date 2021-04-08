

using System.ComponentModel.DataAnnotations.Schema;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IAuthoredBy<T>
    {
        int AuthoredById { get; set; }

        [ForeignKey(name: nameof(AuthoredById))]
        T AuthoredBy { get; set; }
    }
}