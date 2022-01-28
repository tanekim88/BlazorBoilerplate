

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateUIProject : TemplateProject
    {
        [DataMember] public List<TemplateLocalization> Localizations { get; set; }
    }
}