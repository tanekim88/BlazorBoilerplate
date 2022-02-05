

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateParameter : TemplateBase
    {
         public string Name { get; set; }

         public TemplateParameterSignature Signature { get; set; }
    }
}