

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateTokenInfo : ICloneable
    {
        public bool IsAlias { get; set; }
        public string CurrentName { get; set; }

        public string Value { get; set; }

        public TemplateContext Current { get; set; }
        public bool IsPlural { get; set; }

        public List<TemplateAttribute> Attributes { get; set; }
        public List<string> AllPropertyPaths { get; set; }
        public List<string> PropertyPaths { get; set; }
        public List<string> GroupIds { get; set; } = new();
        public List<string> Ids { get; set; } = new();
        public List<object> Objects { get; set; } = new();

        public string GroupId => GroupIds.LastOrDefault();

        public string Id => Ids.LastOrDefault();

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}