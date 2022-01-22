//using SetupLibrary.Core.Infrastructure.Models;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Text.RegularExpressions;
//using System.Threading.Tasks;

//namespace SetupLibrary.Core.Infrastructure.Services.CodeGeneratorServices
//{
//    public partial class CodeGeneratorService
//    {
//        public record LocalTemplateInfo
//        {
//            public string Id { get; set; }
//            public string InputFilePath { get; set; }
//            public string OutputFilePath { get; set; }
//            public string TemplateContent { get; set; }
//            public string TargetFileContent { get; set; }
//            public Dictionary<string, object> LocalParameters { get; set; }
//            public bool ShouldOverride { get; set; }
//            public List<string> Sections { get; set; }
//            public List<string> TemplateSections { get; set; }
//            public List<TemplateTokenInfo> ListOfTokenInfosUsedForPath { get; set; }

//        }

//        public record ProcessFileInput
//        {
//            public TemplateFile File { get; init; }
//            public Dictionary<string, object> Parameters { get; init; }
//        }
//        public record ProcessFileOutput
//        {
//            public List<LocalTemplateInfo> LocalTemplateInfos { get; set; }
//        }

//        public async Task<ProcessFileOutput> ProcessFile(ProcessFileInput input)
//        {
//            var file = input.File;
//            var context = new TemplateContext();
//            context.File = file;
//            context.Project = file.Project;
//            var localParameters = file.LocalParameters;
//            var combinedParameters = input.Parameters.Concat(localParameters).ToDictionary(parameter => parameter.Key, parameter => parameter.Value);

//            var codeType = file.CodeType;

//            var textString = file.Content;

//            var templateSymbols = TemplateCodeType.GetAllTemplateSymbols();


//            var pathMaxLength = Path.GetFileName(file.Path).Length;

//            var preparedTextString = codeType.RemoveTemplatePostfix(textString, false);
//            var contentMatches = Regex.Matches(preparedTextString,
//                codeType.GetTemplateName(@$"(?<Name>([a-zA-Z]|\d|{Regex.Escape(codeType.ContentNamePrefix)}|{Regex.Escape(codeType.ContentNamePostfix)}|{Regex.Escape(codeType.PropertyPathSeparatorForContent)})+)", false),
//                RegexOptions.Multiline);

//            var contentNameMatches = contentMatches.SelectMany(m =>
//            {
//                var nameCandidate = m.Groups["Name"].Value;

//                var splitted = Regex.Split(nameCandidate, @$"(?:{Regex.Escape(codeType.ContentNamePrefix)}|{Regex.Escape(codeType.ContentNamePostfix)})");

//                return splitted.ToList();
//            }).Distinct().ToList();


//            var preparedPathString = codeType.RemoveTemplatePostfix(file.Path, true);
//            var pathMatches = Regex.Matches(preparedPathString,
//                codeType.GetTemplateName(@$"(?<Name>([a-zA-Z]|\d|{Regex.Escape(codeType.PathNamePrefix)}|{Regex.Escape(codeType.PathNamePostfix)}|{Regex.Escape(codeType.PropertyPathSeparatorForPath)})+)", true),
//                RegexOptions.Multiline);

//            var pathNameMatches = pathMatches.SelectMany(m =>
//            {
//                var nameCandidate = m.Groups["Name"].Value;

//                var splitted = Regex.Split(nameCandidate, @$"(?:{Regex.Escape(codeType.PathNamePrefix)}|{Regex.Escape(codeType.PathNamePostfix)})");
//                return splitted.ToList();
//            }).Distinct().ToList();

//            var combinedMatches = contentNameMatches.Concat(pathNameMatches).Distinct().ToList();

//            int contentMax = (contentNameMatches.OrderByDescending(x => x.Length).FirstOrDefault()?.Length ?? 0);
//            int pathMax = (pathNameMatches.OrderByDescending(x => x.Length).FirstOrDefault()?.Length ?? 0);

//            var matchingTokenInfosForPath = combinedParameters.SelectMany(paramter =>
//            {
//                var matchingNames = GetMatchingNames(
//                    pathMax,
//                    true,
//                    pathNameMatches,
//                    paramter.Value.GetType(),
//                    codeType,
//                    file.Path,
//                    null,
//                    new List<string> { });

//                return matchingNames;
//            }).ToList();

