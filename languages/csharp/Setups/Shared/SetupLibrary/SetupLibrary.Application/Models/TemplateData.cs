

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateData : ICloneable
    {
        [DataMember] public List<TemplateLocalization> Localizations { get; set; } = new();

        //public Dictionary<string, Dictionary<string, TemplateLocalization>> LocalizationByLanguageCodeByKey { get; set; } = new();
        //[DataMember] public virtual List<TemplateModel> Models { get; set; } = new();
        //[DataMember] public virtual List<TemplateEntity> Entities { get; set; } = new();
        [DataMember] public virtual List<TemplateBoundedContext> BoundedContexts { get; set; } = new();

        //[DataMember] public virtual List<TemplateService> Services { get; set; } = new();

        [DataMember] public virtual List<TemplateDbContext> DbContexts { get; set; } = new();

        [DataMember] public virtual List<TemplateProject> Projects { get; set; } = new();


        [DataMember] public virtual TemplateContext Context { get; set; } = new();

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}