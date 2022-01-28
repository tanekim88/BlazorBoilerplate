

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateLocalizationPluralForm : TemplateBase
    {
        [DataMember] public int PluralFormIndex { get; set; }

        [DataMember] public string Value { get; set; }

        [DataMember] public TemplateProject Project { get; set; } = new();
    }
}