//            var matchingTokenInfosForContent = combinedParameters.SelectMany(paramter =>
//            {
//                var matchingNames = GetMatchingNames(
//                    contentMax,
//                    false,
//                    contentNameMatches,
//                    paramter.Value.GetType(),
//                    codeType,
//                    textString,
//                    null,
//                    new List<string> { });

//                return matchingNames;
//            }).ToList();


//            var tokenInfosForPath = matchingTokenInfosForPath.SelectMany(tokenInfo =>
//            {
//                return combinedParameters.SelectMany(paramter =>
//                {
//                    var toReturn = GetAllMatchingNameToTokenInfoDic(
//                             context,
//                             true,
//                             tokenInfo,
//                             codeType,
//                             file.Path,
//                             paramter.Value,
//                             null,
//                             new List<string> { });
//                    return toReturn;
//                });
//            }).ToList();

//            var tokenInfosForContent = matchingTokenInfosForContent.SelectMany(tokenInfo =>
//            {
//                return combinedParameters.SelectMany(paramter =>
//                {
//                    var toReturn = GetAllMatchingNameToTokenInfoDic(
//                            context,
//                            false,
//                            tokenInfo,
//                            codeType,
//                            textString,
//                            paramter.Value,
//                            null,
//                            new List<string> { });
//                    return toReturn;
//                });
//            }).ToList();


//            var finalList = new List<TemplateTokenInfo>();

//            var combinedTokenInfos = tokenInfosForPath.Concat(tokenInfosForContent).GroupBy(token =>
//            {
//                var joinedIds = string.Join(",", token.Ids.Select(g => g.ToString()));

//                return joinedIds;
//            }).Select(x => x.First()).ToList();


//            var groupedIdTokens = combinedTokenInfos.ToLookup(x => x.GroupId).ToDictionary(x => x.Key, x => x.ToList());

//            var groupedTokens = combinedTokenInfos.ToLookup(x => x.Id).ToDictionary(x => x.Key, x =>
//            {
//                var final = x.SelectMany(y =>
//                     {
//                         var toReturn = y.GroupIds.SelectMany(groupId =>
//                         {
//                             if (groupedIdTokens.TryGetValue(groupId, out var o))
//                             {
//                                 return o;
//                             }
//                             else
//                             {
//                                 return new List<TemplateTokenInfo> { };
//                             }

//                         }).ToList();

//                         return toReturn;
//                     }).ToList();

//                return final;

//            });

//            foreach (var tokenInfo in combinedTokenInfos)
//            {
//                var found = false;
//                for (int i = 0; i < finalList.Count(); i++)
//                {
//                    var finalListItem = finalList[i];

//                    var candidateId = string.Join(",", tokenInfo.Ids.Select(g => g.ToString()));
//                    var itemId = string.Join(",", finalListItem.Ids.Select(g => g.ToString()));
//                    if (candidateId.StartsWith(itemId))
//                    {
//                        found = true;

//                        finalList[i] = tokenInfo;

//                        break;
//                    }
//                }

//                if (!found)
//                {
//                    finalList.Add(tokenInfo);
//                }
//            }


//            var listOfList = finalList.Select(x =>
//            {
//                if (groupedTokens.TryGetValue(x.Id, out var o))
//                {
//                    return o;
//                }

//                return new List<TemplateTokenInfo>();
//            }).ToList();

//            var filteredListOfList = listOfList.Where(list =>
//            {
//                var pathMatches = matchingTokenInfosForPath.All(m => list.Any(l => l.CurrentName == m.CurrentName));
//                var contentMatches = matchingTokenInfosForContent.All(m => list.Any(l => l.CurrentName == m.CurrentName));

//                return pathMatches && contentMatches;
//            }).ToList();

//            if (filteredListOfList.Count() == 0)
//            {
//                filteredListOfList = new List<List<TemplateTokenInfo>> { new List<TemplateTokenInfo>() };
//            }

//            var groupedFilteredListOfList = filteredListOfList.GroupBy(list =>
//            {
//                var orderedList = list.OrderBy(x => x.CurrentName).ThenBy(x => x.Value).ToList();
//                var tokenStrs = orderedList.Select(token => (token.CurrentName, token.Value).ToString());
//                var toReturn = string.Join(",", tokenStrs);
//                return toReturn;
//            }).Select(x => x.First()).ToList();

//            //listOfList = listOfList.Take(3).ToList();

