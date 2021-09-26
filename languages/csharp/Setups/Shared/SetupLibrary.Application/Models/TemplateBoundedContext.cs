

using System;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateBoundedContext : ICloneable
    { 
        [DataMember] public string Name { get; set; }

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}