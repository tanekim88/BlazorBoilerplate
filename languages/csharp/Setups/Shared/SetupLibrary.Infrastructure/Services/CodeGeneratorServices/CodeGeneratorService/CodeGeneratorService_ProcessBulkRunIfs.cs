

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SetupLibrary.Application.Models;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task<ProcessRunIfOutput> ProcessRunIf(
                TemplateFile file,
                TemplateData data
        )
        {
            var codeType = file.CodeType;
            var commandContent = GetFirstCommandContent(
                 inputString: file.Content, command: TemplateCommand.RunIf, codeType: codeType);

            var shouldRunResult = await _evalService.Evaluate(commandContent, data);


            var payload = (bool)Convert.ChangeType(shouldRunResult.Payload, typeof(bool));
            return new ProcessRunIfOutput
            {
                ShouldRun = payload
            };
        }

        public record ProcessRunIfOutput
        {
            public bool ShouldRun { get; set; }
        }
    }
}