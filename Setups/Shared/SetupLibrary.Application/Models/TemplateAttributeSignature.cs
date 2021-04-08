

using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateAttributeSignature : TemplateSignatureBase
    {
        [DataMember] public string NameAndArgumentsInsideBrackets { get; set; }
    }
}