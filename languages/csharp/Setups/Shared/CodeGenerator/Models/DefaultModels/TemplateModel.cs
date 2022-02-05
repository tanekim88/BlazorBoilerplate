

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateModel : TemplateBase
    {
         public bool IsValueObject { get; set; }
         public string Name { get; set; }
         public string PluralName { get; set; }
         public string BaseName { get; set; }

         public TemplateModel BaseClass { get; set; }


         public string FullName { get; set; }
         public string BaseFullName { get; set; }

         public string Namespace { get; set; }

         public TemplateProject Project { get; set; }

         public List<TemplateMethod> Methods { get; set; }
         public List<TemplateProperty> Properties { get; set; }

         public List<TemplateInterface> Interfaces { get; set; }

         public List<TemplateAttribute> Attributes { get; set; }

         public List<string> UsedNamespaces { get; set; }
    }
}