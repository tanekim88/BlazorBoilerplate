

using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task<TemplateData> CreateData(List<TemplateProject> projects)
        {
            var data = new TemplateData();

            data.Projects = projects;

            await PopulateModels(data: data);

            PopulateServices(data: data);
            PopulateDbContexts(data: data);

            await PopulateLocalizations(data: data);

            PopulateProjects(data: data);

            data.Files = projects.SelectMany(selector: project => project.Files).ToList();

            return data;
        }


        //public async Task<TemplateData> PopulateData2(List<TemplateProject> projects, TemplateFile file)
        //{
        //    var data = new TemplateData();

        //    data.Projects = projects;

        //    var codeType = file.CodeType;

        //    file.Content = File.ReadAllText(file.TemplatePath);

        //    file.Project = projects.Find(project => project.Name == file.Project.Name);

        //    var referenceFile = await GetReferenceFile(file.Content, data, codeType);

        //    if (!string.IsNullOrEmpty(referenceFile))
        //    {
        //        file.Content = File.ReadAllText(referenceFile);
        //    }

        //    if (IsMatch(file, nameof(TemplateData.Models), codeType))
        //    {
        //        await PopulateModels(projects, data);
        //    }

        //    if (IsMatch(file, nameof(TemplateData.Services), codeType))
        //    {
        //        PopulateServices(projects, data);
        //    }

        //    if (IsMatch(file, nameof(TemplateData.Localizations), codeType))
        //    {
        //        await PopulateLocalizations(projects, data);
        //    }

        //    PopulateProjects(data);

        //    return data;
        //}

        public bool IsMatch(TemplateFile file, string pluralName, TemplateCodeType codeType)
        {
            var pathMatched = Regex.IsMatch(input: file.TemplatePath,
                pattern:
                $@"({codeType.TemplateBeginSymbolForPath}|{codeType.GetPropertyPathSeparator(isPath: true)}){pluralName}{codeType.GetPropertyPathSeparator(isPath: true)}");
            var contentPathMatched = Regex.IsMatch(input: file.Content,
                pattern:
                $@"({codeType.TemplateBeginSymbolForContent}|{codeType.GetPropertyPathSeparator(isPath: false)}){pluralName}{codeType.GetPropertyPathSeparator(isPath: false)}");
            var contentDataMatched = Regex.IsMatch(input: file.Content, pattern: $@"\.\s*{pluralName}\b");
            return pathMatched || contentPathMatched || contentDataMatched;
        }
    }
}