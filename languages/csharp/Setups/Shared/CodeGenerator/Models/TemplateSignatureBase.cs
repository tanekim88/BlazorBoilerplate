

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateSignatureBase : TemplateBase
    {
        [DataMember] public string FullTypeAndName { get; set; }

        [DataMember] public string TypeAndName { get; set; }

        [DataMember] public string AccessModifier { get; set; }

        [DataMember] public string FullType { get; set; }

        [DataMember] public string Type { get; set; }

        [DataMember] public string ChildType { get; set; }
        [DataMember] public string ChildFullType { get; set; }

        [DataMember] public string Name { get; set; }
    }
}