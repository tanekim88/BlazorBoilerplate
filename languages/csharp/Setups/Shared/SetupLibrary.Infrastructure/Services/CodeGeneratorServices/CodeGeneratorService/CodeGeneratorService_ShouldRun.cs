

using System.Threading.Tasks;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task<ShouldRunOutput> ShouldRun(
            string inputString,
            TemplateData data,
            TemplateCodeType codeType
        )
        {
            var commandContent = GetFirstCommandContent(inputString: inputString, command: TemplateCommand.RunIf,
                codeType: codeType);

            if (commandContent != null)
            {
                var result = await _evalService.EvaluateExpression<bool>(
                    code: commandContent,
                    parameters: new
                    {
                        Data = data
                    }
                );

                return new ShouldRunOutput {Success = result.Payload};
            }

            return new ShouldRunOutput {Success = true};
        }

        public record ShouldRunOutput
        {
            public bool Success { get; set; }
        }
    }
}