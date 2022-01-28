

using System.Collections.Generic;
using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task GenerateCodes(
                List<string> templatePaths,
                List<TemplateProject> dependentProjects
            )
        {
            var result = await CreateData(
                templateFilePaths: templatePaths, dependentProjects: dependentProjects
                );

            var data = result.Data;
            var projects = result.Projects;

            await Process(data,  projects);
        }
    }
}