

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateService : TemplateBase
    {
        [DataMember] public bool IsShared { get; set; }
        [DataMember] public string Type { get; set; }
        [DataMember] public string BaseName { get; set; }
        [DataMember] public string Name { get; set; }

        [DataMember] public string Namespace { get; set; }

        [DataMember] public TemplateProject Project { get; set; }

        [DataMember] public List<TemplateMethod> Methods { get; set; }

        [DataMember] public string ServiceLifetime { get; set; }

        [DataMember] public List<TemplateConstructor> Constructors { get; set; }

        [DataMember] public bool IsAbstract { get; set; }

        [DataMember] public TemplateModel ModelCounterpart { get; set; }

        [DataMember] public List<TemplateProperty> Properties { get; set; }

        [DataMember] public List<TemplateInterface> Interfaces { get; set; }

        [DataMember] public TemplateType ParentType { get; set; }
    }
}