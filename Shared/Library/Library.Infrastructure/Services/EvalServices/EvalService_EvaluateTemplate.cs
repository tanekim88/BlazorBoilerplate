

using System.Collections.Generic;
using System.Threading.Tasks;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public async Task<EvalutateTemplateOutput> EvaluateTemplate(
            string inputFile,
            string outputFile,
            string code,
            dynamic parameters,
            string resultVariableName = null
        )
        {
            var parsedParameters = (Dictionary<string, object>) parameters;
            var processOutput = await Process(
                bodyBuilder: async builder =>
                {
                    builder.Append(value: code);
                    return builder;
                },
                templateId: inputFile,
                parametersInput: parsedParameters,
                localTypes: null,
                resultVariableName: resultVariableName
            );

            string inputContent = processOutput.Builder.ToString();

            var result = await _templateService.ParseTemplate(
                inputContent: inputContent,
                inputFile: inputFile,
                outputFile: outputFile,
                preserveInputOnSucess: false,
                preserveOutputOnSucess: true
            );

            return new EvalutateTemplateOutput {OutputContent = result.OutputContent, Success = result.Success};
            ;
        }
    }
}