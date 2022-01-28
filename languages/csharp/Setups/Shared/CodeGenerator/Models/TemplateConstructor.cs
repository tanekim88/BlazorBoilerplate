

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateConstructor : TemplateBase
    {
        [DataMember] public string Name { get; set; }

        [DataMember] public List<TemplateParameter> Parameters { get; set; }
    }
}