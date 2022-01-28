

using System.Collections.Generic;
using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task ProcessProject(
            TemplateProject project,
            Dictionary<string, object> parameters 
            )
        {
            project.Files.ForEach(action: async file =>
            {
                //await ProcessFile(new ProcessFileInput { File = file, Parameters = input.Parameters });
            });
        }

        public record ProcessProjectInput
        {
            public TemplateProject Project { get; init; }
            public Dictionary<string, object> Parameters { get; init; }
        }

        public record ProcessProjectOutput
        {
        }
    }
}