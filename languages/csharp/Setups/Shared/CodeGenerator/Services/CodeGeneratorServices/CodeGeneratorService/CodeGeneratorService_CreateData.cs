

using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
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

        public bool IsMatch(TemplateFile file, string pluralName, TemplateCodeType codeType)
        {
            var pathMatched = Regex.IsMatch(input: file.TemplatePath,
                pattern:
                $@"({codeType.TemplateBeginSymbolForPath}|{codeType.GetPropertySeparator(isPath: true)}){pluralName}{codeType.GetPropertySeparator(isPath: true)}");
            var contentPathMatched = Regex.IsMatch(input: file.Content,
                pattern:
                $@"({codeType.TemplateBeginSymbolForContent}|{codeType.GetPropertySeparator(isPath: false)}){pluralName}{codeType.GetPropertySeparator(isPath: false)}");
            var contentDataMatched = Regex.IsMatch(input: file.Content, pattern: $@"\.\s*{pluralName}\b");
            return pathMatched || contentPathMatched || contentDataMatched;
        }
    }
}