

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateSection
    {
        [DataMember] public string Name { get; set; }
        [DataMember] public string Value { get; set; }
    }
}