

using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateGroup
    {
        [DataMember] public string Name { get; set; }
    }
}