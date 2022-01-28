

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateInterface : TemplateBase
    {
        [DataMember] public string Name { get; set; }

        [DataMember] public TemplateInterfaceSignature Signature { get; set; }
    }
}