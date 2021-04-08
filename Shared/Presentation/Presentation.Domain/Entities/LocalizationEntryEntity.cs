

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SharedCore.Domain.Interfaces.ModelInterfaces;



namespace Presentation.Domain.Entities
{
    public class LocalizationEntryEntity : ILocalId
    {
        [InverseProperty(property: nameof(LocalizationPluralFormEntity.LocalizationCatalog))]
        public virtual ICollection<LocalizationPluralFormEntity> PluralForms { get; private set; }


        public string Key { get; private set; }


        public string PluralKey { get; private set; }


        public string Context { get; private set; }


        public string PluralFormIndexSelector { get; private set; }

        public string LanguageCode { get; private set; }
        [Key] public int Id { get; private set; }
    }
}