//            //listOfList.ForEach(async listOfTokenInfos =>
//            var localTemplateInfos = groupedFilteredListOfList.Select(listOfTokenInfos =>
//            {
//                var listOfListBackup = groupedFilteredListOfList;

//                var filePath = file.Path;

//                var directories = new List<TemplateDirectory>();
//                var templateDirectoryPath = Directory.GetParent(file.TemplatePath).FullName;
//                var path = file.Path;
//                while (templateDirectoryPath != file.Project.DirPath)
//                {
//                    path = Directory.GetParent(path).FullName;

//                    var isTemplateDir = templateSymbols.Any(t =>
//                    {
//                        return templateDirectoryPath.EndsWith(codeType.GetTemplateSymbolName(t, true));
//                    });

//                    var shouldOverWrite = false;

//                    if (isTemplateDir)
//                    {
//                        shouldOverWrite = TemplateCodeType.TemplateFileOverWriteSymbols.Any(t =>
//                        {
//                            return templateDirectoryPath.EndsWith(codeType.GetTemplateSymbolName(t, true)); ;
//                        });
//                    }

//                    var toAdd = new TemplateDirectory
//                    {
//                        ShouldOverwrite = shouldOverWrite,
//                        Path = path,
//                        TemplatePath = templateDirectoryPath,
//                    };

//                    directories.Add(toAdd);

//                    templateDirectoryPath = Directory.GetParent(templateDirectoryPath).FullName;
//                }

//                directories.Reverse();

//                var ProcessFilePathsAndContentsResult = ProcessFilePathsAndContents(new ProcessFilePathsAndContentsInput()
//                {
//                    Directories = directories,
//                    Path = filePath,
//                    TextString = textString,
//                    CodeType = codeType,
//                    TemplateInfos = listOfTokenInfos,
//                    File = file
//                });

//                var processedText = ProcessFilePathsAndContentsResult.ProcessedText;
//                var foundSections = ProcessFilePathsAndContentsResult.FoundSections;
//                var foundTemplateSections = ProcessFilePathsAndContentsResult.FoundTemplateSections;

//                filePath = ProcessFilePathsAndContentsResult.Path;

//                if (file.Path != file.TemplatePath)
//                {
//                    var currentTempFilePath = filePath + ".temp.txt";
//                    var ttTempFilePath = filePath + ".tt.temp.txt";
//                    var tempXmlPath = filePath + ".xml.temp.txt";

//                    var dir = Path.GetDirectoryName(tempXmlPath);

//                    if (!Directory.Exists(dir))
//                    {
//                        Directory.CreateDirectory(dir);
//                    }

//                    //if (Track.ProcessedFileToDic.TryGetValue(tempXmlPath, out var o))
//                    //{
//                    //    throw new Exception("????????????" + tempXmlPath);
//                    //}
//                    //else
//                    //{
//                    //    Track.ProcessedFileToDic[tempXmlPath] = new ConcurrentDictionary<string, object>
//                    //    {
//                    //        ["currentTempFilePath"] = currentTempFilePath,
//                    //        ["tempXmlPath"] = tempXmlPath,
//                    //        ["ttTempFilePath"] = ttTempFilePath,
//                    //        ["listOfTokenInfos"] = listOfTokenInfos,
//                    //        ["TemplatePath"] = file.TemplatePath,
//                    //        ["file"] = file,
//                    //        ["OriginalTemplatePath"] = file.TemplatePath,
//                    //    };
//                    //}


//                    var outputFile = file.ShouldFinalize ? filePath : currentTempFilePath;


//                    return new LocalTemplateInfo
//                    {
//                        Id = ttTempFilePath + "__" + Guid.NewGuid().ToString(),
//                        LocalParameters = localParameters,
//                        InputFilePath = ttTempFilePath,
//                        OutputFilePath = outputFile,
//                        ShouldOverride = file.ShouldOverWrite,
//                        TemplateContent = processedText,
//                        Sections = foundSections,
//                        TemplateSections = foundTemplateSections,
//                    };
//                    //var result = await _evalService.EvaluateTemplate(new EvalutateTemplateInput
//                    //{
//                    //    Code = finalReadyText,
//                    //    Parameters = combinedParameters,
//                    //    InputFile = ttTempFilePath,
//                    //    OutputFile = outputFile,
//                    //});

//                }

//                return null;
//            }).Where(x => x != null).ToList();

//            return new ProcessFileOutput
//            {
//                LocalTemplateInfos = localTemplateInfos
//            };
//        }
//    }
//}

