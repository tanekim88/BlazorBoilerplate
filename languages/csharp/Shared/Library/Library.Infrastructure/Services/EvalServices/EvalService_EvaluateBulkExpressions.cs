﻿

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public async Task<EvaluateBulkExpressionsOutput<T>> EvaluateBulkExpressions<T>(
            List<ExpressionCodeRecord> expressionRecords,
            dynamic parameters,
            List<Type> localTypes
        )
        {
            var nSize = 99999;
            var items = expressionRecords;

            var parsedParameters = (Dictionary<string, object>) parameters;
            var tempFolder = _pathService.GetCurrentProjectPath().ProjectDirPath;
            var newGuid = Guid.NewGuid();
            var preFileName = DateTime.Now.Ticks + "__" + Thread.CurrentThread.ManagedThreadId +
                              "__" + newGuid;
            var pathPre = Path.Combine(path1: tempFolder, path2: "Temp");
            var xmlPreFilePath = Path.Combine(path1: pathPre, path2: preFileName + ".input.");
            var inputFile = Path.Combine(path1: pathPre, path2: preFileName + ".input.tt.temp.txt");
            var outputFile = Path.Combine(path1: pathPre, path2: preFileName + ".output.tt.temp.txt");
            var listOfList = new List<List<ExpressionCodeRecord>>();

            for (var i = 0; i < items.Count; i += nSize)
                listOfList.Add(item: items.GetRange(index: i, count: Math.Min(val1: nSize, val2: items.Count - i)));

            var results = listOfList.Select(selector: async codeRecords =>
            {
                var processOutput = await Process(
                    bodyBuilder: async builder =>
                    {
                        var strings = codeRecords.Select(selector: async (codeRecord, i) =>
                        {
                            var code = codeRecord.Expression;
                            var id = codeRecord.Id;
                            var localParameters = codeRecord.LocalParameters;
                            var contextTemplate = codeRecord.ContextTemplate;

                            var localTemp = await GetParametersTemplate(
                                parameters: null,
                                template: contextTemplate,
                                xmlFilePathPrefix: xmlPreFilePath,
                                shouldInlineXml: false);
                            var pre = localTemp.ParametersTemplate;

                            var str =
                                @$"
//%templateBegin: {id}
<#
{{
    var obj = {code};
    using(MemoryStream memoryStream = new MemoryStream())
    using(StreamReader reader = new StreamReader(memoryStream)) {{
        var objType = obj.GetType();
        var key = ""DataContractSerializer_"" + objType.FullName;
        DataContractSerializer serializer = null;

        if(Cache.TryGetValue(key, out object value)){{
            serializer = (System.Runtime.Serialization.DataContractSerializer)value;
        }} else {{
            serializer = new DataContractSerializer(objType);
            Cache.TryAdd(key, serializer);
        }}

        serializer.WriteObject(memoryStream, obj);
        memoryStream.Position = 0;
        WriteLine(reader.ReadToEnd());
    }}
}} #>
//%templateEnd: {id}
";
                            if (code.Contains(value: "Context"))
                                return $"<# {{ #>\n {pre + str} \n<# }} #>";
                            return $"<# {{ #>\n {str} \n<# }} #>";
                        }).Select(selector: r => r.Result);


                        var final = string.Join(separator: '\n', values: strings);
                        builder.Append(value: final);


                        return builder;
                    },
                    templateId: null,
                    parametersInput: parsedParameters,
                    localTypes: localTypes,
                    resultVariableName: null,
                    xmlFilePathPrefix: xmlPreFilePath
                );

                var inputContent = processOutput.Builder.ToString();
                //File.WriteAllText(@"C:\Project\Apps\Packages\SharedPackages\Library.Core.Infrastructure.Package\Library.Core.Infrastructure\runiF.txt", inputContent);

                var result = await _templateService.ParseTemplate(
                    inputFile: inputFile,
                    inputContent: inputContent,
                    outputFile: outputFile,
                    preserveInputOnSucess: false,
                    preserveOutputOnSucess: false
                );

                if (result.Success)
                {
                    var files = Directory.EnumerateFiles(path: pathPre, searchPattern: preFileName + ".input.*");
                    foreach (var file in files) File.Delete(path: file);


                    var matches = Regex.Matches(input: result.OutputContent,
                        pattern:
                        @"//%templateBegin:\s*(?<TemplateId>.*?)\s*(\r)?\n(?<Body>.*?)//%templateEnd\b.*?((\r)?\n|$)",
                        options: RegexOptions.Singleline).ToList();

                    var processed = matches.Select(selector: match =>
                    {
                        var id = match.Groups[groupname: "TemplateId"].Value;
                        var body = match.Groups[groupname: "Body"].Value;

                        using (Stream stream = new MemoryStream())
                        {
                            byte[] data = Encoding.UTF8.GetBytes(s: body);
                            stream.Write(buffer: data, offset: 0, count: data.Length);
                            stream.Position = 0;
                            DataContractSerializer deserializer = new(type: typeof(T));
                            var result2 = (T) deserializer.ReadObject(stream: stream);

                            return new ExpressionCodeResult<T>
                            {
                                Id = id,
                                Result = result2
                            };
                        }
                    }).ToList();

                    return processed;
                }

                return null;
            }).Select(selector: x => x.Result);

            if (results.Any(predicate: result => result == null))
                return new EvaluateBulkExpressionsOutput<T> {Payloads = null};

            var payloads = results.SelectMany(selector: x => x).ToList();

            return new EvaluateBulkExpressionsOutput<T> {Payloads = payloads};
        }
    }
}