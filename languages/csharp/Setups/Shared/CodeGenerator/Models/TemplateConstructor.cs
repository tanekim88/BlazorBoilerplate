

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateConstructor : TemplateBase
    {
         public string Name { get; set; }

         public List<TemplateParameter> Parameters { get; set; }
    }
}