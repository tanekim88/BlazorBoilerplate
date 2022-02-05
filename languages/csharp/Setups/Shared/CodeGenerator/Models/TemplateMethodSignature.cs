

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateMethodSignature : TemplateSignatureBase
    {
         public List<string> Parameters { get; set; }

         public List<string> FullParameters { get; set; }

         public string FullTypeAndNameAndParameters { get; set; }

         public string TypeAndNameAndParameters { get; set; }
    }
}