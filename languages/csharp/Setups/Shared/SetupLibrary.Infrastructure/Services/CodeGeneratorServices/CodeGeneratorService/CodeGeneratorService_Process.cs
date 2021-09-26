﻿

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

    public partial class CodeGeneratorService
    {
        public async Task Process(
            Dictionary<string, object> parameters,
            List<TemplateProject> projects
        )
        {
            var allFiles = projects.SelectMany(selector: project => project.Files).ToList();

            var result = await ProcessBulkRefs(files: allFiles, parameters: parameters);


            var codeRecordTemps = result.Files.Select(selector: async file =>
            {
                Console.WriteLine(value: file.TemplatePath);
                var templateInfoResult =
                    await ProcessPaths(file: file, parameters: parameters);
                Console.WriteLine(value: "!!!!!!!!!!!!!!!!!");
                var templateInfoResult2 = await ProcessContents(
                    file: file,
                    parameters: parameters,
                    localTemplateInfosForPaths: templateInfoResult.LocalTemplateInfos
                );
                var localTemplateInfos = templateInfoResult2.LocalTemplateInfos;

                return new { File = file, LocalTemplateInfos = localTemplateInfos };
            }).Select(selector: x => x.Result).ToList();

            var idToFileDic = codeRecordTemps.SelectMany(selector: obj =>
            {
                var toReturn = obj.LocalTemplateInfos.Select(selector: x => new
                {
                    x.Id,
                    obj.File,
                    LocalTemplateInfo = x
                });

                return toReturn;
            }).ToDictionary(keySelector: x => x.Id, elementSelector: x => new { x.File, x.LocalTemplateInfo });

            var codeRecords = codeRecordTemps.Select(selector: obj =>
            {
                var localTemplateInfos = obj.LocalTemplateInfos;

                var records = localTemplateInfos.Select(selector: localTemplateInfo =>
                {
                    return new EvalCodeRecord
                    {
                        Id = localTemplateInfo.Id,
                        BodyCode = localTemplateInfo.TemplateContent,
                        LocalParameters = localTemplateInfo.LocalParameters,
                        Sections = localTemplateInfo.Sections,
                        TemplateSections = localTemplateInfo.TemplateSections
                    };
                }).ToList();


                return new ProcessRunIfs_Record
                {
                    File = obj.File,
                    EvalCodeRecords = records
                };
            }).ToList();

            var result2 = await ProcessBulkRunIfs(
                records: codeRecords, parameters: parameters
                );

            var resultTemplateCodeRecords = result2.TemplateCodeRecords;

            var dic = resultTemplateCodeRecords.ToDictionary(keySelector: x => x.Id);

            var result3 = await _evalService.EvaluateBulkTemplates(
                preserveInputOnSucess: false,
                preserveOutputOnSucess: false,
                codeRecords: resultTemplateCodeRecords.Select(selector: async x =>
                {
                    var obj = idToFileDic[key: x.Id];
                    var file = obj.File;
                    var project = file.Project;

                    var contextTemplateResult = await GetContextTemplate(
                        fileTemplatePath: file.TemplatePath,
                        project: project,
                        sections: x.Sections,
                        templateSections: x.TemplateSections
                    );

                    return new EvalCodeRecord
                    {
                        LocalParameters = x.LocalParameters,
                        Id = x.Id,
                        BodyCode = x.BodyCode,
                        ContextTemplate = contextTemplateResult.Template
                    };
                }).Select(selector: x => x.Result).ToList(),
                parameters: parameters,
                localTypes: new List<Type>
                {
                    typeof(TemplateContext)
                }
            );

            var payloads = result3.Payloads;

            if (payloads is not null)
            {
                payloads.ForEach(action: payload =>
                {
                    var obj = idToFileDic[key: payload.Id];
                    var localTem = obj.LocalTemplateInfo;
                    var file = obj.File;

                    var content = payload.Content;

                    var data = dic[key: payload.Id];
                    var codeType = data.CodeType;

                    content = codeType.RemoveCommandStrings(intputString: content);
                    content = codeType.AlignSingleLineTemplateCommands(intputString: content);
                    content = codeType.ReplaceIgnoredNamesInContent(inputString: content);

                    if (file.ShouldOverWrite || !File.Exists(path: localTem.OutputFilePath))
                    {
                        if (localTem.OutputFilePath.EndsWith(".cs"))
                        {
                            try
                            {
                                var tree = CSharpSyntaxTree.ParseText(content);
                                var root = tree.GetRoot().NormalizeWhitespace();
                                content = root.ToFullString();
                            }
                            catch (Exception e) { }
                        }

                        File.WriteAllText(path: localTem.OutputFilePath, contents: content);
                    }
                });

                var appsDir = _pathService.GetAppDirPath();
                var slnPath = Path.Combine(appsDir.AppDirPath, "App.sln");
                var slnContent = File.ReadAllText(slnPath);
                var folderGuid = "2150E333-8FDC-42A3-9474-1A3956D46DE8";
                var boundedContextsFolderGuid = Regex.Match(slnContent, @"= ""BoundedContexts"", ""BoundedContexts"", ""\{(?<boundedContextsFoderGuid>.*?)\}""").Groups["boundedContextsFoderGuid"].Value;
                var projGuid = "9A19103F-16F7-4668-BE54-9A1E7A4F7556";

                var sep = Path.DirectorySeparatorChar;
                foreach (var newBoundedContextName in newBoundedContextNames)
                {
                    var currentToParentFolderDic = new Dictionary<string, string[]>
                    {
                        [$"{newBoundedContextName}BoundedContext"] = new string[] { "BoundedContexts" },
                        ["Tests"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext" },
                        ["Shared"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext" },
                    };

                    var folders = currentToParentFolderDic.Keys.ToList();

                    var currentProjToParentDic = new Dictionary<string, string[]>
                    {
                        [$"{newBoundedContextName}.Domain"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext" },
                        [$"{newBoundedContextName}.Application"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext" },
                        [$"{newBoundedContextName}.Infrastructure"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext" },
                        [$"{newBoundedContextName}.IntegrationEvents"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext" },
                        [$"Shared{newBoundedContextName}.Domain"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext", "Shared" },
                        [$"Shared{newBoundedContextName}.Application"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext", "Shared" },
                        [$"Shared{newBoundedContextName}.Infrastructure"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext", "Shared" },
                        [$"{newBoundedContextName}.UnitTests"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext", "Tests" },
                        [$"{newBoundedContextName}.IntegrationTests"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext", "Tests" },
                        [$"{newBoundedContextName}.ArchTests"] = new string[] { $"BoundedContexts", $"{newBoundedContextName}BoundedContext", "Tests" },
                    };


                    var combinedDict = currentToParentFolderDic.ToDictionary(x => x.Key, x => (paths: x.Value, isFolder: true)).Concat(currentProjToParentDic.ToDictionary(x => x.Key, x => (paths: x.Value, isFolder: false))).ToDictionary(x => x.Key, x => x.Value);

                    var toAdd = new List<string> { };
                    var toPostAdd = new List<string> { };
                    var combinedKeys = currentProjToParentDic.Keys.ToList();

                    foreach (var pair in combinedDict)
                    {
                        var key = pair.Key;
                        var isFolder = pair.Value.isFolder;
                        var reg = $@"Project\(""{{(?<typeGuid>.+?)}}""\)\s*=\s*""{key}"",\s*""(?<desc>.*?)"",\s*""{{(?<itemGuid>.+?)}}""";
                        var parentFolderNames = pair.Value.paths;
                        var firstFolderName = parentFolderNames.FirstOrDefault();
                        var restFolderNames = parentFolderNames.Skip(1);
                        var restFolderNamesIncludingCurrentItem = parentFolderNames.Skip(1).Concat(new string[] { key });
                        var fullPathNames = parentFolderNames.Concat(new string[] { key });
                        var strFullPathName = string.Join(sep, fullPathNames);


                        var folderReg = $@"Project\(""{{{folderGuid}}}""\)\s*=\s*""{firstFolderName}"",\s*""{firstFolderName}"",\s*""{{(?<itemGuid>.+?)}}""";

                        var parentGuid = Regex.Matches(slnContent, folderReg).Where(match =>
                        {
                            var itemGuid = match.Groups["itemGuid"].Value;

                            if (!Regex.IsMatch(slnContent, $@"{{{itemGuid}}}\s*=\s*{{[A-Z0-9-]+}}"))
                            {
                                return true;
                            }

                            return false;
                        }).Select(match => match.Groups["itemGuid"].Value).FirstOrDefault();

                        if (parentGuid is null && parentFolderNames.Count() > 0)
                        {
                            parentGuid = Guid.NewGuid().ToString().ToUpper();
                            slnContent = AddToFirstSection(slnContent, $"Project(\"{{{folderGuid}}}\") = \"{firstFolderName}\", \"{firstFolderName}\", \"{{{parentGuid}}}\"\nEndProject");
                        }

                        foreach (var currFolderName in restFolderNames)
                        {
                            var curReg = $@"Project\(""{{{folderGuid}}}""\)\s*=\s*""{currFolderName}"",\s*""{currFolderName}"",\s*""{{(?<itemGuid>.+?)}}""";
                            var childItemGuid = Regex.Matches(slnContent, curReg).Where(match =>
                            {
                                var itemGuid = match.Groups["itemGuid"].Value;

                                if (Regex.IsMatch(slnContent, $@"{{{itemGuid}}}\s*=\s*{{{parentGuid}}}"))
                                {
                                    return true;
                                }

                                return false;
                            }).Select(match => match.Groups["itemGuid"].Value).FirstOrDefault();

                            if (childItemGuid is null)
                            {
                                childItemGuid = Guid.NewGuid().ToString().ToUpper();
                                slnContent = AddToFirstSection(slnContent, $"Project(\"{{{folderGuid}}}\") = \"{currFolderName}\", \"{currFolderName}\", \"{{{childItemGuid}}}\"\nEndProject");
                                slnContent = AddToThirdSection(slnContent, $@"{{{childItemGuid}}} = {{{parentGuid}}}");
                            }

                            parentGuid = childItemGuid;
                        }

                        var folderRegex = $@"Project\(""{{{folderGuid}}}""\)\s*=\s*""{key}"",\s*""{key}"",\s*""{{(?<itemGuid>.+?)}}""";
                        var projRegex = $@"Project\(""{{{projGuid}}}""\)\s*=\s*""{key}"",\s*""{Regex.Escape(strFullPathName)}{Regex.Escape(sep.ToString())}{key}\.csproj"",\s*""{{(?<itemGuid>.+?)}}""";
                        var regex = isFolder ? folderRegex : projRegex;
                        var thisItemGuid = Regex.Matches(slnContent, regex).Where(match =>
                        {
                            var itemGuid = match.Groups["itemGuid"].Value;

                            if (Regex.IsMatch(slnContent, $@"{{{itemGuid}}}\s*=\s*{{{parentGuid}}}"))
                            {
                                return true;
                            }

                            return false;
                        }).Select(match => match.Groups["itemGuid"].Value).FirstOrDefault();

                        if (thisItemGuid is null)
                        {
                            thisItemGuid = Guid.NewGuid().ToString().ToUpper();
                            if (isFolder)
                            {
                                slnContent = AddToFirstSection(slnContent, $"Project(\"{{{folderGuid}}}\") = \"{key}\", \"{key}\", \"{{{thisItemGuid}}}\"\nEndProject");

                            }
                            else
                            {
                                slnContent = AddToFirstSection(slnContent, $"Project(\"{{{projGuid}}}\") = \"{key}\", \"{strFullPathName}{sep}{key}.csproj\", \"{{{thisItemGuid}}}\"\nEndProject");
                                slnContent = AddToSecondSection(slnContent,
@$"        
        {{{thisItemGuid}}}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
        {{{thisItemGuid}}}.Debug|Any CPU.Build.0 = Debug|Any CPU
        {{{thisItemGuid}}}.Debug|x64.ActiveCfg = Debug|Any CPU
        {{{thisItemGuid}}}.Debug|x64.Build.0 = Debug|Any CPU
        {{{thisItemGuid}}}.Release|Any CPU.ActiveCfg = Release|Any CPU
        {{{thisItemGuid}}}.Release|Any CPU.Build.0 = Release|Any CPU
        {{{thisItemGuid}}}.Release|x64.ActiveCfg = Release|Any CPU
        {{{thisItemGuid}}}.Release|x64.Build.0 = Release|Any CPU
");
                            }

                            if (parentGuid is not null)
                            {
                                slnContent = AddToThirdSection(slnContent, $@"{{{thisItemGuid}}} = {{{parentGuid}}}");
                            }
                        }

                    }
                }

                slnContent = Regex.Replace(slnContent, @"^\s+$[\r\n]*", string.Empty, RegexOptions.Multiline);
                File.WriteAllText(slnPath, slnContent);
            }
        }

        public string AddToFirstSection(string slnContent, string what)
        {
            what = what.Trim();
            slnContent = Regex.Replace(slnContent, @"\s*Global[\s\n\r]+GlobalSection\(SolutionConfigurationPlatforms\)", match =>
            {
                var value = match.Value;

                return $"\n{what}\n{value}";
            }, RegexOptions.Singleline);

            return slnContent;
        }
        public string AddToSecondSection(string slnContent, string what)
        {
            what = what.Trim();
            slnContent = Regex.Replace(slnContent, @"\s*EndGlobalSection[\s\n\r]+GlobalSection\(SolutionProperties\)", match =>
            {
                var value = match.Value;

                return $"\n\t\t{what}\n{value}";
            }, RegexOptions.Singleline);

            return slnContent;
        }
        public string AddToThirdSection(string slnContent, string what)
        {
            what = what.Trim();
            slnContent = Regex.Replace(slnContent, @"\s*EndGlobalSection[\s\n\r]+GlobalSection\(ExtensibilityGlobals\)", match =>
            {
                var value = match.Value;

                return $"\n\t\t{what}\n{value}";
            }, RegexOptions.Singleline);

            return slnContent;
        }

        public class TempTuple
        {
            public string Name { get; set; }
            public string TypeGuid { get; set; }
            public string Desc { get; set; }
            public string ItemGuid { get; set; }
            public bool MatchFound { get; set; }
        }
    }
}