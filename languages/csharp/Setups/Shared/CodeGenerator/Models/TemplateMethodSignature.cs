

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateMethodSignature : TemplateSignatureBase
    {
        [DataMember] public List<string> Parameters { get; set; }

        [DataMember] public List<string> FullParameters { get; set; }

        [DataMember] public string FullTypeAndNameAndParameters { get; set; }

        [DataMember] public string TypeAndNameAndParameters { get; set; }
    }
}