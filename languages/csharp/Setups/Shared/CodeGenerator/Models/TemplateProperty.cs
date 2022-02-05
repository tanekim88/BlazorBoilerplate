

using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateProperty : TemplateBase, ICloneable
    {
         public string Name { get; set; }
         public string BaseName { get; set; }
         public bool IsEnumerableClass { get; set; }
         public PropertyInfo PropertyInfo { get; set; }

         public TemplatePropertySignature Signature { get; set; }

         public bool IsPrimaryKey { get; set; }
         public bool IsDictionaryType { get; set; }

         public bool IsPublic { get; set; }
         public bool IsValueObject { get; set; }
         public bool IsNullable { get; set; }

         public bool IsSimpleType { get; set; }

         public bool IsVirtual { get; set; }

         public bool IsDeclaredOnly { get; set; }

         public bool HasPublicGetter { get; set; }

         public bool HasPublicSetter { get; set; }

         public List<TemplateAttribute> Attributes { get; set; }

         public int Order { get; set; }

         public int PrimaryKeyOrder { get; set; }

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}