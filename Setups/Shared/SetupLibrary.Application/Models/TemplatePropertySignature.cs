

using System;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplatePropertySignature : TemplateSignatureBase, ICloneable
    {
        [DataMember] public string Initializer { get; set; }


        public object Clone()
        {
            return MemberwiseClone();
        }


    }
}