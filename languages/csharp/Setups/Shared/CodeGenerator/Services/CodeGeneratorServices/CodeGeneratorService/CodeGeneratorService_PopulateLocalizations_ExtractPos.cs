

using System;
using System.IO;
using System.Linq;
using PoExtractor.Core;
using PoExtractor.Core.Contracts;
using PoExtractor.DotNet.CS;
using PoExtractor.DotNet.VB;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public void PopulateLocalizations_ExtractPos(TemplateProject project)
        {
            var projectDirPath = project.DirPath;
            if (!Directory.Exists(projectDirPath))
            {
                return;
            }
            var outputBasePath = Path.Combine(path1: project.DirPath, path2: "Localizations", path3: "Templates",
                path4: "Pots");

            string[] projectFiles;


            var processors = new IProjectProcessor[]
            {
                new CSharpProjectProcessor(),
                new VisualBasicProjectProcessor()
            };

            var outputPath = Path.Combine(path1: outputBasePath,
                path2: project.Name + PoWriter.PortaleObjectTemplateExtension);

            var strings = new LocalizableStringCollection();


            foreach (var processor in processors)
                processor.Process(path: projectDirPath, basePath: projectDirPath, strings: strings);

            if (strings.Values.Any())
            {
                Directory.CreateDirectory(path: Path.GetDirectoryName(path: outputPath));

                using (var potFile = new PoWriter(path: outputPath))
                {
                    potFile.WriteRecord(records: strings.Values);
                }
            }

            Console.WriteLine(
                value: $"{Path.GetFileName(path: projectDirPath)}: Found {strings.Values.Count()} strings.");

        }
    }
}