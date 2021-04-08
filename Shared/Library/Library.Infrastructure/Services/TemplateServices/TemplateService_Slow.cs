//using Mono.TextTemplating;
//using Library.Core.Infrastructure.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;
//using Library.Core.Infrastructure.Services.PathServices;
//using System;
//using System.CodeDom.Compiler;
//using System.Collections.Generic;
//using System.Diagnostics;
//using System.IO;
//using System.Linq;
//using System.Runtime.Serialization;
//using System.Threading;
//using System.Threading.Tasks;

//namespace Library.Core.Infrastructure.Services.TemplateServices
//{

//    public static class AAA
//    {
//        public static Task WaitForExitAsync(this Process process,
//        CancellationToken cancellationToken = default(CancellationToken))
//        {
//            if (process.HasExited) return Task.CompletedTask;

//            var tcs = new TaskCompletionSource<object>();
//            process.EnableRaisingEvents = true;
//            process.Exited += (sender, args) => tcs.TrySetResult(null);
//            if (cancellationToken != default(CancellationToken))
//                cancellationToken.Register(() => tcs.SetCanceled());

//            return process.HasExited ? Task.CompletedTask : tcs.Task;
//        }
//    }

//    public class TemplateService : ITemplateService
//    {
//        private readonly PathService _pathService;
//        public TemplateService(PathService PathSetupService)
//        {
//            _pathService = PathSetupService;
//        }


//        public record GetRequiredAssemblyPathsInput
//        {
//            public string ProjectName { get; set; }
//        }
//        public record GetRequiredAssemblyPathsOutput
//        {
//            public List<string> Payload { get; set; }
//        }
//        public GetRequiredAssemblyPathsOutput GetRequiredAssemblyPaths()
//        {
//            var humanizerAssemblyPath = _pathService.GetHumanizerAssemblyPath().Payload;

//            var assembyPaths = new List<string>
//            {
//                humanizerAssemblyPath,
//                "System.Collections",
//                "System.Xml.ReaderWriter",
//                "NetStandard",
//                "System.Core",
//                "System.Runtime",
//                "System.Xml",
//                "System.Console",
//                "System.Runtime.Serialization",


//                typeof(DataContractAttribute).Assembly.Location,
//                typeof(DataContractSerializer).Assembly.Location,
//                typeof(System.Text.RegularExpressions.Regex).Assembly.Location,

//                //typeof(DataContractAttribute).Assembly.Location,
//                //typeof(DataContractSerializer).Assembly.Location,
//                //typeof(System.Text.RegularExpressions.Regex).Assembly.Location,
//                //automapperAssemblyPath,
//                //dynamicExpressoPath,
//                //Library.SharedAssemblyPath,
//                //Library.InfrastructureAssemblyPath,
//                //typeof(Uri).Assembly.Location,
//                //typeof(List<>).Assembly.Location,
//              //typeof(XmlReader).Assembly.Location,

//            };

//            return new GetRequiredAssemblyPathsOutput { Payload = assembyPaths };
//        }


//        public record GetUsedNamepacesOutput
//        {
//            public List<string> Payload { get; set; }
//        }
//        public GetUsedNamepacesOutput GetUsedNamepaces()
//        {
//            var namespaces = new List<string>
//            {
//                "System.Text.RegularExpressions",
//                "Humanizer",
//                "System",
//                "System.Xml",
//                "System.Collections",
//                "System.Collections.Generic",
//                "System.Text",
//                "System.IO",
//                "System.Linq",
//                "System.Runtime",
//                "System.Runtime.Serialization",
//                "System.Reflection",
//                "System.Threading.Tasks"
//            };


//            return new GetUsedNamepacesOutput { Payload = namespaces };
//        }


//        public record ParseTemplateInput
//        {
//            public string InputFile { get; init; }
//            public bool PreserveInputOnSucess { get; init; } = true;
//            public bool PreserveOutputOnSucess { get; init; } = true;
//            public string InputContent { get; init; }
//            public string OutputFile { get; init; }
//        }

//        public record ParseTemplateOutput
//        {
//            public bool Success { get; init; }
//            public string OutputContent { get; set; }

//            public string OutputFile { get; init; }

//            public CompilerErrorCollection Errors { get; init; }
//        }


//        public async Task<ParseTemplateOutput> ParseTemplate(ParseTemplateInput input)
//        {

//            var inputFile = input.InputFile;
//            var inputContent = input.InputContent;
//            var outputFile = input.OutputFile;


//            var generator = new TemplateGenerator();
//            var assembyPaths = GetRequiredAssemblyPaths().Payload;
//            generator.Refs.AddRange(assembyPaths);

//            var namespaces = GetUsedNamepaces().Payload;
//            generator.Imports.AddRange(namespaces);


//            var tempFolder = _pathService.GetCurrentProjectPath().ProjectDirPath;

//            var newGuid = Guid.NewGuid();

//            var preFileName = DateTime.Now.Ticks.ToString() + "__" + Thread.CurrentThread.ManagedThreadId.ToString() + "__" + newGuid;
//            var pathPre = Path.Combine(tempFolder, "Temp");


//            if (string.IsNullOrEmpty(inputFile))
//            {
//                inputFile = Path.Combine(pathPre, preFileName + ".input.tt.temp.txt");
//            }
//            else
//            {
//                preFileName = inputFile;
//            }

//            if (string.IsNullOrEmpty(outputFile))
//            {
//                outputFile = Path.Combine(pathPre, preFileName + ".output.tt.temp.txt");
//            }


//            if (!string.IsNullOrEmpty(inputContent))
//            {
//                var parentDir = Directory.GetParent(inputFile).FullName;
//                if (!Directory.Exists(parentDir))
//                {
//                    Directory.CreateDirectory(parentDir);
//                }

//                File.WriteAllText(inputFile, inputContent);
//            }


//            var success = generator.ProcessTemplate(inputFile, inputContent, ref outputFile,  out string outputContent);

//            if (success)
//            {
//                if (!input.PreserveInputOnSucess)
//                {
//                    File.Delete(inputFile);
//                }
//                else
//                {

//                }

//                if (input.PreserveOutputOnSucess)
//                {
//                    File.WriteAllText(outputFile, outputContent);
//                }
//            }
//            else
//            {

//                var errorFile = Path.Combine(pathPre, preFileName + ".error.txt");
//                File.WriteAllText(errorFile, outputContent);
//                throw new Exception();
//            }

//            return new ParseTemplateOutput
//            {
//                Success = success,
//                OutputContent = outputContent
//            };


//        }
//    }
//}

