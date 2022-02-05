using CodeGenerator.Interfaces.CodeGeneratorInterfaces;
using CodeGenerator.Models;
using Library.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.JsServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;
using Library.Infrastructure.Services.PathServices;
using Presentation.Application.Interfaces.TranslationUiServiceInterfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CodeGenerator.Impls.CodeGeneratorImpls
{
    public partial class DefaultCodeGeneratorProvider : ICodeGeneratorProvider<TemplateData>
    {

        private readonly IAssemblyService _assemblyService;
        private readonly IJsService _jsService;
        private readonly IPathService _pathService;
        private readonly IRegexService _regexService;
        private readonly IServiceProvider _serviceProvider;
        private readonly ITemplateService _templateService;
        private readonly ITranslationUiService _translationUiService;
        private readonly IXmlSerializerService _xmlSerializerService;
        private readonly IEvalService _evalService;

        public DefaultCodeGeneratorProvider(
            IRegexService regexService,
            ITemplateService templateParserSetupService,
            IPathService pathService,
            ITranslationUiService translationUiService,
            IAssemblyService assemblyService,
            IXmlSerializerService xmlSerializerService,
            IEvalService evalService,

            IServiceProvider serviceProvider,
            IJsService jsService)
        {
            _regexService = regexService;
            _templateService = templateParserSetupService;
            _pathService = pathService;
            _translationUiService = translationUiService;
            _assemblyService = assemblyService;
            _xmlSerializerService = xmlSerializerService;

            _serviceProvider = serviceProvider;
            _jsService = jsService;
            _evalService = evalService;
        }



        private Dictionary<string, TemplateProject<TemplateData>> _projectPathToProjectDict = new();
        private Dictionary<string, TemplateFile<TemplateData>> _filePathToFileDict = new();

        public async Task<TemplateProject<TemplateData>> GetProjectFromFilePathAsync(string filePath)
        {
            var match = Regex.Match(filePath, @"_\w*(?<genType>[Gg]en)_(?<ext>\.\w+)?$");

            var genType = match.Groups["genType"].Value;


            var projectDirResult = _pathService.GetProjectInfoFromFilePath(
                 filePath: filePath
             );

            var projectFilePath = projectDirResult.ProjectFilePath;
            var projectDirPath = projectDirResult.ProjectDirPath;
            var projectName = projectDirResult.ProjectName;

            TemplateProject<TemplateData> project;

            if (_projectPathToProjectDict.ContainsKey(projectFilePath))
            {
                project = _projectPathToProjectDict.GetValueOrDefault(projectFilePath);
            }
            else
            {
                project = new TemplateProject<TemplateData>
                {
                    ProjectDirPath = projectDirPath,
                    Name = projectName,
                    ProjectFilePath = projectFilePath
                };
            }

            TemplateFile<TemplateData> file;
            if (_filePathToFileDict.ContainsKey(filePath))
            {
                file = _filePathToFileDict.GetValueOrDefault(filePath);
            }
            else
            {
                file = new TemplateFile<TemplateData>
                {
                    ProcessedFilePath = filePath,
                    Project = project
                };
            }


            project.Files.Add(file);




            _projectPathToProjectDict.Add(projectFilePath, project);

            project.Files = x.Where(predicate: y =>
            {
                var objPath = Path.Combine(path1: y.ProjectDirPath, path2: "obj");
                var binPath = Path.Combine(path1: y.ProjectDirPath, path2: "bin");
                var toReturn =
                    !new List<string> { objPath, binPath }.Any(
                        predicate: p => y.TemplatePath.StartsWith(value: p));

                if (toReturn)
                {
                    var ext = Path.GetExtension(path: y.TemplatePath);
                    var codeType = TemplateCodeType.GetCodeTypeFromExtension(extension: ext);

                    if (codeType == null) return false;


                    return new List<string>
                             {
                                @$"{codeType.GetTemplateSymbolName(templateSymbol: "[a-zA-Z]*Gen", isPath: true)}({Regex.Escape(str: Path.DirectorySeparatorChar.ToString())})",
                                @$"{codeType.GetTemplateSymbolName(templateSymbol: "[a-zA-Z]*Gen", isPath: true)}(\.\w+)?$"
                             }.Any(predicate: templateSymbolRegex =>
                             {
                                 return Regex.IsMatch(input: y.TemplatePath, pattern: templateSymbolRegex,
                                     options: RegexOptions.IgnoreCase);
                             });
                }

                return false;
            }).Select(selector: y =>
            {
                return new TemplateFile
                {
                    TemplatePath = y.TemplatePath,
                    Project = project,
                    GenType = y.GenType
                };
            }).ToList();


            return project;

        }


        public async Task<TemplateData> CreatePreDataAsync(TemplateFile<TemplateData> file)
        {
            return new TemplateData();
        }

        public async Task<TemplateData> CreateDataAsync(TemplateFile<TemplateData> file)
        {
            var data = new TemplateData();

            data.Projects = file.Project.DependentProjects.Concat(new List<TemplateProject<TemplateData>> { file.Project }).ToList();

            await PopulateModels(data: data);

            PopulateServices(data: data);

            PopulateDbContexts(data: data);

            await PopulateLocalizations(data: data);

            PopulateProjects(data: data);

            data.Files = projects.SelectMany(selector: project => project.Files).ToList();
            return null;
        }


        public async Task<string> GetVisualStudioSlnPathAsync(string fileOrDirectoryPath)
        {
            var output = await _pathService.GetAppDirPathAsync();
            return output.AppDirPath;
        }

        public async Task<IEnumerable<string>> GetTemplatesWithinDirectoryPathAsync(string directoryPath)
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

            if (await IsValidTemplateDirectory(path))
            {
                foundFilePaths = foundFilePaths.Concat(new List<string> { path });
            }

            return foundFilePaths.Where(predicate: p =>
            {
                if (File.GetAttributes(p).HasFlag(FileAttributes.Directory))
                {
                    var IsValidTemplateDirectoryTask = IsValidTemplateDirectory(p);
                    IsValidTemplateDirectoryTask.Wait();


                    return IsValidTemplateDirectoryTask.Result;
                }
                else
                {
                    var IsValidTemplateFileTask = IsValidTemplateFile(p);
                    IsValidTemplateFileTask.Wait();

                    return IsValidTemplateFileTask.Result;
                }
            }).ToList();
        }

        public async Task<bool> IsValidTemplateFile(string filePath)
        {

            return !filePath.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}") &&
                !filePath.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}") &&
                Regex.IsMatch(input: filePath, pattern: @"_\w*[Gg]en_(\.\w+)?$");
        }

        public async Task<bool> IsValidTemplateDirectory(string directoryPath)
        {
            return !directoryPath.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}") &&
                !directoryPath.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}") &&
            Regex.IsMatch(input: directoryPath, pattern: @"_\w*[Gg]en_$");

        }
    }
}
