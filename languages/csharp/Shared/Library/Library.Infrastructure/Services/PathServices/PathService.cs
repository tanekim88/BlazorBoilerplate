//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Path" && service.Name == "Path")

//%t:begin Intro


//%t:end Intro

//%s:begin Header



//%s:end Header
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Microsoft.AspNetCore.Hosting;
using static Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces.IPathService;



namespace Library.Infrastructure.Services.PathServices
{
    public /*%s:begin Partial*/ /*%s:end Partial*/ class PathService
        : /*%s:begin BaseClass*/ /*%s:end BaseClass*/
            IPathService
    {
        private static string AppDirPath;

        private static List<string> AllProjectPathsWithinAppsDir;

        /*%s:begin Properties*/
        private readonly IWebHostEnvironment _env;


        private string? _humanizerAssemblyPath;
        /*%s:end Properties*/

        public PathService(
            /*%s:begin ConstructorParameters*/
            IWebHostEnvironment env
        /*%s:end ConstructorParameters*/
        )
        {
            /*%s:begin ConstructorBody*/
            _env = env;
            /*%s:end ConstructorBody*/
        }


        //%s:begin Body


        public GetAncestorFolderThatContainsThisFileOutput GetAncestorFolderInfoThatContainsThisFilePattern(
            string currentDirPath,
            List<string> regexPathPatterns = null
        )
        {
            if (regexPathPatterns is null) regexPathPatterns = new List<string> { @"\.(cs|vb)proj$" };

            return GetAncestorFolderInfoThatContainsThisFilePattern_Static(
                currentDirPath: currentDirPath,
                regexPathPatterns: regexPathPatterns
            );
        }

        public GetFilesThatMatchesTheGlobOutput GetFilesThatMatchesTheGlob(
            string currentDirPath,
            List<string> excludedDirs = null,
            List<string> globPatterns = null
        )
        {
            if (excludedDirs is null)
                excludedDirs = new List<string> { @"node_modules" };
            if (globPatterns is null)
                globPatterns = new List<string>();
            return GetFilesThatMatchesTheGlob_Static(currentDirPath: currentDirPath, excludedDirs: excludedDirs,
                globPatterns: globPatterns);
        }


        public async Task<GetAppsDirOutput> GetAppDirPathAsync()
        {
            if (AppDirPath is not null) return new GetAppsDirOutput { AppDirPath = AppDirPath };

            var currentRootPath = _env.ContentRootPath;
            var result = GetAncestorFolderInfoThatContainsThisFilePattern(currentDirPath: currentRootPath,
                regexPathPatterns: new List<string>
                    {@$"{Regex.Escape(str: Path.DirectorySeparatorChar.ToString())}App\.sln$"});

            return new GetAppsDirOutput { AppDirPath = result.FoundDirPath };
        }


        public GetProjectPathFromFilePathOutput GetProjectInfoFromFilePath(string filePath)
        {
            var isDirectory = File.GetAttributes(path: filePath).HasFlag(flag: FileAttributes.Directory);

            var dirPath = isDirectory ? filePath : Directory.GetParent(path: filePath).FullName;

            var result = GetAncestorFolderInfoThatContainsThisFilePattern(
                currentDirPath: dirPath,
                regexPathPatterns: new List<string> { @"\.(cs|vb)proj$" }
            );


            var foundProjectPath = result.FoundPaths.FirstOrDefault();
            var projectName = Path.GetFileNameWithoutExtension(path: foundProjectPath);

            return new GetProjectPathFromFilePathOutput
            {
                ProjectDirPath = result.FoundDirPath,
                ProjectFilePath = foundProjectPath,
                ProjectName = projectName
            };
        }


        public GetCurrentProjectPathOutput GetCurrentProjectPath()
        {
            var assemblyPath = Assembly.GetExecutingAssembly().Location;

            var result = GetAncestorFolderInfoThatContainsThisFilePattern(
                currentDirPath: assemblyPath,
                regexPathPatterns: new List<string>
                {
                    @"\.(cs|vb)proj$"
                }
            );

            var foundPath = result.FoundPaths.FirstOrDefault();

            return new GetCurrentProjectPathOutput { ProjectPath = foundPath, ProjectDirPath = result.FoundDirPath };
        }


        public GetProjectPathOutput GetProjectPath(string projectName)
        {
            var result = GetProjectPath_Static(projectName: projectName);

            return new GetProjectPathOutput
            { ProjectPath = result.ProjectDirPath, ProjectDirPath = result.ProjectDirPath };
        }


        public GetPackagesPathOutput GetPackagesPath()
        {
            string toReturn = null;

            if (RuntimeInformation.IsOSPlatform(osPlatform: OSPlatform.Windows))
            {
                var userProfileDir = Environment.GetEnvironmentVariable(variable: "userprofile");
                ;

                toReturn = @$"{userProfileDir}\.nuget\packages";
            }
            else if (RuntimeInformation.IsOSPlatform(osPlatform: OSPlatform.OSX))
            {
                toReturn = @"~/.nuget/packages";
            }
            else if (RuntimeInformation.IsOSPlatform(osPlatform: OSPlatform.Linux))
            {
                toReturn = @"~/.nuget/packages";
            }

            return new GetPackagesPathOutput
            {
                Payload = toReturn
            };
        }


        public GetDynamicExpressoAssemblyPathOutput GetDynamicExpressoAssemblyPath()
        {
            var packagesDir = GetPackagesPath().Payload;
            var humanizerCoreDir = Path.Combine(path1: packagesDir, path2: "dynamicexpresso.core");
            var humanizerAssemblyPath = Directory
                .EnumerateFiles(path: humanizerCoreDir, searchPattern: "DynamicExpresso.Core.dll",
                    searchOption: SearchOption.AllDirectories)
                .OrderByDescending(keySelector: x => x).FirstOrDefault();


            return new GetDynamicExpressoAssemblyPathOutput { Payload = humanizerAssemblyPath };
        }

        public GetHumanizerAssemblyPathOutput GetHumanizerAssemblyPath()
        {
            if (_humanizerAssemblyPath != null)
            {
                return new GetHumanizerAssemblyPathOutput { Payload = _humanizerAssemblyPath };
                ;
            }

            var packagesDir = GetPackagesPath().Payload;
            var humanizerCoreDir = Path.Combine(path1: packagesDir, path2: "humanizer.core");
            var humanizerAssemblyPath = Directory
                .EnumerateFiles(path: humanizerCoreDir, searchPattern: "Humanizer.dll",
                    searchOption: SearchOption.AllDirectories)
                .OrderByDescending(keySelector: x => x).FirstOrDefault();

            _humanizerAssemblyPath = humanizerAssemblyPath;

            return new GetHumanizerAssemblyPathOutput { Payload = humanizerAssemblyPath };
        }


        public GetAssemblyPathOutput GetAssemblyPath(string projectName)
        {
            var assembly = AppDomain.CurrentDomain.GetAssemblies()
                .FirstOrDefault(predicate: x => x.GetName().Name == projectName);

            return new GetAssemblyPathOutput { Payload = assembly.Location };
        }


        public GetTextTransformPathOutput GetTextTransformPath()
        {
            var toReturn = "";

            if (RuntimeInformation.IsOSPlatform(osPlatform: OSPlatform.Windows))
                toReturn = @"C:\Program Files (x86)\Microsoft Visual Studio\2019\Preview\Common7\IDE\TextTransform.exe";
            else if (RuntimeInformation.IsOSPlatform(osPlatform: OSPlatform.OSX))
                toReturn =
                    @"mono ""/Applications/Visual Studio.app/Contents/Resources/lib/monodevelop/AddIns/MonoDevelop.TextTemplating/TextTransform.exe""";
            else if (RuntimeInformation.IsOSPlatform(osPlatform: OSPlatform.Linux))
                toReturn = @"/usr/lib/monodevelop/AddIns/MonoDevelop.TextTemplating/TextTransform.exe";

            return new GetTextTransformPathOutput { Path = toReturn };
        }


        public static GetAncestorFolderThatContainsThisFileOutput
            GetAncestorFolderInfoThatContainsThisFilePattern_Static(
                string currentDirPath,
                List<string> regexPathPatterns = null)
        {
            if (File.Exists(path: currentDirPath)) currentDirPath = Directory.GetParent(path: currentDirPath).FullName;

            if (!Directory.Exists(path: currentDirPath))
                return new GetAncestorFolderThatContainsThisFileOutput { FoundDirPath = null, FoundPaths = null };

            var files = Directory
                .EnumerateFiles(path: currentDirPath, searchPattern: "*", searchOption: SearchOption.TopDirectoryOnly)
                .Where(predicate: filePath =>
                {
                    return regexPathPatterns.Any(predicate: r => Regex.IsMatch(input: filePath, pattern: r));
                }).ToList();

            if (files.Count() > 0)
                return new GetAncestorFolderThatContainsThisFileOutput
                { FoundDirPath = currentDirPath, FoundPaths = files.ToList() };

            return GetAncestorFolderInfoThatContainsThisFilePattern_Static(
                currentDirPath: Directory.GetParent(path: currentDirPath).FullName,
                regexPathPatterns: regexPathPatterns
            );
        }

        public static GetFilesThatMatchesTheGlobOutput GetFilesThatMatchesTheGlob_Static(
            string currentDirPath,
            List<string> excludedDirs = null,
            List<string> globPatterns = null)
        {
            var foundFilePaths = new List<string>();

            Queue<string> queue = new();
            queue.Enqueue(item: currentDirPath);

            while (queue.Count > 0)
            {
                currentDirPath = queue.Dequeue();
                try
                {
                    foreach (string subDir in Directory.GetDirectories(path: currentDirPath))
                    {
                        var dirName = Path.GetFileName(path: subDir);

                        if (!excludedDirs.Contains(item: dirName)) queue.Enqueue(item: subDir);
                    }
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(value: ex);
                }

                try
                {
                    foreach (var glob in globPatterns)
                    {
                        var files = Directory.EnumerateFiles(path: currentDirPath, searchPattern: glob,
                            searchOption: SearchOption.TopDirectoryOnly);

                        if (files != null) foundFilePaths.AddRange(collection: files);
                    }
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(value: ex);
                }
            }

            return new GetFilesThatMatchesTheGlobOutput
            {
                FoundPaths = foundFilePaths
            };
        }


        public static GetFilesThatMatchesTheGlobOutput GetDirsThatMatchesTheGlob_Static(
        string currentDirPath,
        List<string> excludedDirs = null,
        List<string> globPatterns = null)
        {

            var foundDirPaths = new List<string>();

            Queue<string> queue = new();
            queue.Enqueue(item: currentDirPath);

            while (queue.Count > 0)
            {
                currentDirPath = queue.Dequeue();
                try
                {
                    foreach (string subDir in Directory.GetDirectories(path: currentDirPath))
                    {
                        var dirName = Path.GetFileName(path: subDir);

                        if (!excludedDirs.Contains(item: dirName)) queue.Enqueue(item: subDir);
                    }
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(value: ex);
                }

                try
                {
                    foreach (var glob in globPatterns)
                    {
                        var files = Directory.EnumerateFiles(path: currentDirPath, searchPattern: glob,
                            searchOption: SearchOption.TopDirectoryOnly);

                        if (files != null) foundDirPaths.AddRange(collection: files);
                    }
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(value: ex);
                }
            }

            return new GetFilesThatMatchesTheGlobOutput
            {
                FoundPaths = foundDirPaths
            };
        }


        public static GetAppsDirOutput GetAppsDir_Static()
        {
            if (AppDirPath != null) return new GetAppsDirOutput { AppDirPath = AppDirPath };

            var currentAssembly = Assembly.GetExecutingAssembly();
            var result = GetAncestorFolderInfoThatContainsThisFilePattern_Static(
                currentDirPath: currentAssembly.Location,
                regexPathPatterns: new List<string>
                    {@$"{Regex.Escape(str: Path.DirectorySeparatorChar.ToString())}.+\.sln$"});

            return new GetAppsDirOutput { AppDirPath = result.FoundDirPath };
        }

        public static GetAllProjectPathsWithinAppsDirOutput GetAllProjectPathsWithinAppsDir_Static()
        {
            if (AllProjectPathsWithinAppsDir != null)
                return new GetAllProjectPathsWithinAppsDirOutput
                { AllProjectPathsWithinAppsDir = AllProjectPathsWithinAppsDir };

            var appsDirResult = GetAppsDir_Static();
            var foundPaths = Directory.EnumerateFiles(path: appsDirResult.AppDirPath, searchPattern: "*.*proj",
                    searchOption: SearchOption.AllDirectories)
                .ToList();

            AllProjectPathsWithinAppsDir = foundPaths;

            return new GetAllProjectPathsWithinAppsDirOutput { AllProjectPathsWithinAppsDir = foundPaths };
        }

        public static GetProjectPathOutput GetProjectPath_Static(string projectName)
        {
            var allProjectPathsResult = GetAllProjectPathsWithinAppsDir_Static();
            var foundPath = allProjectPathsResult.AllProjectPathsWithinAppsDir.FirstOrDefault(predicate: p =>
                Regex.IsMatch(input: p,
                    pattern:
                    $@"{Regex.Escape(str: Path.DirectorySeparatorChar.ToString())}{projectName}\.(cs|vb)proj$"));
            var foundDirPath = Directory.GetParent(path: foundPath).FullName;

            return new GetProjectPathOutput { ProjectPath = foundPath, ProjectDirPath = foundDirPath };
        }


        public record GetAllProjectPathsWithinAppsDirOutput
        {
            public List<string> AllProjectPathsWithinAppsDir { get; set; }
        }

        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}