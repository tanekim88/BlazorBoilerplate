

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateAttributeSignature : TemplateSignatureBase
    {
        [DataMember] public string NameAndArgumentsInsideBrackets { get; set; }
    }
}