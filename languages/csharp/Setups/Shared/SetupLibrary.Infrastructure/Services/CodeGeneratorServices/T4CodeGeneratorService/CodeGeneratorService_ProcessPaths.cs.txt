

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Humanizer;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public record LocalTemplateInfo
    {
        public string Id { get; set; }
        public string InputFilePath { get; set; }
        public string OutputFilePath { get; set; }
        public string TemplateContent { get; set; }
        public string TargetFileContent { get; set; }
        public Dictionary<string, object> LocalParameters { get; set; }
        public bool ShouldOverride { get; set; }
        public List<string> Sections { get; set; }
        public List<string> TemplateSections { get; set; }
        public List<TemplateTokenInfo> ListOfTokenInfosUsedForPath { get; set; }
    }

    public partial class CodeGeneratorService
    {
        public async Task<ProcessPathsOutput> ProcessPaths(
        TemplateFile file,
        Dictionary<string, object> parameters
            )
        {
            var context = new TemplateContext();
            context.File = file;
            context.Project = file.Project;
            var localParameters = file.LocalParameters;
            var combinedParameters = parameters.Concat(second: localParameters)
                .ToDictionary(keySelector: parameter => parameter.Key, elementSelector: parameter => parameter.Value);

            var codeType = file.CodeType;

            var textString = file.Content;

            var pathMaxLength = Path.GetFileName(path: file.Path).Length;

            var preparedPathString = codeType.RemoveTemplatePostfix(inputString: file.Path, isPath: true);

            var pathMatches = Regex.Matches(input: preparedPathString,
                pattern: codeType.GetTemplateName(
                    inputName:
                    @$"(?<Name>([a-zA-Z]|\d|{Regex.Escape(str: codeType.PathNamePrefix)}|{Regex.Escape(str: codeType.PathNamePostfix)}|{Regex.Escape(str: codeType.PropertyPathSeparatorForPath)})+)",
                    isPath: true),
                options: RegexOptions.Multiline);

            var pathNameMatches = pathMatches.SelectMany(selector: m =>
            {
                var nameCandidate = m.Groups[groupname: "Name"].Value;

                var splitted = Regex.Split(input: nameCandidate,
                    pattern:
                    @$"(?:{Regex.Escape(str: codeType.PathNamePrefix)}|{Regex.Escape(str: codeType.PathNamePostfix)})");
                return splitted.ToList();
            }).Distinct().ToList();


            var pathMax = pathNameMatches.OrderByDescending(keySelector: x => x.Length).FirstOrDefault()?.Length ?? 0;

            var matchingTokenInfosForPath = combinedParameters.SelectMany(selector: paramter =>
            {
                var matchingNames = GetMatchingNames(
                    maxLength: pathMax,
                    isPath: true,
                    candidates: pathNameMatches,
                    objectType: paramter.Value.GetType(),
                    codeType: codeType,
                    text: file.Path,
                    parentName: null,
                    parentPropertyPaths: new List<string>());

                return matchingNames;
            }).ToList();

            var tokenInfosForPath = matchingTokenInfosForPath.SelectMany(selector: tokenInfo =>
            {
                return combinedParameters.SelectMany(selector: paramter =>
                {
                    var toReturn = GetAllMatchingNameToTokenInfoDicWithConstraint(
                        context: context,
                        isPath: true,
                        matchingToken: tokenInfo,
                        codeType: codeType,
                        text: file.Path,
                        obj: paramter.Value,
                        constraints: null,
                        parentName: null,
                        parentPropertyPaths: new List<string>());
                    return toReturn;
                });
            }).ToList();

            var finalList = new List<TemplateTokenInfo>();

            var combinedTokenInfos = tokenInfosForPath.GroupBy(keySelector: token =>
            {
                var joinedIds = string.Join(separator: ",", values: token.Ids.Select(selector: g => g.ToString()));

                return joinedIds;
            }).Select(selector: x => x.First()).ToList();


            var groupedIdTokens = combinedTokenInfos.ToLookup(keySelector: x => x.GroupId)
                .ToDictionary(keySelector: x => x.Key, elementSelector: x => x.ToList());

            var groupedTokens = combinedTokenInfos.ToLookup(keySelector: x => x.Id).ToDictionary(
                keySelector: x => x.Key, elementSelector: x =>
                {
                    var final = x.SelectMany(selector: y =>
                    {
                        var toReturn = y.GroupIds.SelectMany(selector: groupId =>
                        {
                            if (groupedIdTokens.TryGetValue(key: groupId, value: out var o))
                                return o;
                            return new List<TemplateTokenInfo>();
                        }).ToList();

                        return toReturn;
                    }).ToList();

                    return final;
                });

            foreach (var tokenInfo in combinedTokenInfos)
            {
                var found = false;
                for (var i = 0; i < finalList.Count(); i++)
                {
                    var finalListItem = finalList[index: i];

                    var candidateId = string.Join(separator: ",",
                        values: tokenInfo.Ids.Select(selector: g => g.ToString()));
                    var itemId = string.Join(separator: ",",
                        values: finalListItem.Ids.Select(selector: g => g.ToString()));
                    if (candidateId.StartsWith(value: itemId))
                    {
                        found = true;

                        finalList[index: i] = tokenInfo;

                        break;
                    }
                }

                if (!found) finalList.Add(item: tokenInfo);
            }


            var listOfList = finalList.Select(selector: x =>
            {
                if (groupedTokens.TryGetValue(key: x.Id, value: out var o)) return o;

                return new List<TemplateTokenInfo>();
            }).ToList();

            var filteredListOfList = listOfList.Where(predicate: list =>
            {
                var pathMatches =
                    matchingTokenInfosForPath.All(predicate: m =>
                        list.Any(predicate: l => l.CurrentName == m.CurrentName));

                return pathMatches;
            }).ToList();

            if (filteredListOfList.Count() == 0 && pathNameMatches.Count() == 0) filteredListOfList = new List<List<TemplateTokenInfo>> { new() };

            var groupedFilteredListOfList = filteredListOfList.GroupBy(keySelector: list =>
            {
                var orderedList = list.OrderBy(keySelector: x => x.CurrentName).ThenBy(keySelector: x => x.Value)
                    .ToList();
                var tokenStrs = orderedList.Select(selector: token => (token.CurrentName, token.Value).ToString());
                var toReturn = string.Join(separator: ",", values: tokenStrs);
                return toReturn;
            }).Select(selector: x => x.First()).ToList();

            //listOfList = listOfList.Take(3).ToList();

            //listOfList.ForEach(async listOfTokenInfos =>
            var localTemplateInfos = groupedFilteredListOfList.Select(selector: async listOfTokenInfos =>
            {
                var listOfListBackup = groupedFilteredListOfList;

                var filePath = file.Path;

                var directories = new List<TemplateDirectory>();
                var templateDirectoryPath = Directory.GetParent(path: file.TemplatePath).FullName;
                var path = file.Path;
                while (templateDirectoryPath != file.Project.DirPath)
                {
                    path = Directory.GetParent(path: path).FullName;

                    var isTemplateDir = templateDirectoryPath.EndsWith(
                        value: codeType.GetTemplateSymbolName(templateSymbol: file.Project.GeneratorSymbol,
                            isPath: true),
                        comparisonType: StringComparison.OrdinalIgnoreCase);

                    var shouldOverWrite = false;

                    if (isTemplateDir)
                        shouldOverWrite =
                            templateDirectoryPath.EndsWith(
                                value: codeType.GetTemplateSymbolName(
                                    templateSymbol: file.Project.GeneratorSymbol.Pascalize(), isPath: true)) ||
                            templateDirectoryPath.EndsWith(
                                value: codeType.GetTemplateSymbolName(
                                    templateSymbol: file.Project.GeneratorSymbol.ToUpper(), isPath: true));

                    var toAdd = new TemplateDirectory
                    {
                        ShouldOverwrite = shouldOverWrite,
                        Path = path,
                        TemplatePath = templateDirectoryPath
                    };

                    directories.Add(item: toAdd);

                    templateDirectoryPath = Directory.GetParent(path: templateDirectoryPath).FullName;
                }

                directories.Reverse();

                var processPathsPathsAndContentsResult = await ProcessPathsBody(
                    directories: directories,
                    path: filePath,
                    codeType: codeType,
                    templateInfos: listOfTokenInfos,
                    file: file
                );

                var processedText = processPathsPathsAndContentsResult.ProcessedText;
                var foundSections = processPathsPathsAndContentsResult.FoundSections;

                filePath = processPathsPathsAndContentsResult.Path;

                if (file.Path != file.TemplatePath)
                {
                    var currentTempFilePath = filePath + ".temp.txt";
                    var ttTempFilePath = filePath + ".tt.temp.txt";
                    var tempXmlPath = filePath + ".xml.temp.txt";

                    var dir = Path.GetDirectoryName(path: tempXmlPath);

                    if (!Directory.Exists(path: dir)) Directory.CreateDirectory(path: dir);

                    //if (Track.ProcessedFileToDic.TryGetValue(tempXmlPath, out var o))
                    //{
                    //    throw new Exception("????????????" + tempXmlPath);
                    //}
                    //else
                    //{
                    //    Track.ProcessedFileToDic[tempXmlPath] = new ConcurrentDictionary<string, object>
                    //    {
                    //        ["currentTempFilePath"] = currentTempFilePath,
                    //        ["tempXmlPath"] = tempXmlPath,
                    //        ["ttTempFilePath"] = ttTempFilePath,
                    //        ["listOfTokenInfos"] = listOfTokenInfos,
                    //        ["TemplatePath"] = file.TemplatePath,
                    //        ["file"] = file,
                    //        ["OriginalTemplatePath"] = file.TemplatePath,
                    //    };
                    //}


                    var outputFile = file.ShouldFinalize ? filePath : currentTempFilePath;


                    return new LocalTemplateInfo
                    {
                        Id = ttTempFilePath + "__" + Guid.NewGuid(),
                        LocalParameters = localParameters,
                        InputFilePath = ttTempFilePath,
                        OutputFilePath = outputFile,
                        ShouldOverride = file.ShouldOverWrite,
                        TemplateContent = processedText,
                        Sections = foundSections,
                        TemplateSections = file.TemplateSections,
                        ListOfTokenInfosUsedForPath = listOfTokenInfos
                    };
                    //var result = await _evalService.EvaluateTemplate(new EvalutateTemplateInput
                    //{
                    //    Code = finalReadyText,
                    //    Parameters = combinedParameters,
                    //    InputFile = ttTempFilePath,
                    //    OutputFile = outputFile,
                    //});
                }

                return null;
            }).Select(selector: x => x.Result).Where(predicate: x => x != null).ToList();

            return new ProcessPathsOutput
            {
                LocalTemplateInfos = localTemplateInfos
            };
        }


        public record ProcessPathsOutput
        {
            public List<LocalTemplateInfo> LocalTemplateInfos { get; set; }
        }
    }
}