﻿

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Humanizer;
using Core.Infrastructure.Extensions.ObjectExtensions;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task PopulateEnumResources(
            TemplateProject project,
            TemplateData data,
            string localizationLanguageCode,
            List<TemplateLocalization> localizationsToPopulate)
        {
            var enumTypes = project.Assembly.GetTypes()
                .Where(predicate: t => t.Namespace != null && t.Namespace.StartsWith(value: $"{project.Name}.Enums."));

            var enumDict = new Dictionary<string, bool>();
            foreach (var type in enumTypes)
            {
                var enumValues = Enum.GetValues(enumType: type);

                foreach (var enumValue in enumValues)
                {
                    var attrResult = enumValue.GetDescriptionAttributeValue();
                    var localizationKey = attrResult.Value;

                    if (!attrResult.Success) localizationKey = localizationKey.Humanize();


                    if (localizationLanguageCode != "en" && !string.IsNullOrEmpty(value: localizationLanguageCode) &&
                        false)
                    {
                        var result = await _translationUiService.Translate(
                            languageToTranslateTo: localizationLanguageCode,
                            key: localizationKey,
                            pluralKey: null
                        );
                    }

                    var key = $"{type.Name}.{enumValue}";
                    var localizationMethodName = Regex.Replace(input: key, pattern: @"\W", replacement: "_");

                    if (!char.IsLetter(c: localizationMethodName[index: 0]))
                        localizationMethodName = "_" + localizationMethodName;


                    var localization = new TemplateLocalization
                    {
                        Key = localizationKey,
                        LanguageCode = localizationLanguageCode,
                        MethodName = localizationMethodName
                    };

                    await TranslateLocalization(project: project, data: data, localization: localization,
                        localizationsToPopulate: localizationsToPopulate);


                    var cacheKey = GetCacheKey(localization: localization);

                    var found = localizationsToPopulate.Find(match: localization2 =>
                    {
                        var cacheKey2 = GetCacheKey(localization: localization2);
                        return cacheKey == cacheKey2;
                    });

                    if (found != null) found.MethodName = localizationMethodName;

                    localizationsToPopulate.Add(item: localization);
                }
            }
        }
    }
}


//var catalog = new POCatalog();

//// setting comments for the header item
//catalog.HeaderComments = new POComment[]
//{
//    new POTranslatorComment { Text = "Some header comment" }
//};

//// setting required headers
//catalog.Encoding = "UTF-8";
//catalog.PluralFormCount = 2;
//catalog.PluralFormSelector = "(n != 1)";
//catalog.Language = "en_US";

//// setting custom headers
//catalog.Headers = new Dictionary<string, string>
//{
//    { "POT-Creation-Date", "2018-08-01 12:34+0000" },
//    { "Project-Id-Version", "Some Awesome App 1.0" },
//    { "X-Generator", "My Awesome PO Generator Tool 1.0" },
//};

//// adding a plural entry with text context and all kinds of comments
//var key = new POKey("{0} user", "{0} users", "/Views/Home/Index");
//IPOEntry entry = new POPluralEntry(key)
//{
//    "Translation of {0} user",
//    "Translation of {0} users",
//};
//entry.Comments = new POComment[]
//{
//    new POTranslatorComment { Text = "Some translator comment" },
//    new POExtractedComment { Text = "Some extracted comment" },
//    new POReferenceComment { References = new POSourceReference[] { new POSourceReference("/Views/Home/Index.cshtml", 8) } },
//    new POFlagsComment { Flags = new HashSet<string> { "fuzzy" } },
//    new POPreviousValueComment { IdKind = POIdKind.Id, Value = "{0} user logged in." },
//    new POPreviousValueComment { IdKind = POIdKind.PluralId, Value = "{0} users logged in." },
//};
//catalog.Add(entry);

//// adding a singular entry with multi-line text
//key = new POKey($"Multi-line{Environment.NewLine}text.");
//entry = new POSingularEntry(key)
//{
//    Translation = $"Translation of multi-line{Environment.NewLine}text."
//};
//catalog.Add(entry);