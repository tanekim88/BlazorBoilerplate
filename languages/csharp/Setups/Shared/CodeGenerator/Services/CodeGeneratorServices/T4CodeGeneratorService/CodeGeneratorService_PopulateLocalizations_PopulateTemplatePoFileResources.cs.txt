

using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task PopulateTemplatePoFileResources(
            TemplateProject project,
            TemplateData data,
            string localizationCode,
            string poRegexToMatchMsgids,
            List<TemplateLocalization> localizationsToPopulate)
        {
            var potsDir = Path.GetFullPath(path: Path.Combine(path1: project.DirPath, path2: "Localizations",
                path3: "Templates", path4: "Pots"));

            if (!Directory.Exists(path: potsDir)) return;

            var localIds = Directory.EnumerateFiles(path: potsDir, searchPattern: "*.pot",
                    searchOption: SearchOption.TopDirectoryOnly)
                .SelectMany(selector: poFile =>
                {
                    var text = File.ReadAllText(path: poFile);
                    var matches = Regex.Matches(input: text, pattern: poRegexToMatchMsgids);

                    return matches.Select(selector: match => match.Groups[groupnum: 1].ToString());
                }).ToList();

            foreach (var localizationKey in localIds)
            {
                var localization = new TemplateLocalization
                {
                    Key = localizationKey,
                    LanguageCode = localizationCode
                };

                await TranslateLocalization(
                    project: project,
                    data: data,
                    localization: localization,
                    localizationsToPopulate: localizationsToPopulate);

                localizationsToPopulate.Add(item: localization);
            }
        }
    }
}