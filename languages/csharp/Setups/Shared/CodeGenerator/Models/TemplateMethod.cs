

using System.Reflection;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateMethod : TemplateBase
    {
        [DataMember] public string Name { get; set; }

        [DataMember] public bool IsAdded { get; set; }

        [DataMember] public bool IsModelMethod { get; set; }

        [DataMember] public bool IsPublic { get; set; }

        [IgnoreDataMember] public MethodInfo MethodInfo { get; set; }

        [DataMember] public TemplateMethodSignature Signature { get; set; }
    }
}