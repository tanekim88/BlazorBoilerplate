

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace SharedPresentation.Domain.Models
{
    public class LocalizationPluralForm
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(databaseGeneratedOption: DatabaseGeneratedOption.None)]
        public int PluralFormIndex { get; set; }


        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(databaseGeneratedOption: DatabaseGeneratedOption.None)]
        public int LocalizationCatalogId { get; set; }


        [ForeignKey(name: nameof(LocalizationCatalogId))]
        public virtual LocalizationEntry LocalizationCatalog { get; set; }


        public string Value { get; set; }
    }
}