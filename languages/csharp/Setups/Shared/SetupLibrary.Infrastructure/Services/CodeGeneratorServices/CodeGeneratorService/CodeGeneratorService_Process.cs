

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using SetupLibrary.Application.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;



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
        public async Task Process(
            TemplateData data,
            List<TemplateProject> projects
        )
        {
            var allFiles = projects.SelectMany(selector: project => project.Files).ToList();

            foreach (var file in allFiles)
            {
                var context = (await CreateContext(file)).Context;
                data.Context = context;

                var result = await ProcessRefAsync(data, allFiles);

                var processPathsOutput = await ProcessPaths(
                    file: file,
                    data: data
                );

                var contentResult = await ProcessContents(
                    file: file,
                    data: data,
                    localTemplateInfosForPaths: processPathsOutput.LocalTemplateInfos
                );

                //var shouldRun = (await ProcessRunIf(data)).ShouldRun;

                //if (!shouldRun)
                //{
                //    continue;
                //}


                var templateInfos = contentResult.LocalTemplateInfos;


                foreach (var templateInfo in templateInfos)
                {
                    var content = templateInfo.TemplateContent;
                    var codeType = file.CodeType;

                    content = codeType.RemoveCommandStrings(intputString: content);
                    content = codeType.AlignSingleLineTemplateCommands(intputString: content);
                    content = codeType.ReplaceIgnoredNamesInContent(inputString: content);

                    if (file.ShouldOverWrite || !File.Exists(path: templateInfo.OutputFilePath))
                    {
                        if (templateInfo.OutputFilePath.EndsWith(".cs"))
                        {
                            try
                            {
                                var tree = CSharpSyntaxTree.ParseText(content);
                                var root = tree.GetRoot().NormalizeWhitespace();
                                content = root.ToFullString();
                            }
                            catch (Exception e) { }
                        }

                        File.WriteAllText(path: templateInfo.OutputFilePath, contents: content);
                    }
                }
            }
        }
    }
}