

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateLocalization : TemplateBase
    {
        [DataMember] public string Key { get; set; }

        [DataMember] public string PluralKey { get; set; } = "";

        [DataMember] public string Context { get; set; } = "";

        [DataMember] public string ContextCodeName { get; set; } = "";

        [DataMember] public string PluralRule { get; set; } = "0";

        [DataMember] public string UnderscoredLanguageCode { get; set; } = "";

        [DataMember] public string Encoding { get; set; }

        [DataMember] public List<TemplateLocalizationPluralForm> PluralForms { get; set; } = new();

        [DataMember] public string MethodName { get; set; }

        [DataMember] public string LanguageCode { get; set; } = "";

        [DataMember] public string DotLanguageCode { get; set; } = "";

        [DataMember] public TemplateProject Project { get; set; } = new();
    }
}