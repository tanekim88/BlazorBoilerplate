/*%runIf: 
Data.Services.Exists(service => service.Groups[0].Name == "Assembly" && service.Name == "Assembly")
*/

//%t:begin Intro


//%t:end Intro

//%s:begin Header



using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using SharedLibrary.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces;
using static SharedLibrary.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces.ISharedAssemblyService;



//%s:end Header

//%t:begin Header
//%t:end Header


namespace SharedLibrary.Infrastructure.Services.AssemblyServices
{
    //%s:begin Attributes
    //%s:end Attributes
    public class SharedAssemblyService :
        /*%s:begin BaseClass*/ /*%s:end BaseClass*/
        ISharedAssemblyService
    {
        //%s:begin Properties
        //%s:end Properties


        //%s:begin Body

        public GetAssembliesOutput GetAssemblies()
        {
            return new() {Payload = AppDomain.CurrentDomain.GetAssemblies().ToList()};
        }


        public GetAssemblyByProjectNameOutput GetAssemblyByProjectName(string projectName)
        {
            return new()
            {
                Payload = AppDomain.CurrentDomain.GetAssemblies()
                    .SingleOrDefault(predicate: assembly => assembly.GetName().Name == projectName)
            };
        }


        public GetAssemblyByProjectFilePathOutput GetAssemblyByProjectPath(string projectFilePath)
        {
            var projectPath = projectFilePath;

            var projectName = Path.GetFileNameWithoutExtension(path: projectPath);

            var projectDirPath = Directory.GetParent(path: projectPath).FullName;

            var assemblyDebugBinPath = Path.Combine(path1: projectDirPath, path2: "bin");
            var assemblyDebugDebugPath = Path.Combine(path1: assemblyDebugBinPath, path2: "Debug");
            var assemblyDebugReleasePath = Path.Combine(path1: assemblyDebugBinPath, path2: "Release");
            var assembly = new List<string> {assemblyDebugDebugPath, assemblyDebugReleasePath}.Select(
                selector: dirPath =>
                {
                    var dir = Directory.EnumerateDirectories(path: dirPath).OrderByDescending(keySelector: f => f)
                        .FirstOrDefault();
                    if (dir != null)
                    {
                        var assemblyPath = Path.Combine(path1: dir, path2: projectName + ".dll");

                        if (File.Exists(path: assemblyPath))
                        {
                            var assembly = Assembly.LoadFrom(assemblyFile: assemblyPath);

                            return assembly;
                        }
                    }

                    return null;
                }).Where(predicate: x => x != null).FirstOrDefault();

            var releaseDirs = Directory.EnumerateDirectories(path: assemblyDebugDebugPath)
                .OrderByDescending(keySelector: f => f)
                .FirstOrDefault();

            return new GetAssemblyByProjectFilePathOutput
            {
                Assembly = assembly
            };
        }

        //%s:end Body
    }
}