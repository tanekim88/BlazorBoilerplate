

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace Presentation.Domain.Entities
{
    public class LocalizationPluralFormEntity
    {
        private LocalizationPluralFormEntity()
        {
        }

        public LocalizationPluralFormEntity(
            int pluralFormIndex,
            int localizationCatalogId,
            string value
        )
        {
            PluralFormIndex = pluralFormIndex;
            LocalizationCatalogId = localizationCatalogId;
            Value = value;
        }

        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(databaseGeneratedOption: DatabaseGeneratedOption.None)]
        public int PluralFormIndex { get; }


        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(databaseGeneratedOption: DatabaseGeneratedOption.None)]
        public int LocalizationCatalogId { get; private set; }


        [ForeignKey(name: nameof(LocalizationCatalogId))]
        public virtual LocalizationEntryEntity LocalizationCatalog { get; private set; }


        public string Value { get; }
    }
}