

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateGroup
    {
        [DataMember] public string Name { get; set; }
    }
}