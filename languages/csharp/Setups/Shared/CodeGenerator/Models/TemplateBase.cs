

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public abstract class TemplateBase
    {
         public List<TemplateGroup> Groups { get; set; }

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