

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public class TemplateBoundedContext : ICloneable
    {
        [DataMember] public string Name { get; set; }
        [DataMember] public virtual List<TemplateEntity> Entities { get; set; } = new();
        [DataMember] public List<TemplateLocalization> Localizations { get; set; } = new();

        [DataMember] public virtual List<TemplateModel> Models { get; set; } = new();
        [DataMember] public virtual List<TemplateService> Services { get; set; } = new();

        [DataMember] public virtual List<TemplateDbContext> DbContexts { get; set; } = new();

        [DataMember] public virtual List<TemplateProject> Projects { get; set; } = new();

        [DataMember] public virtual List<TemplateFile> Files { get; set; } = new();

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}