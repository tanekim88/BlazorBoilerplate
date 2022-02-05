

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateSignatureBase : TemplateBase
    {
         public string FullTypeAndName { get; set; }

         public string TypeAndName { get; set; }

         public string AccessModifier { get; set; }

         public string FullType { get; set; }

         public string Type { get; set; }

         public string ChildType { get; set; }
         public string ChildFullType { get; set; }

         public string Name { get; set; }
    }
}