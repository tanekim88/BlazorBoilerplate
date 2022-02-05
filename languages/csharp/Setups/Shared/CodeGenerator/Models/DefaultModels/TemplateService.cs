

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateService : TemplateBase
    {
         public bool IsShared { get; set; }
         public string Type { get; set; }
         public string BaseName { get; set; }
         public string Name { get; set; }

         public string Namespace { get; set; }

         public TemplateProject Project { get; set; }

         public List<TemplateMethod> Methods { get; set; }

         public string ServiceLifetime { get; set; }

         public List<TemplateConstructor> Constructors { get; set; }

         public bool IsAbstract { get; set; }

         public TemplateModel ModelCounterpart { get; set; }

         public List<TemplateProperty> Properties { get; set; }

         public List<TemplateInterface> Interfaces { get; set; }

         public TemplateType ParentType { get; set; }
    }
}