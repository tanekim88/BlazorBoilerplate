

using System.Collections.Generic;
using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public record CreateContextOutput
        {
            public TemplateContext Context { get; init; }
        }

        public async Task<CreateContextOutput> CreateContext(
             TemplateFile file
        )
        {
            var context = new TemplateContext
            {
                File = file,
                Project = file.Project
            };

            return new CreateContextOutput
            {
                Context = context
            };
        }

    }
}