

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateData : ICloneable
    {
         public List<TemplateLocalization> Localizations { get; set; } = new();

        //public Dictionary<string, Dictionary<string, TemplateLocalization>> LocalizationByLanguageCodeByKey { get; set; } = new();
        // public virtual List<TemplateModel> Models { get; set; } = new();
        // public virtual List<TemplateEntity> Entities { get; set; } = new();
         public virtual List<TemplateBoundedContext> BoundedContexts { get; set; } = new();

        // public virtual List<TemplateService> Services { get; set; } = new();

         public virtual List<TemplateDbContext> DbContexts { get; set; } = new();

         public virtual List<TemplateProject<TemplateData>> Projects { get; set; } = new();

         public virtual List<TemplateFile<TemplateData>> Files { get; set; } = new();

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}