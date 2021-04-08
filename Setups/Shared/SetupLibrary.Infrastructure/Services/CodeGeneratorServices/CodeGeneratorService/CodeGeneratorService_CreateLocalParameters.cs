

using System.Collections.Generic;
using System.Threading.Tasks;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public record CreateLocalParametersOutput
        {
            public Dictionary<string, object> LocalParameters { get; init; }
        }

        public async Task<CreateLocalParametersOutput> CreateLocalParameters(
             TemplateFile file
        )
        {
            var context = new TemplateContext
            {
                File = file,
                Project = file.Project
            };
            var localParameters = new Dictionary<string, object>
            {
                [key: "Data.Context"] = context
            };

            return new CreateLocalParametersOutput
            {
                LocalParameters = localParameters
            };
        }

    }
}