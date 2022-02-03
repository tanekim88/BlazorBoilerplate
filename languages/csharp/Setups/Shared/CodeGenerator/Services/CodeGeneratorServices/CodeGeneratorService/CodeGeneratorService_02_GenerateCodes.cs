

using CodeGenerator.Models;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData>
    {
        public async Task GenerateCodes(
                List<string> templatePaths
            )
        {
            var projects = templatePaths.Select(templatePath =>
            {
                var projectTask = _codeGeneratorProvider.GetProjectFromFilePathAsync(templatePath);
                projectTask.Wait();
                var project = projectTask.Result;

                return project;
            });

            var projectNameToProjectDic = projects.ToDictionary(proj => proj.Name);

            var allFiles = projects.SelectMany(selector: project => project.Files).ToList();

            foreach (var file in allFiles)
            {
                var data = await _codeGeneratorProvider.CreatePreDataAsync(file);

                var result = await ProcessRefAsync(file, data, projectNameToProjectDic);

                var processPathsOutput = await ProcessPaths(
                    file: file,
                    data: data
                );

                var processContentsOutput = await ProcessContents(
                    file: file,
                    data: data,
                    localTemplateInfosForPaths: processPathsOutput.LocalTemplateInfos
                );

                var shouldRun = (await ShouldRun(file, data)).ShouldRun;

                if (!shouldRun)
                {
                    continue;
                }


                var templateInfos = contentResult.LocalTemplateInfos;

                _codeGeneratorProvider.CreateDataAsync(file, templateInfos, data);

                foreach (var templateInfo in templateInfos)
                {
                    var content = templateInfo.TemplateContent;
                    var codeType = file.CodeType;

                    content = codeType.RemoveCommandStrings(intputString: content);
                    content = codeType.AlignSingleLineTemplateCommands(intputString: content);
                    content = codeType.ReplaceIgnoredNamesInContent(inputString: content);
                    content = _templateService.ParseTemplate(content, data);

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