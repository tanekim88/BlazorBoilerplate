

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateDirectory : TemplateBase
    {
         public string Name { get; set; }

         public string TemplatePath { get; set; }

         public string Path { get; set; }

         public bool ShouldOverwrite { get; set; }
    }
}