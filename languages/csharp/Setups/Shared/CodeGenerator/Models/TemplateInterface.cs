

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateInterface : TemplateBase
    {
         public string Name { get; set; }

         public TemplateInterfaceSignature Signature { get; set; }
    }
}