

using System;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplatePropertyPath : TemplateBase
    {
        public string Name { get; set; }

        public Type Type { get; set; }
    }
}