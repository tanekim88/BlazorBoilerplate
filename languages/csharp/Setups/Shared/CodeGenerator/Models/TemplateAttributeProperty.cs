

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateAttributeProperty
    {
        [DataMember] public string Name { get; set; }

        [DataMember] public string Value { get; set; }
    }
}