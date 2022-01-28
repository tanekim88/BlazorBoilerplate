

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateDirectory : TemplateBase
    {
        [DataMember] public string Name { get; set; }

        [DataMember] public string TemplatePath { get; set; }

        [DataMember] public string Path { get; set; }

        [DataMember] public bool ShouldOverwrite { get; set; }
    }
}