

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateAttribute
    {
         public string Name { get; set; }

         public bool IsDbType { get; set; }

         public TemplateAttributeSignature Signature { get; set; }

         public List<TemplateAttributeProperty> Properties { get; set; }
    }
}