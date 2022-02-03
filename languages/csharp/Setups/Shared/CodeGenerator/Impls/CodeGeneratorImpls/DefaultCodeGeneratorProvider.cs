using CodeGenerator.Interfaces.CodeGeneratorInterfaces;
using CodeGenerator.Models;
using Library.Infrastructure.Services.PathServices;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CodeGenerator.Impls.CodeGeneratorImpls
{
    public partial class DefaultCodeGeneratorProvider : ICodeGeneratorProvider<TemplateData, TemplateContext>
    {
        private static readonly ConcurrentDictionary<string, object> Cache = new();

        public Task<TemplateContext> CreateContext(
            TemplateProject project,
            TemplateFile file,
            IEnumerable<TemplateTokenInfo> tokenIfos)
        {
            var toReturn = new TemplateContext
            {
                Project = project,
                File = file,

            };
            throw new System.NotImplementedException();
        }

        public async Task<TemplateData> GetDataAsync(List<TemplateProject> projects)
        {
            var data = new TemplateData();

            return data;
        }

        public async Task<IEnumerable<string>> GetTemplatesWithinDirectoryPath(string directoryPath)
        {
            var path = directoryPath.Replace(oldValue: "\"", newValue: "").TrimEnd(trimChar: '\\')
               .TrimEnd(trimChar: '/');

            var dirGenPaths = Directory.EnumerateDirectories(path, "*_*Gen_", SearchOption.AllDirectories);

            var result = PathService.GetFilesThatMatchesTheGlob_Static(
                currentDirPath: path,
                excludedDirs: new List<string> { "node_modules" },
                globPatterns: new List<string> { "*_*Gen_*" }
            );

            var foundFilePaths = result.FoundPaths.Concat(dirGenPaths);

            if (IsValidTemplateDirectory(path))
            {
                foundFilePaths = foundFilePaths.Concat(new List<string> { path });
            }

            return foundFilePaths.Where(predicate: p =>
            {
                if (File.GetAttributes(p).HasFlag(FileAttributes.Directory))
                {
                    return IsValidTemplateDirectory(p);
                }
                else
                {
                    return IsValidTemplateFile(p);
                }
            }).ToList();
        }

        public async Task<bool> IsValidTemplateFile(string filePath)
        {
            return Regex.IsMatch(input: filePath, pattern: @"_\w*[Gg]en_(\.\w+)?$");
        }

        public async Task<bool> IsValidTemplateDirectory(string directoryPath)
        {
            return Regex.IsMatch(input: directoryPath, pattern: @"_\w*[Gg]en_$");
        }

        public async Task<TemplateProject> GetProjectFromFilePathAsync(string filePath)
        {
            throw new System.NotImplementedException();
        }

        public async Task<string> GetVisualStudioSlnPathAsync(string fileOrDirectoryPath)
        {
            throw new System.NotImplementedException();
        }


        public async Task<TemplateData> CreateDataAsync(
            List<TemplateProject> projects,
            string fileOrDirectoryPathProvided)
        {
            var data = new TemplateData();

            data.Projects = projects;

            await PopulateModels(data: data);

            PopulateServices(data: data);

            PopulateDbContexts(data: data);

            await PopulateLocalizations(data: data);

            PopulateProjects(data: data);

            data.Files = projects.SelectMany(selector: project => project.Files).ToList();
            return null;
        }

        Task<TemplateData> ICodeGeneratorProvider<TData>.CreateDataAsync(List<TemplateProject> projects, string filePath)
        {

        }
    }
}
