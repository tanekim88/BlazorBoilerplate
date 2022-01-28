

using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Serialization;
using Microsoft.EntityFrameworkCore;
using SetupLibrary.Application.Attributes;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateProject : TemplateBase, ICloneable
    {
        [DataMember] public string Type { get; set; }
        [DataMember] public bool IsShared { get; set; }

        [DataMember] public string Name { get; set; }
        [DataMember] public string BaseName { get; set; }

        [DataMember] public string CodeName { get; set; }

        [DataMember]
        [PropertyPathsAlias(propertyPaths: new[] { "Prefix" })]
        public string Prefix { get; set; }

        [DataMember]
        [PropertyPathsAlias(propertyPaths: new[] { "Postfix" })]
        public string Postfix { get; set; }

        [DataMember] public string GeneratorSymbol { get; set; }

        [DataMember] public string Path { get; set; }

        [DataMember] public string DirPath { get; set; }

        [IgnoreDataMember] public Assembly Assembly { get; set; }
        [IgnoreDataMember] public Assembly InfrastructureAssembly { get; set; }
        [IgnoreDataMember] public Assembly ApplicationAssembly { get; set; }
        [IgnoreDataMember] public Assembly DomainAssembly { get; set; }

        [DataMember] public List<TemplateFile> Files { get; set; }

        [DataMember] public List<TemplateService> Services { get; set; }

        [DataMember] public List<TemplateLocalization> Localizations { get; set; }

        [DataMember] public List<TemplateModel> Models { get; set; }
        [DataMember] public List<TemplateEntity> Entities { get; set; }

        public object Clone()
        {
            return MemberwiseClone();
        }

        //public Dictionary<string, Dictionary<string, TemplateLocalization>> LocalizationByLanguageCodeByKey { get; set; }
    }
}