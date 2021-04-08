

using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public async Task<EvaluateStatementsOutput<T>> EvaluateStatements<T>(
            string code,
            dynamic parameters,
            string resultVariableName = null
        )
        {
            var tempFolder = _pathService.GetCurrentProjectPath().ProjectDirPath;
            var newGuid = Guid.NewGuid();
            var preFileName = DateTime.Now.Ticks + "__" + Thread.CurrentThread.ManagedThreadId +
                              "__" + newGuid;
            var pathPre = Path.Combine(path1: tempFolder, path2: "Temp");
            var xmlPreFilePath = Path.Combine(path1: pathPre, path2: preFileName + ".input.");
            var inputFile = Path.Combine(path1: pathPre, path2: preFileName + ".input.tt.temp.txt");
            var outputFile = Path.Combine(path1: pathPre, path2: preFileName + ".output.tt.temp.txt");
            var parsedParameters = (Dictionary<string, object>) parameters;

            var processOutput = await Process(
                xmlFilePathPrefix: xmlPreFilePath,
                bodyBuilder: async builder =>
                {
                    var statements = code;
                    var returnVariableName = resultVariableName;
                    builder.Append(value: statements);
                    builder.Append(
                        value: @$"
<#
var resultXml = """";
using(MemoryStream memoryStream = new MemoryStream())
using(StreamReader reader = new StreamReader(memoryStream)) {{
    DataContractSerializer serializer = new DataContractSerializer({returnVariableName}.GetType());
    serializer.WriteObject(memoryStream, {returnVariableName});
    memoryStream.Position = 0;
    resultXml = reader.ReadToEnd();
    WriteLine(resultXml);
}}
#>
");

                    return builder;
                },
                templateId: null,
                localTypes: null,
                parametersInput: parsedParameters,
                resultVariableName: resultVariableName
            );


            string inputContent = processOutput.Builder.ToString();


            var result = await _templateService.ParseTemplate(
                inputContent: inputContent,
                inputFile: inputFile,
                outputFile: outputFile,
                preserveInputOnSucess: false,
                preserveOutputOnSucess: false
            );

            if (result.Success)
            {
                var files = Directory.EnumerateFiles(path: pathPre, searchPattern: preFileName + ".input.*");
                foreach (var file in files) File.Delete(path: file);

                using (Stream stream = new MemoryStream())
                {
                    byte[] data = Encoding.UTF8.GetBytes(s: result.OutputContent);
                    stream.Write(buffer: data, offset: 0, count: data.Length);
                    stream.Position = 0;
                    DataContractSerializer deserializer = new(type: typeof(T));
                    var result2 = deserializer.ReadObject(stream: stream);

                    return new EvaluateStatementsOutput<T>
                        {Payload = (T) Convert.ChangeType(value: result2, conversionType: typeof(T))};
                }
            }

            return new EvaluateStatementsOutput<T> {Payload = default};
        }
    }
}