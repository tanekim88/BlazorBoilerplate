

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateLocalization : TemplateBase
    {
         public string Key { get; set; }

         public string PluralKey { get; set; } = "";

         public string Context { get; set; } = "";

         public string ContextCodeName { get; set; } = "";

         public string PluralRule { get; set; } = "0";

         public string UnderscoredLanguageCode { get; set; } = "";

         public string Encoding { get; set; }

         public List<TemplateLocalizationPluralForm> PluralForms { get; set; } = new();

         public string MethodName { get; set; }

         public string LanguageCode { get; set; } = "";

         public string DotLanguageCode { get; set; } = "";

         public TemplateProject Project { get; set; } = new();
    }
}