

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SharedCore.Domain.Interfaces.ModelInterfaces;



namespace SharedPresentation.Domain.Models
{
    public class LocalizationEntry : ILocalId
    {
        [InverseProperty(property: nameof(LocalizationPluralForm.LocalizationCatalog))]
        public virtual ICollection<LocalizationPluralForm> PluralForms { get; private set; }


        public string Key { get; private set; }


        public string PluralKey { get; private set; }


        public string Context { get; private set; }


        public string PluralFormIndexSelector { get; private set; }

        public string LanguageCode { get; private set; }
        [Key] public int Id { get; private set; }
    }
}