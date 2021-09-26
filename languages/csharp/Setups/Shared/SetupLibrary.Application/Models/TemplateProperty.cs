

using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateProperty : TemplateBase, ICloneable
    {
        [DataMember] public string Name { get; set; }
        [DataMember] public string BaseName { get; set; }
        [DataMember] public bool IsEnumerableClass { get; set; }
        [IgnoreDataMember] public PropertyInfo PropertyInfo { get; set; }

        [DataMember] public TemplatePropertySignature Signature { get; set; }

        [DataMember] public bool IsPrimaryKey { get; set; }
        [DataMember] public bool IsDictionaryType { get; set; }

        [DataMember] public bool IsPublic { get; set; }
        [DataMember] public bool IsValueObject { get; set; }
        [DataMember] public bool IsNullable { get; set; }

        [DataMember] public bool IsSimpleType { get; set; }

        [DataMember] public bool IsVirtual { get; set; }

        [DataMember] public bool IsDeclaredOnly { get; set; }

        [DataMember] public bool HasPublicGetter { get; set; }

        [DataMember] public bool HasPublicSetter { get; set; }

        [DataMember] public List<TemplateAttribute> Attributes { get; set; }

        [DataMember] public int Order { get; set; }

        [DataMember] public int PrimaryKeyOrder { get; set; }

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}