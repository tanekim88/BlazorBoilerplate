

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public static class ReplaceAsyncExtension
    {
        public static async Task<string> ReplaceAsync(this Regex regex, string input,
            Func<Match, Task<string>> replacementFn)
        {
            var sb = new StringBuilder();
            var lastIndex = 0;

            foreach (Match match in regex.Matches(input: input))
            {
                sb.Append(value: input, startIndex: lastIndex, count: match.Index - lastIndex)
                    .Append(value: await replacementFn(arg: match).ConfigureAwait(continueOnCapturedContext: false));

                lastIndex = match.Index + match.Length;
            }

            sb.Append(value: input, startIndex: lastIndex, count: input.Length - lastIndex);
            return sb.ToString();
        }
    }



    public partial class CodeGeneratorService
    {
        public class ProcessRefOutput
        {
            public bool Success { get; set; }
            public TemplateData Payload { get; set; }
        }

        public async Task<ProcessRefOutput> ProcessRefAsync(
            TemplateData data,
            List<TemplateFile> files)
        {
            var file = data.Context.File;


            var commandContent = await GetFirstCommandContentAsync(inputString: file.Content, command: TemplateCommand.Ref,
                codeType: file.CodeType);

            if (!commandContent.Success)
            {
                commandContent = await GetFirstCommandContentAsync(inputString: file.Content,
                    command: TemplateCommand.PartialRef, codeType: file.CodeType);
                if (commandContent.Success)
                {
                    file.HasPartialRef = true;
                    var content2 = File.ReadAllText(path: commandContent.Payload);
                    file.PartialRefContent = file.CodeType.ApplyAliasses(content: content2);
                }
            }

            if (!commandContent.Success)
            {
                commandContent =
               await GetFirstCommandContentAsync(inputString: file.Content, command: TemplateCommand.PartialRefProject,
                    codeType: file.CodeType);

                if (commandContent.Success)
                {
                    file.HasPartialRef = true;

                    var currentFileProjectPathResult = _pathService.GetProjectPath(
                        projectName: file.Project.Name
                    );

                    var targetProjectPathResult = _pathService.GetProjectPath(
                        projectName: commandContent.Payload
                    );

                    if (!string.IsNullOrEmpty(value: currentFileProjectPathResult.ProjectPath) &&
                        !string.IsNullOrEmpty(value: targetProjectPathResult.ProjectPath))
                    {
                        var path = file.TemplatePath.Replace(oldValue: currentFileProjectPathResult.ProjectPath,
                            newValue: targetProjectPathResult.ProjectPath);

                        var currentProject = ProjectNameToProjectDic[key: file.Project.Name];
                        var targetProject = ProjectNameToProjectDic[key: commandContent.Payload];

                        path = Regex.Replace(input: path,
                            pattern:
                            $@"{file.CodeType.GetTemplateSymbolName(templateSymbol: currentProject.GeneratorSymbol + "Gen", isPath: true)}",
                            replacement: file.CodeType.GetTemplateSymbolName(
                                templateSymbol: targetProject.GeneratorSymbol + "Gen", isPath: true));

                        var content2 = File.ReadAllText(path: path);
                        file.PartialRefContent = file.CodeType.ApplyAliasses(content: content2);

                        var applySectionCommandResult = file.CodeType.ApplySectionCommand(
                                sourceContent: file.PartialRefContent,
                                targetContent: file.Content,
                                sectionBeginCommand: TemplateCommand.TemplateSectionBegin,
                                sectionEndCommand: TemplateCommand.TemplateSectionEnd
                            );

                        file.Content = applySectionCommandResult.ProcessedContent;
                        file.TemplateSections = applySectionCommandResult.FoundSections.Select(section => new TemplateSection { Name = section }).ToList();
                    }
                }
            }

            if (!commandContent.Success)
            {
                commandContent = await
                    GetFirstCommandContentAsync(inputString: file.Content, command: TemplateCommand.RefProject,
                        codeType: file.CodeType);

                if (commandContent.Success)
                {
                    var currentFileProjectPathResult = _pathService.GetProjectPath(
                        projectName: file.Project.Name
                    );

                    var targetProjectPathResult = _pathService.GetProjectPath(
                        projectName: commandContent.Payload
                    );

                    if (!string.IsNullOrEmpty(value: currentFileProjectPathResult.ProjectPath) &&
                        !string.IsNullOrEmpty(value: targetProjectPathResult.ProjectPath))
                    {
                        var path = file.TemplatePath.Replace(oldValue: currentFileProjectPathResult.ProjectPath,
                            newValue: targetProjectPathResult.ProjectPath);

                        var currentProject = ProjectNameToProjectDic[key: file.Project.Name];
                        var targetProject = ProjectNameToProjectDic[key: commandContent.Payload];

                        path = Regex.Replace(input: path,
                            pattern:
                            $@"{file.CodeType.GetTemplateSymbolName(templateSymbol: currentProject.GeneratorSymbol + "Gen", isPath: true)}",
                            replacement: file.CodeType.GetTemplateSymbolName(
                                templateSymbol: targetProject.GeneratorSymbol + "Gen", isPath: true));

                        var content2 = File.ReadAllText(path: path);
                        file.Content = file.CodeType.ApplyAliasses(content: content2);
                    }
                }
            }

            if (!commandContent.Success)
            {
                return new ProcessRefOutput
                {
                    Success = false,
                    Payload = null
                };
            }



            if (file.HasPartialRef)
            {
                var result2 = file.CodeType.ApplySectionCommand(
                    sourceContent: file.PartialRefContent,
                    targetContent: file.Content,
                    sectionBeginCommand: TemplateCommand.TemplateSectionBegin,
                    sectionEndCommand: TemplateCommand.TemplateSectionEnd
                );

                file.Content = result2.ProcessedContent;
                file.TemplateSections = result2.FoundSections.Select(section => new TemplateSection { Name = section }).ToList();
            }
            else
            {
                var evaluateAsyncOutput = await _evalService.EvaluateAsync<TemplateData, string>(commandContent.Payload, data);

                var content = File.ReadAllText(path: evaluateAsyncOutput.Payload);

                file.Content = file.CodeType.ApplyAliasses(content: content);
            }


            return new ProcessRefOutput
            {
                Success = true,
                Payload = data
            };
        }
    }
}