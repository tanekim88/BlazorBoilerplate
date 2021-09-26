

using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateEntity : TemplateModel
    {
        [DataMember] public bool ShouldNotGenerate { get; set; }
    }
}