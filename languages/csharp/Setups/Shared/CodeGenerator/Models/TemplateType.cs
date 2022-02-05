

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateType : TemplateBase
    {
         public string Name { get; set; }

         public List<TemplateConstructor> Constructors { get; set; }

         public TemplateTypeSignature Signature { get; set; }
    }
}