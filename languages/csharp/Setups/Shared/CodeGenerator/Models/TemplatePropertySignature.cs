

using System;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplatePropertySignature : TemplateSignatureBase, ICloneable
    {
         public string Initializer { get; set; }


        public object Clone()
        {
            return MemberwiseClone();
        }


    }
}