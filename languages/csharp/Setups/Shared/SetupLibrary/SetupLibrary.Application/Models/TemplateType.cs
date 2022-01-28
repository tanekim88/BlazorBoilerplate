

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateType : TemplateBase
    {
        [DataMember] public string Name { get; set; }

        [DataMember] public List<TemplateConstructor> Constructors { get; set; }

        [DataMember] public TemplateTypeSignature Signature { get; set; }
    }
}