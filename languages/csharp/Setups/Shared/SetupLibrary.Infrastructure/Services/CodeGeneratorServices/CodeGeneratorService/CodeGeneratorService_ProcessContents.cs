

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
    public partial class CodeGeneratorService
    {
        public async Task<ProcessContentsOutput> ProcessContents(
             TemplateData data,
             List<LocalTemplateInfo> localTemplateInfosForPaths
            )
        {
            var file = data.Context.File;

            var codeType = file.CodeType;

            var toReturn = localTemplateInfosForPaths.SelectMany(selector: localTemplateInfForPath =>
            {
                var text = localTemplateInfForPath.TemplateContent;
                var sections = localTemplateInfForPath.Sections;
                var templateSections = localTemplateInfForPath.TemplateSections;
                var listOfTokenInfosUsedForPath = localTemplateInfForPath.ListOfTokenInfosUsedForPath;


                var preparedTextString = codeType.RemoveTemplatePostfix(inputString: text, isPath: false);
                var contentMatches = Regex.Matches(input: preparedTextString,
                    pattern: codeType.GetTemplateName(
                        inputName:
                        @$"(?<Name>([a-zA-Z]|\d|{Regex.Escape(str: codeType.ContentNamePrefix)}|{Regex.Escape(str: codeType.ContentNamePostfix)}|{Regex.Escape(str: codeType.PropertyPathSeparatorForContent)})+)"),
                    options: RegexOptions.Multiline);

                var contentNameMatches = contentMatches.SelectMany(selector: m =>
                {
                    var nameCandidate = m.Groups[groupname: "Name"].Value;

                    var splitted = Regex.Split(input: nameCandidate,
                        pattern:
                        @$"(?:{Regex.Escape(str: codeType.ContentNamePrefix)}|{Regex.Escape(str: codeType.ContentNamePostfix)})");

                    return splitted.ToList();
                }).Distinct().ToList();

                var contentMax = contentNameMatches.OrderByDescending(keySelector: x => x.Length).FirstOrDefault()
                    ?.Length ?? 0;


                var matchingTokenInfosForContent = GetMatchingNames(
                    maxLength: contentMax,
                    isPath: true,
                    candidates: contentNameMatches,
                    objectType: data.GetType(),
                    codeType: codeType,
                    text: file.Path,
                    parentName: null,
                    parentPropertyPaths: new List<string>());



                var tokenInfosForContent = matchingTokenInfosForContent.SelectMany(selector: tokenInfo =>
                {
                    var toReturn = GetAllMatchingNameToTokenInfoDicWithConstraint(
                             context: data.Context,
                             isPath: true,
                             matchingToken: tokenInfo,
                             codeType: codeType,
                             text: file.Path,
                             obj: tokenInfo,
                             constraints: null,
                             parentName: null,
                             parentPropertyPaths: new List<string>());

                    return toReturn;
                }).ToList();



                var finalList = new List<TemplateTokenInfo>();

                var combinedTokenInfos = tokenInfosForContent.GroupBy(keySelector: token =>
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

                var filteredListOfList = listOfList.Where(predicate: list => { return true; }).ToList();

                if (filteredListOfList.Count() == 0) filteredListOfList = new List<List<TemplateTokenInfo>> { new() };

                var groupedFilteredListOfList = filteredListOfList.GroupBy(keySelector: list =>
                {
                    var orderedList = list.OrderBy(keySelector: x => x.CurrentName).ThenBy(keySelector: x => x.Value)
                        .ToList();
                    var tokenStrs = orderedList.Select(selector: token => (token.CurrentName, token.Value).ToString());
                    var toReturn = string.Join(separator: ",", values: tokenStrs);
                    return toReturn;
                }).Select(selector: x => x.First()).ToList();

                var max = groupedFilteredListOfList.Max(selector: x => x.Count());
                groupedFilteredListOfList = groupedFilteredListOfList.Where(predicate: x => x.Count() == max).ToList();

                //listOfList = listOfList.Take(3).ToList();

                //listOfList.ForEach(async listOfTokenInfos =>
                var localTemplateInfos = groupedFilteredListOfList.Select(selector: listOfTokenInfos =>
                {
                    var listOfListBackup = groupedFilteredListOfList;

                    var filePath = file.Path;

                    var directories = new List<TemplateDirectory>();
                    var templateDirectoryPath = Directory.GetParent(path: file.TemplatePath).FullName;
                    var path = file.Path;
                    if (templateDirectoryPath != file.Project.DirPath)
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
                                        templateSymbol: file.Project.GeneratorSymbol.Pascalize(), isPath: true))
                                || templateDirectoryPath.EndsWith(
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

                    var ProcessContentsPathsAndContentsResult = ProcessContentsBody(
                        directories: directories,
                        text: text,
                        codeType: codeType,
                        templateInfos: listOfTokenInfos,
                        file: file
                    );

                    var processedText = ProcessContentsPathsAndContentsResult.ProcessedText;


                    return new LocalTemplateInfo
                    {
                        Id = localTemplateInfForPath.InputFilePath + "__" + Guid.NewGuid(),
                        Context = file.Context,
                        InputFilePath = localTemplateInfForPath.InputFilePath,
                        OutputFilePath = localTemplateInfForPath.OutputFilePath,
                        ShouldOverride = file.ShouldOverWrite,
                        TemplateContent = processedText,
                        Sections = sections,
                        TemplateSections = templateSections
                    };
                }).Where(predicate: x => x != null).ToList();

                return localTemplateInfos;
            });


            return new ProcessContentsOutput
            {
                LocalTemplateInfos = toReturn.ToList()
            };
        }


        public record ProcessContentsOutput
        {
            public List<LocalTemplateInfo> LocalTemplateInfos { get; set; }
        }
    }
}