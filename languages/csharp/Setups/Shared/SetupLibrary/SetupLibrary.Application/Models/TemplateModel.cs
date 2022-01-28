

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateModel : TemplateBase
    {
        [DataMember] public bool IsValueObject { get; set; }
        [DataMember] public string Name { get; set; }
        [DataMember] public string PluralName { get; set; }
        [DataMember] public string BaseName { get; set; }

        [DataMember] public TemplateModel BaseClass { get; set; }


        [DataMember] public string FullName { get; set; }
        [DataMember] public string BaseFullName { get; set; }

        [DataMember] public string Namespace { get; set; }

        [DataMember] public TemplateProject Project { get; set; }

        [DataMember] public List<TemplateMethod> Methods { get; set; }
        [DataMember] public List<TemplateProperty> Properties { get; set; }

        [DataMember] public List<TemplateInterface> Interfaces { get; set; }

        [DataMember] public List<TemplateAttribute> Attributes { get; set; }

        [DataMember] public List<string> UsedNamespaces { get; set; }
    }
}