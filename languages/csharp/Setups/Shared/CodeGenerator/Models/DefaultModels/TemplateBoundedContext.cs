

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace CodeGenerator.Models
{
    
    public class TemplateBoundedContext : ICloneable
    {
         public string Name { get; set; }
         public virtual List<TemplateEntity> Entities { get; set; } = new();
         public List<TemplateLocalization> Localizations { get; set; } = new();

         public virtual List<TemplateModel> Models { get; set; } = new();
         public virtual List<TemplateService> Services { get; set; } = new();

         public virtual List<TemplateDbContext> DbContexts { get; set; } = new();

         public virtual List<TemplateProject> Projects { get; set; } = new();

         public virtual List<TemplateFile> Files { get; set; } = new();

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}