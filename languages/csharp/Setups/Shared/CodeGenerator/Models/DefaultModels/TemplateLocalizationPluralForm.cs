

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateLocalizationPluralForm : TemplateBase
    {
         public int PluralFormIndex { get; set; }

         public string Value { get; set; }

         public TemplateProject Project { get; set; } = new();
    }
}