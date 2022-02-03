

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData>
    {
        public async Task PopulateLocalizations(TemplateData data)
        {
            var projects = data.Projects;

            var hashSet = new HashSet<string>();

            foreach (var project in projects)
            {
                var key = project.Name + "|Localizations";

                var localizations = new List<TemplateLocalization>();

                if (Cache.TryGetValue(key: key, value: out var value))
                {
                    localizations = (List<TemplateLocalization>) value;
                }
                else
                {
                    PopulateLocalizations_ExtractPos(project: project);

                    var poRegexToMatchMsgids = @"msgid\s*""(.*)""";

                    await PopulateCustomPoFileResources(
                        project: project,
                        data: data,
                        localizationsToPopulate: localizations);


                    foreach (var language in _translationUiService.Languages)
                    {
                        var localizationCode = language.Key;

                        await PopulateEnumResources(
                            project: project,
                            data: data,
                            localizationLanguageCode: localizationCode,
                            localizationsToPopulate: localizations);

                        await PopulateTemplatePoFileResources(
                            project: project,
                            data: data,
                            localizationCode: localizationCode,
                            poRegexToMatchMsgids: poRegexToMatchMsgids,
                            localizationsToPopulate: localizations
                        );
                    }

                    Cache.TryAdd(key: key, value: localizations);
                }

                foreach (var localization in localizations)
                    await PopulateData(project: project, data: data, cacheHashSet: hashSet, localization: localization);
            }
        }

        public async Task ProcessLocalization(
            TemplateProject project,
            TemplateData data,
            TemplateLocalization localization)
        {
            localization.UnderscoredLanguageCode = localization.LanguageCode.Replace(oldChar: '-', newChar: '_');
            localization.DotLanguageCode = !string.IsNullOrEmpty(value: localization.LanguageCode)
                ? "." + localization.LanguageCode
                : "";
            if (localization.Context != null) { 
                localization.ContextCodeName = localization.Context.Replace(oldChar: '.', newChar: ' ').Pascalize();
            }

            localization.Project = project;
        }


        public async Task PopulateData(
            TemplateProject project,
            TemplateData data,
            HashSet<string> cacheHashSet,
            TemplateLocalization localization)
        {
            var cacheKey = GetCacheKey(localization: localization);

            if (!cacheHashSet.TryGetValue(equalValue: cacheKey, actualValue: out var v))
            {
                data.Localizations.Add(item: localization);

                cacheHashSet.Add(item: cacheKey);
            }
        }

        public async Task TranslateLocalization(
            TemplateProject project,
            TemplateData data,
            TemplateLocalization localization,
            List<TemplateLocalization> localizationsToPopulate)
        {
            var result = await _translationUiService.Translate(
                languageToTranslateTo: localization.LanguageCode,
                key: localization.Key,
                pluralKey: localization.PluralKey
            );

            localization.PluralForms = result.PluralForms.Select(selector: pluralForm =>
                new TemplateLocalizationPluralForm
                {
                    Value = pluralForm.Value,
                    PluralFormIndex = pluralForm.PluralFormIndex,
                    Project = project
                }).ToList();
        }

        public string GetCacheKey(TemplateLocalization localization)
        {
            return localization.Key + "|" + localization.LanguageCode;
        }
    }
}