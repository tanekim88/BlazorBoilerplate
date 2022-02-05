

using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData, TFile> where TFile: TemplateFile<TData>
    {
        public async Task<ShouldRunOutput> ShouldRun(
            TFile file,
            TData data
        )
        {
            var codeType = file.CodeType;
            var inputString = file.Content;

            var commandContentResult = await GetFirstCommandContentAsync(inputString: inputString, command: TemplateCommand.RunIf,
                codeType: codeType);

            if (commandContentResult.Success)
            {
                var result = await _evalService.EvaluateAsync<TData, bool>(
                    code: commandContentResult.Payload,
                    data
                );

                return new ShouldRunOutput { ShouldRun = result.Payload };
            }

            return new ShouldRunOutput { ShouldRun = true };
        }

        public record ShouldRunOutput
        {
            public bool ShouldRun { get; set; }
        }
    }
}