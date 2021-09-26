

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateAttribute
    {
        [DataMember] public string Name { get; set; }

        [DataMember] public bool IsDbType { get; set; }

        [DataMember] public TemplateAttributeSignature Signature { get; set; }

        [DataMember] public List<TemplateAttributeProperty> Properties { get; set; }
    }
}