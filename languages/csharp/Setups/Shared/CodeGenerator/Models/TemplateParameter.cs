

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateParameter : TemplateBase
    {
        [DataMember] public string Name { get; set; }

        [DataMember] public TemplateParameterSignature Signature { get; set; }
    }
}