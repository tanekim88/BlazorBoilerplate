using System;
using System.Collections.Generic;
using System.Reflection;



namespace CodeGenerator.Models.DefaultModels
{

    public class DefaultTemplateProject : TemplateProject<TemplateData, TemplateFile<TemplateData>>
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public TData Data { get; set; }
        public string BaseName { get; set; }
        public TemplateCodeType CodeType { get; set; } = new();
        public string CodeName { get; set; }

        public string Prefix { get; set; }

        public string Postfix { get; set; }

        public string GeneratorSymbol { get; set; }

        public string ProjectFilePath { get; set; }

        public string ProjectDirPath { get; set; }

        public Assembly Assembly { get; set; }
        public Assembly InfrastructureAssembly { get; set; }
        public Assembly ApplicationAssembly { get; set; }
        public Assembly DomainAssembly { get; set; }

        public HashSet<TFile> Files { get; set; }

        public List<TemplateService> Services { get; set; }

        public List<TemplateLocalization> Localizations { get; set; }

        public List<TemplateModel> Models { get; set; }
        public List<TemplateEntity> Entities { get; set; }
        public List<TemplateProject<TData, TFile>> DependentProjects { get; set; }
    }
}