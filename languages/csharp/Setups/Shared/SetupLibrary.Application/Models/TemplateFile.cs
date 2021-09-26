﻿

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateFile : TemplateBase
    {
        [DataMember] public string TemplateName { get; set; }

        [DataMember] public string GenType { get; set; }

        [DataMember] public bool HasPartialRef { get; set; }

        [IgnoreDataMember] public string PartialRefContent { get; set; }

        [IgnoreDataMember] public List<string> TemplateSections { get; set; }

        [DataMember] public bool ShouldOverWrite { get; set; }

        [DataMember] public bool ShouldPartiallyOverWrite { get; set; }

        [DataMember] public bool ShouldFinalize { get; set; }

        [DataMember] public TemplateProject Project { get; set; } = new();

        [DataMember] public string Name { get; set; }

        [IgnoreDataMember] public string Content { get; set; }

        [DataMember] public string Path { get; set; }

        [DataMember] public string TemplatePath { get; set; }

        [DataMember] public string XmlPath { get; set; }

        [DataMember] public string Extension { get; set; }

        [DataMember] public TemplateCodeType CodeType { get; set; } = new();

        [IgnoreDataMember] public List<TemplateDirectory> Directories { get; set; }

        [IgnoreDataMember] public Dictionary<string, object> LocalParameters { get; set; }
    }
}