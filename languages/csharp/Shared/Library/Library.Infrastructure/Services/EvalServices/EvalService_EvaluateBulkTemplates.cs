

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public async Task<EvaluateBulkTemplatesOutput> EvaluateBulkTemplates(
            List<EvalCodeRecord> codeRecords,
            dynamic parametersInput,
            List<Type> localTypes,
            bool preserveInputOnSucess = true,
            bool preserveOutputOnSucess = true
        )
        {
            var parameters = (Dictionary<string, object>) parametersInput;
            var nSize = 99999;
            var items = codeRecords;
            var listOfList = new List<List<EvalCodeRecord>>();

            var tempFolder = _pathService.GetCurrentProjectPath().ProjectDirPath;
            var newGuid = Guid.NewGuid();
            var preFileName = DateTime.Now.Ticks + "__" + Thread.CurrentThread.ManagedThreadId +
                              "__" + newGuid;
            var pathPreFolder = Path.Combine(path1: tempFolder, path2: "Temp");
            var xmlPreFilePath = Path.Combine(path1: pathPreFolder, path2: preFileName + ".input.");
            var inputFile = Path.Combine(path1: pathPreFolder, path2: preFileName + ".input.tt.temp.txt");
            var outputFile = Path.Combine(path1: pathPreFolder, path2: preFileName + ".output.tt.temp.txt");
            for (var i = 0; i < items.Count; i += nSize)
                listOfList.Add(item: items.GetRange(index: i, count: Math.Min(val1: nSize, val2: items.Count - i)));

            var results = listOfList.Select(selector: async codeRecords =>
            {
                var dic = codeRecords.ToDictionary(keySelector: x => x.Id);
                var processOutput = await Process(
                    bodyBuilder: async builder =>
                    {
                        var strings = codeRecords.Select(selector: async (codeRecord, i) =>
                        {
                            var code = codeRecord.BodyCode;
                            var contextTemplate = codeRecord.ContextTemplate;

                            var id = codeRecord.Id;

                            var localParameters = codeRecord.LocalParameters;
                            var localTemp = await GetParametersTemplate(
                                template: contextTemplate, xmlFilePathPrefix: xmlPreFilePath);
                            var pre = localTemp.ParametersTemplate;
                            var str =
                                @$"
//%templateBegin: {id}
<# {{ #>
{code}
<# }} #>
//%templateEnd: {id}
";
                            if (code.Contains(value: "Context"))
                                return $"<# {{ #>\n {pre + str} \n<# }} #>";
                            return $"<# {{ #>\n {str} \n<# }} #>";
                        }).Select(selector: x => x.Result);

                        var final = string.Join(separator: '\n', values: strings);

                        builder.Append(value: final);

                        return builder;
                    },
                    templateId: null,
                    parametersInput: parameters,
                    localTypes: localTypes,
                    xmlFilePathPrefix: xmlPreFilePath,
                    resultVariableName: null
                );

                var inputContent = processOutput.Builder.ToString();

                var result = await _templateService.ParseTemplate(
                    inputContent: inputContent,
                    inputFile: inputFile,
                    outputFile: outputFile,
                    preserveInputOnSucess: preserveInputOnSucess,
                    preserveOutputOnSucess: preserveOutputOnSucess
                );

                if (result.Success)
                {
                    if (!preserveInputOnSucess)
                    {
                        var files = Directory.EnumerateFiles(path: pathPreFolder,
                            searchPattern: preFileName + ".input.*");
                        foreach (var file in files) File.Delete(path: file);
                    }

                    var matches = Regex.Matches(input: result.OutputContent,
                        pattern:
                        @"//%templateBegin:\s*(?<TemplateId>.*?)\s*(\r)?\n(?<Body>.*?)//%templateEnd\b.*?((\r)?\n|$)",
                        options: RegexOptions.Singleline).ToList();

                    var processed = matches.Select(selector: match =>
                    {
                        var id = match.Groups[groupname: "TemplateId"].Value;
                        var body = match.Groups[groupname: "Body"].Value.Trim();

                        return new TemplateCodeResult
                        {
                            Id = id,
                            Content = body
                        };
                    }).ToList();

                    return processed;
                }

                return null;
            }).Select(selector: x => x.Result);

            if (results.Any(predicate: result => result == null))
                return new EvaluateBulkTemplatesOutput {Payloads = null};

            var payloads = results.SelectMany(selector: x => x).ToList();

            return new EvaluateBulkTemplatesOutput {Payloads = payloads};
        }
    }
}