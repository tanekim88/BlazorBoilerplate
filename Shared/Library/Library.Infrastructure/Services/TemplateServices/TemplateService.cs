//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Template" && service.Name == "Template")

//%t:begin Intro


//%t:end Intro

//%s:begin Header

//%s:end Header




using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;
using static SharedLibrary.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces.ISharedTemplateService;



namespace Library.Infrastructure.Services.TemplateServices
{
    public /*%s:begin Partial*/ /*%s:end Partial*/ class TemplateService
        : /*%s:begin BaseClass*/ /*%s:end BaseClass*/
            ITemplateService
    {
        /*%s:begin Properties*/
        private readonly IPathService _pathService;
        /*%s:end Properties*/

        public TemplateService(
            /*%s:begin ConstructorParameters*/
            IPathService PathService
        /*%s:end ConstructorParameters*/
        )
        {
            /*%s:begin ConstructorBody*/
            _pathService = PathService;
            /*%s:end ConstructorBody*/
        }


        //%s:begin Body
        //public static class AAA
        //{
        //    public static Task WaitForExitAsync(this Process process,
        //    CancellationToken cancellationToken = default(CancellationToken))
        //    {
        //        if (process.HasExited) return Task.CompletedTask;

        //        var tcs = new TaskCompletionSource<object>();
        //        process.EnableRaisingEvents = true;
        //        process.Exited += (sender, args) => tcs.TrySetResult(null);
        //        if (cancellationToken != default(CancellationToken))
        //            cancellationToken.Register(() => tcs.SetCanceled());

        //        return process.HasExited ? Task.CompletedTask : tcs.Task;
        //    }
        //}


        public GetRequiredAssemblyPathsOutput GetRequiredAssemblyPaths()
        {
            var humanizerAssemblyPath = _pathService.GetHumanizerAssemblyPath().Payload;

            var assembyPaths = new List<string>
            {
                humanizerAssemblyPath,
                "System.Collections",
                "System.Xml.ReaderWriter",
                "NetStandard",
                "System.Core",
                "System.Runtime",
                "System.Xml",
                "System.Console",
                "System.Runtime.Serialization"
            };

            return new GetRequiredAssemblyPathsOutput { Payload = assembyPaths };
        }


        public GetUsedNamepacesOutput GetUsedNamepaces()
        {
            var namespaces = new List<string>
            {
                "System.Text.RegularExpressions",
                "Humanizer",
                "System",
                "System.Xml",
                "System.Collections",
                "System.Collections.Generic",
                "System.Text",
                "System.IO",
                "System.Linq",
                "System.Runtime",
                "System.Runtime.Serialization",
                "System.Reflection",
                "System.Threading.Tasks"
            };


            return new GetUsedNamepacesOutput { Payload = namespaces };
        }

        public async Task<ParseTemplateOutput> ParseTemplate(
            string inputFile,
            string inputContent,
            string outputFile,
            bool preserveInputOnSucess = true,
            bool preserveOutputOnSucess = true
        )
        {
            string? outputContent = null;

            var assembyPaths = GetRequiredAssemblyPaths().Payload;

            var assemblyPathStr =
                string.Join(separator: " ", values: assembyPaths.Select(selector: x => $@" -r ""{x}"""));

            var namespaces = GetUsedNamepaces().Payload;

            var namespacesStr = string.Join(separator: " ", values: namespaces.Select(selector: x => $@" -u {x}"));

            var tempFolder = _pathService.GetCurrentProjectPath().ProjectDirPath;

            var newGuid = Guid.NewGuid();

            var preFileName = DateTime.Now.Ticks + "__" + Thread.CurrentThread.ManagedThreadId +
                              "__" + newGuid;
            var pathPre = Path.Combine(path1: tempFolder, path2: "Temp");


            if (string.IsNullOrEmpty(value: inputFile))
                inputFile = Path.Combine(path1: pathPre, path2: preFileName + ".input.tt.temp.txt");
            else
                preFileName = inputFile;

            if (string.IsNullOrEmpty(value: outputFile))
                outputFile = Path.Combine(path1: pathPre, path2: preFileName + ".output.tt.temp.txt");


            if (!string.IsNullOrEmpty(value: inputContent))
            {
                var parentDir = Directory.GetParent(path: inputFile).FullName;
                if (!Directory.Exists(path: parentDir)) {
                    Directory.CreateDirectory(path: parentDir); 
                }

                File.WriteAllText(path: inputFile, contents: inputContent);
            }

            using (Process proc = new())
            {
                proc.EnableRaisingEvents = true;

                proc.StartInfo.RedirectStandardError = true;
                //proc.StartInfo.RedirectStandardOutput = true;

                // Set text transform program (this could change according to the Windows version)
                proc.StartInfo.FileName = _pathService.GetTextTransformPath().Path;

                // Specify T4 template file
                proc.StartInfo.Arguments = $@"""{inputFile}"" -out ""{outputFile}"" " + namespacesStr + assemblyPathStr;
                //inputContent = File.ReadAllText(inputFile);
                ////inputContent = inputContent.Replace("\r\n", "\n")
                //// .Replace("\r", "\n")
                //// .Replace("\n", "")
                //// .Replace(" ", "");
                //inputContent = Regex.Replace(inputContent, @"\s\s", @" ");
                //File.WriteAllText(inputFile, inputContent);
                proc.Start();

                var errorMessage = proc.StandardError.ReadToEnd();

                proc.WaitForExit();

                var success = proc.ExitCode == 0;


                if (success)
                {
                    outputContent = File.ReadAllText(path: outputFile);

                    if (!preserveInputOnSucess) File.Delete(path: inputFile);

                    if (!preserveOutputOnSucess)
                    {
                        File.Delete(path: outputFile);
                    }
                }
                else
                {
                    var errorFile = Path.Combine(path1: pathPre, path2: preFileName + ".error.txt");
                    File.WriteAllText(path: errorFile, contents: errorMessage);
                    throw new Exception();
                }

                return new ParseTemplateOutput
                {
                    Success = success,
                    OutputContent = outputContent
                };
            }
        }


        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}