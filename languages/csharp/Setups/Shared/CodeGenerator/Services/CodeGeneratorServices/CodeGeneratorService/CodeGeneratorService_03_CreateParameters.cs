

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData>
    {
        public record CreateParametersOutput
        {
            public  TemplateData Data { get; init; }
            public List<TemplateProject> Projects { get; init; }
        }
        public class Temp
        {
            public string ProjectDirPath { get; set; }
            public string ProjectName { get; set; }
            public string ProjectPath { get; set; }
            public string TemplatePath { get; set; }
            public string GenType { get; set; }
        }
        public async Task<CreateParametersOutput> CreateProjects(
            List<string> templateFilePaths
        )
        {
            var processedPaths = templateFilePaths.SelectMany(templatePath =>
            {


                var match = Regex.Match(templatePath, @"_\w*(?<genType>[Gg]en)_(?<ext>\.\w+)?$");

                var genType = match.Groups["genType"].Value;

                if (Directory.Exists(templatePath))
                {
                    var files = Directory.EnumerateFiles(templatePath, "*", SearchOption.AllDirectories).Select(subFilePath =>
                    {
                        if (subFilePath.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}") ||
                            subFilePath.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}"))
                        {
                            return null;
                        }

                        var match2 = Regex.Match(subFilePath, @"_\w*(?<genType>[Gg]en)_(\.\w+)?$");

                        var genType2 = match.Groups["genType"].Value;

                        var finalGenType = genType2 != "" ? genType2 : genType;

                        return new Temp
                        {
                            TemplatePath = subFilePath,
                            GenType = finalGenType
                        };
                    }).Where(file => file is not null);

                    return files;

                }

                return new List<Temp> {
                    new Temp{
                        TemplatePath = templatePath,
                        GenType = genType
                    }
                };
            }).GroupBy(x => x.TemplatePath).Select(x => x.First());


            var projects = processedPaths.Select(selector: processedPath =>
            {
                var projectDirResult = _pathService.GetProjectInfoFromFilePath(
                    filePath: processedPath.TemplatePath
                );

                var projectPath = projectDirResult.ProjectPath;
                var projectDirPath = projectDirResult.ProjectDirPath;
                var projectName = projectDirResult.ProjectName;

                processedPath.ProjectPath = projectPath;
                processedPath.ProjectDirPath = projectDirPath;
                processedPath.ProjectName = projectName;

                return processedPath;
            }).GroupBy(keySelector: proj => (proj.ProjectPath, proj.ProjectDirPath, proj.ProjectName)).Select(
                 selector: x =>
                 {
                     var (projectPath, projectDirPath, projectName) = x.Key;

                     var project = projectNameToProjectDict[key: projectName];

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
                 }).ToList();


            projects.ForEach(action: project =>
            {
                //var assembly = _assemblyService.GetAssemblyByProjectName(new GetAssemblyByProjectNameInput { ProjectName = project.Name }).Payload;
                //project.Assembly = assembly;
                project.CodeName = Regex.Replace(input: project.Name, pattern: @"\W", replacement: "");

                project.Files.ForEach(action: async templateFile =>
                {
                    var templatePath = templateFile.TemplatePath;
                    var ext = Path.GetExtension(path: templatePath);

                    var codeType = TemplateCodeType.GetCodeTypeFromExtension(extension: ext);
                    var fileName = Path.GetFileName(path: templateFile.TemplatePath);

                    var filePath = templatePath;

                    var templateDirectoryPath = templatePath;
                    var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(path: templateDirectoryPath);

                    //var overWrite = fileNameWithoutExtension.EndsWith(
                    //    value: codeType.GetTemplateSymbolName(templateSymbol: "GEN", isPath: true),
                    //    comparisonType: StringComparison.InvariantCulture);

                    //var partiallyOverWrite =
                    //    fileNameWithoutExtension.EndsWith(
                    //        value: codeType.GetTemplateSymbolName(templateSymbol: "Gen", isPath: true),
                    //        comparisonType: StringComparison.InvariantCulture);

                    //if (partiallyOverWrite) overWrite = true;

                    var overWrite = templateFile.GenType == "GEN" || templateFile.GenType == "Gen";

                    var partiallyOverWrite = templateFile.GenType == "Gen";

                    var isTmp = fileNameWithoutExtension.EndsWith(
                        value: codeType.GetTemplateSymbolName(templateSymbol: "Tmp", isPath: true),
                        comparisonType: StringComparison.InvariantCultureIgnoreCase);

                    filePath = codeType.RemoveTemplatePostfix(inputString: filePath, isPath: true).Replace("__EBN__", "__Entities_BoundedContext_Name__");

                    templateFile.TemplatePath = templatePath;

                    filePath = codeType.ApplyAliasses(content: filePath);
                    templateFile.Path = filePath;
                    templateFile.TemplateName = fileName;



                    templateFile.ShouldOverWrite = overWrite;
                    templateFile.ShouldPartiallyOverWrite = partiallyOverWrite;
                    templateFile.ShouldFinalize = !isTmp;
                    templateFile.Project = project;
                    templateFile.CodeType = codeType;

                    var content = File.ReadAllText(path: templateFile.TemplatePath);
                    content = codeType.ApplyAliasses(content: content);
                    templateFile.Content = content;
                });
            });

            dependentProjects.ForEach(action: dependentProject =>
            {
                if (!projects.Any(predicate: project => dependentProject.Name == project.Name))
                    projects.Add(item: dependentProject);
            });

            projects.ForEach(project =>
            {
                var match = Regex.Match(project.Name, @"(?<shared>Shared)?(?<baseName>\w*)(\.(?<type>Application|Infrastructure|Domain))?");
                var isShared = !string.IsNullOrEmpty(match.Groups["shared"].Value);
                project.BaseName = match.Groups["baseName"].Value;
                project.Type = match.Groups["type"].Value;

                project.IsShared = isShared;
                project.BoundedContext = new TemplateBoundedContext
                {
                    Name = project.BaseName
                };
            });


            var startTime = DateTime.UtcNow;

            var result = new List<TemplateData>();

            //allFiles = allFiles.Where(x => x.TemplatePath.Contains("") && x.TemplatePath.Contains("ApplicationDbContextBase_Temp")).ToList();

            //PostProcess(projects, allFiles, startTime);

            foreach (var project in projects)
            {
                var domainProject = projects.FirstOrDefault(p => p.BaseName == project.BaseName && p.Type == "Domain");
                var applicationProject = projects.FirstOrDefault(p => p.BaseName == project.BaseName && p.Type == "Application");
                var InfrastructureProject = projects.FirstOrDefault(p => p.BaseName == project.BaseName && p.Type == "Infrastructure");

                project.DomainAssembly = domainProject?.Assembly;
                project.ApplicationAssembly = applicationProject?.Assembly;
                project.InfrastructureAssembly = InfrastructureProject?.Assembly;
            }

            var data = await _dataService.GetDataAsync(projects: projects);

            return new CreateParametersOutput
            {
                Data = data,
                Projects = projects
            };
        }
    }
}