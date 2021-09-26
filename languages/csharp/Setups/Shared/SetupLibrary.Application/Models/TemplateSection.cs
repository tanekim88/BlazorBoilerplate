

using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateSection
    {
        [DataMember] public string Name { get; set; }
    }
}