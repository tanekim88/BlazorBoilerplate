

using SetupLibrary.Application.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task<GetContextTemplateOutput> GetContextTemplate(
             string fileTemplatePath,
             TemplateProject project,
             List<string> sections,
             List<string> templateSections
            )
        {
            sections = sections ?? new List<string>();
            templateSections = templateSections ?? new List<string>();
            var sectionsTemplates = sections.Select(selector: section =>
            {
                return $@"new TemplateSection {{ Name = ""{section}"" }}";
            });
            var sectionTemplate =
                $@"new List<TemplateSection> {{ {string.Join(separator: ',', values: sectionsTemplates)} }}";

            var templateSectionsTemplates = templateSections.Select(selector: templateSection =>
            {
                return $@"new TemplateSection {{ Name = ""{templateSection}"" }}";
            });
            var templateSectionsTemplate =
                $@"new List<TemplateSection> {{ {string.Join(separator: ',', values: templateSectionsTemplates)} }}";


            var strIstShared = project.IsShared ? "true" : "false";

            var toReturn = $@"
    Data.Context.Project = Data.Projects.Where(project => project.Name == ""{project.Name}"").FirstOrDefault();

    Data.Context.ApplicationProject = Data.Projects.Where(project => project.BaseName == ""{project.BaseName}"" && project.Type == ""Application"" && !project.IsShared).FirstOrDefault();
    Data.Context.DomainProject = Data.Projects.Where(project => project.BaseName == ""{project.BaseName}"" && project.Type == ""Domain"" && !project.IsShared).FirstOrDefault();
    Data.Context.InfrastructureProject = Data.Projects.Where(project => project.BaseName == ""{project.BaseName}"" && project.Type == ""Infrastructure"" && !project.IsShared).FirstOrDefault();

    Data.Context.SharedApplicationProject = Data.Projects.Where(project => project.BaseName == ""{project.BaseName}"" && project.Type == ""Application"" && project.IsShared).FirstOrDefault();
    Data.Context.SharedDomainProject = Data.Projects.Where(project => project.BaseName == ""{project.BaseName}"" && project.Type == ""Domain"" && project.IsShared).FirstOrDefault();
    Data.Context.SharedInfrastructureProject = Data.Projects.Where(project => project.BaseName == ""{project.BaseName}"" && project.Type == ""Infrastructure"" && project.IsShared).FirstOrDefault();

    Data.Context.File = Data.Files.Where(file => file.TemplatePath == @""{fileTemplatePath}"").FirstOrDefault();
            Data.Context.Sections = { sectionTemplate};
            Data.Context.TemplateSections = { templateSectionsTemplate};
            ";

            return new GetContextTemplateOutput { Template = toReturn };
        }


        public record GetContextTemplateOutput
        {
            public string Template { get; set; }
        }
    }
}