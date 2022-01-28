

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public abstract class TemplateBase
    {
        [DataMember] public List<TemplateGroup> Groups { get; set; }

        [DataMember] public TemplateBoundedContext BoundedContext { get; set; }

        public string GetDomainName()
        {
            return GetDomainName(templateDataType: GetType());
        }

        public static string GetDomainName(Type templateDataType)
        {
            var className = templateDataType.Name;


            return className.Substring(startIndex: "Template".Length);
        }

        public virtual List<string> GetAttributes()
        {
            return new();
        }
    }
}