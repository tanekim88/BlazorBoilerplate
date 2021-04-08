

using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task PopulateCustomPoFileResources(
            TemplateProject project,
            TemplateData data,
            List<TemplateLocalization> localizationsToPopulate
        )
        {
            var posDirPath = Path.Combine(path1: project.DirPath, path2: "Localizations", path3: "Customs",
                path4: "Pos");

            if (!Directory.Exists(path: posDirPath)) Directory.CreateDirectory(path: posDirPath);

            var files = Directory.EnumerateFiles(path: posDirPath, searchPattern: "*.po",
                searchOption: SearchOption.AllDirectories);
            foreach (var file in files)
            {
                var fileName = Path.GetFileNameWithoutExtension(path: file);
                var match = Regex.Match(input: fileName, pattern: @"[^\.]*$");
                var languageCode = match.Value;
                var catalog = await ParsePoFileAsync(poFilePath: file);
                var entries = catalog.Values;
                foreach (var entry in entries)
                {
                    var entryKey = entry.Key;
                    var key = entryKey.Id ?? "";
                    var pluralKey = entryKey.PluralId ?? "";
                    var context = entryKey.ContextId ?? "";

                    var pluralForms = entry.Select(selector: (value, i) =>
                    {
                        return new TemplateLocalizationPluralForm
                        {
                            Project = project,
                            Value = value,
                            PluralFormIndex = i
                        };
                    }).ToList();

                    var localization = new TemplateLocalization
                    {
                        PluralForms = pluralForms,
                        LanguageCode = languageCode,
                        Key = key,
                        PluralKey = pluralKey,
                        Context = context,
                        Project = project
                    };

                    await ProcessLocalization(project: project, data: data, localization: localization);

                    localizationsToPopulate.Add(item: localization);
                }
            }
        }
    }
}