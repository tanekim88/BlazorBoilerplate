

using System.Reflection;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateMethod : TemplateBase
    {
         public string Name { get; set; }

         public bool IsAdded { get; set; }

         public bool IsModelMethod { get; set; }

         public bool IsPublic { get; set; }

         public MethodInfo MethodInfo { get; set; }

         public TemplateMethodSignature Signature { get; set; }
    }
}