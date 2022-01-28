

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ICSharpCode.Decompiler.CSharp.Syntax;
using Microsoft.AspNetCore.Components.WebAssembly.Http;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using CodeGenerator.Models;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public class ProcessRunIfOutput
        {
            public bool ShouldRun { get; set; }
        }

        public async Task<ProcessRunIfOutput> ProcessRunIf(TemplateData data)
        {
            var file = data.Context.File;
            var getFirstCommandContentOutput = await GetFirstCommandContentAsync(
                        inputString: file.Content, command: TemplateCommand.RunIf, codeType: file.CodeType);

            if (!getFirstCommandContentOutput.Success)
            {
                return new ProcessRunIfOutput
                {
                    ShouldRun = false
                };
            };

            var result = await _evalService.EvaluateAsync<TemplateData, bool>(file.Content, data);

            return new ProcessRunIfOutput
            {
                ShouldRun = result.Payload
            };
        }
    }
}