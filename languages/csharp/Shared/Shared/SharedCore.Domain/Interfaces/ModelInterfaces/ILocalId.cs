

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface ILocalId
    {
        [Key]
        [DatabaseGenerated(databaseGeneratedOption: DatabaseGeneratedOption.Identity)]
        int Id { get; }
    }
}