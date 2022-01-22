

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
using SetupLibrary.Application.Models;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public static class Track
    {
        public static ConcurrentDictionary<string, ConcurrentDictionary<string, object>> ProcessedFileToDic = new();
    }

    public class CodeGenArg<TArg>
    {
        public TemplateContext Context { get; set; }
        public TArg Data { get; set; }
    }

    public partial class CodeGeneratorService
    {
        public async Task Process<TArgs>(
            TemplateData data,
            List<TemplateProject> projects
        )
        {
            var allFiles = projects.SelectMany(selector: project => project.Files).ToList();

            foreach (var file in allFiles)
            {
                var context = (await CreateContext(file)).Context;
                data.Context = context;

                var shouldRun = (await ProcessRunIf(file, data)).ShouldRun;

                if (!shouldRun)
                {
                    continue;
                }

                var result = await ProcessPaths(
                    file: file,
                    data: data
                );

                var contentResult = await ProcessContents(
                    file: file,
                    data: data,
                    localTemplateInfosForPaths: result.LocalTemplateInfos
                );

                var codeType = file.CodeType;

                //content = codeType.RemoveCommandStrings(intputString: content);
                //content = codeType.AlignSingleLineTemplateCommands(intputString: content);
                //content = codeType.ReplaceIgnoredNamesInContent(inputString: content);

                //if (file.ShouldOverWrite || !File.Exists(path: localTem.OutputFilePath))
                //{
                //    if (localTem.OutputFilePath.EndsWith(".cs"))
                //    {
                //        try
                //        {
                //            var tree = CSharpSyntaxTree.ParseText(content);
                //            var root = tree.GetRoot().NormalizeWhitespace();
                //            content = root.ToFullString();
                //        }
                //        catch (Exception e) { }
                //    }

                //    File.WriteAllText(path: localTem.OutputFilePath, contents: content);
                //}

            }
        }
    }
}