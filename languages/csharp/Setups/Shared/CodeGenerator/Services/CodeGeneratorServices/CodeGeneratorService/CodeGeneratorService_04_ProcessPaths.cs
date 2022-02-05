

using CodeGenerator.Models;
using Humanizer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CodeGenerator.Services.CodeGeneratorServices
{
    public record LocalTemplateInfo<TData>
    {
        public string Id { get; set; }
        public string InputFilePath { get; set; }
        public string OutputFilePath { get; set; }
        public string TemplateContent { get; set; }
        public string TargetFileContent { get; set; }
        public TData Data { get; set; }
        public bool ShouldOverride { get; set; }
        public List<string> Sections { get; set; }
        public List<TemplateSection> TemplateSections { get; set; }
        public List<TemplateTokenInfo<TData>> ListOfTokenInfosUsedForPath { get; set; }
    }

    public partial class CodeGeneratorService<TData, TFile>
    {
        public async Task<ProcessPathsOutput<TData>> ProcessPaths(
            TFile file,
            TData data)
        {
            var codeType = file.CodeType;

            var textString = file.Content;

            var pathMaxLength = Path.GetFileName(path: file.ProcessedFilePath).Length;

            var preparedPathString = codeType.RemoveTemplatePostfix(inputString: file.ProcessedFilePath, isPath: true);

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


            var matchingTokenInfosForPath = GetMatchingNames(
                maxLength: pathMax,
                isPath: true,
                candidates: pathNameMatches,
                objectType: data.GetType(),
                codeType: codeType,
                text: file.ProcessedFilePath,
                parentName: null,
                parentPropertyPaths: new List<string>());


            var tokenInfosForPath = matchingTokenInfosForPath.SelectMany(selector: tokenInfo =>
            {
                var toReturn = GetAllMatchingNameToTokenInfoDicWithConstraint(
                         isPath: true,
                         matchingToken: tokenInfo,
                         codeType: codeType,
                         text: file.ProcessedFilePath,
                         obj: data,
                         constraints: null,
                         parentName: null,
                         parentPropertyPaths: new List<string>());

                return toReturn;
            }).ToList();

            var finalList = new List<TemplateTokenInfo<TData>>();

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
                            return new List<TemplateTokenInfo<TData>>();
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

                return new List<TemplateTokenInfo<TData>>();
            }).ToList();

            var filteredListOfList = listOfList.Where(predicate: list =>
            {
                var pathMatches =
                    matchingTokenInfosForPath.All(predicate: m =>
                        list.Any(predicate: l => l.CurrentName == m.CurrentName));

                return pathMatches;
            }).ToList();

            if (filteredListOfList.Count() == 0 && pathNameMatches.Count() == 0) filteredListOfList = new List<List<TemplateTokenInfo<TData>>> { new() };

            var groupedFilteredListOfList = filteredListOfList.GroupBy(keySelector: list =>
            {
                var orderedList = list.OrderBy(keySelector: x => x.CurrentName).ThenBy(keySelector: x => x.Value)
                    .ToList();
                var tokenStrs = orderedList.Select(selector: token => (token.CurrentName, token.Value).ToString());
                var toReturn = string.Join(separator: ",", values: tokenStrs);
                return toReturn;
            }).Select(selector: x => x.First()).ToList();


            var localTemplateInfos = groupedFilteredListOfList.Select(selector: async listOfTokenInfos =>
            {
                var listOfListBackup = groupedFilteredListOfList;

                var filePath = file.ProcessedFilePath;

                var directories = new List<TemplateDirectory>();
                var templateDirectoryPath = Directory.GetParent(path: file.FilePath).FullName;
                var path = file.ProcessedFilePath;


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

                if (file.ProcessedFilePath != file.FilePath)
                {
                    var dir = Path.GetDirectoryName(path: filePath);

                    return new LocalTemplateInfo<TData>
                    {
                        Id = Guid.NewGuid().ToString(),
                        Data = data,
                        InputFilePath = file.FilePath,
                        OutputFilePath = filePath,
                        ShouldOverride = file.ShouldOverWrite,
                        TemplateContent = processedText,
                        Sections = foundSections,
                        TemplateSections = file.TemplateSections,
                        ListOfTokenInfosUsedForPath = listOfTokenInfos
                    };
                }

                return null;
            }).Select(selector: x => x.Result).Where(predicate: x => x is not null).ToList();

            return new ProcessPathsOutput<TData>
            {
                LocalTemplateInfos = localTemplateInfos
            };
        }


        public record ProcessPathsOutput<TData>
        {
            public List<LocalTemplateInfo<TData>> LocalTemplateInfos { get; set; }
        }
    }
}