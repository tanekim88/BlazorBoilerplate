

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateUIProject : TemplateProject
    {
        [DataMember] public List<TemplateLocalization> Localizations { get; set; }
    }
}