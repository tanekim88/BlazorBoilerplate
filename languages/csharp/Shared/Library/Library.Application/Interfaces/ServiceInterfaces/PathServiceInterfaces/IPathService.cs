

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces
{
    public interface IPathService
    {
        GetAncestorFolderThatContainsThisFileOutput GetAncestorFolderInfoThatContainsThisFilePattern(
            string currentDirPath, List<string> regexPathPatterns = null);

        Task<GetAppsDirOutput> GetAppDirPathAsync();

        GetAssemblyPathOutput GetAssemblyPath(string projectName);

        GetCurrentProjectPathOutput GetCurrentProjectPath();

        GetDynamicExpressoAssemblyPathOutput GetDynamicExpressoAssemblyPath();

        GetFilesThatMatchesTheGlobOutput GetFilesThatMatchesTheGlob(string currentDirPath,
            List<string> excludedDirs = null, List<string> globPatterns = null);

        GetHumanizerAssemblyPathOutput GetHumanizerAssemblyPath();

        GetPackagesPathOutput GetPackagesPath();

        GetProjectPathFromFilePathOutput GetProjectInfoFromFilePath(string filePath);

        GetProjectPathOutput GetProjectPath(string projectName);

        GetTextTransformPathOutput GetTextTransformPath();

        public record GetAncestorFolderThatContainsThisFileOutput
        {
            public string FoundDirPath { get; set; }
            public List<string> FoundPaths { get; set; }
        }

        public record GetAppsDirOutput
        {
            public string AppDirPath { get; set; }
        }


        public record GetAssemblyPathOutput
        {
            public string Payload { get; set; }
        }

        public record GetCurrentProjectPathOutput
        {
            public string ProjectPath { get; set; }
            public string ProjectDirPath { get; set; }
        }

        public record GetDynamicExpressoAssemblyPathOutput
        {
            public string Payload { get; set; }
        }

        public record GetFilesThatMatchesTheGlobOutput
        {
            public List<string> FoundPaths { get; set; }
        }

        public record GetHumanizerAssemblyPathOutput
        {
            public string Payload { get; set; }
        }

        public record GetPackagesPathOutput
        {
            public string Payload { get; set; }
        }


        public record GetProjectPathFromFilePathOutput
        {
            public string ProjectDirPath { get; set; }
            public string ProjectFilePath { get; set; }
            public string ProjectName { get; set; }
        }

        public record GetProjectPathOutput
        {
            public string ProjectPath { get; set; }
            public string ProjectDirPath { get; set; }
        }


        public record GetTextTransformPathOutput
        {
            public string Path { get; set; }
        }
    }
}