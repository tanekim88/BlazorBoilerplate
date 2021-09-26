//%s:begin Header



using System.Collections.Generic;
using System.Threading.Tasks;
using SharedPresentation.Application.Interfaces.TranslationServiceInterfaces;
using SharedPresentation.Domain.Models;
using static SharedPresentation.Application.Interfaces.TranslationServiceInterfaces.ITranslationSharedUiService;



//%s:end Header


namespace SharedPresentation.Infrastructure.Services.TranslationServices
{
    //%s:begin Attributes
    //%s:end Attributes
    public class TranslationSharedUiService :
        /*%s:begin BaseClass*/ /*%s:end BaseClass*/
        ITranslationSharedUiService
    {
        //%s:begin Properties
        //%s:end Properties

        //%s:begin Body
        public Dictionary<string, string> Languages { get; set; } =
            new()
            {
                {"", "Default"},
                //{"af", "Afrikaans"},
                //{"sq", "Albanian"},
                //{"ar", "Arabic"},
                //{"hy", "Armenian"},
                //{"az", "Azerbaijani"},
                //{"eu", "Basque"},
                //{"be", "Belarusian"},
                //{"bn", "Bengali"},
                //{"bg", "Bulgarian"},
                //{"ca", "Catalan"},
                //{"zh-CN", "Chinese (Simplified)"},
                //{"zh-TW", "Chinese (Traditional)"},
                //{"hr", "Croatian"},
                //{"cs", "Czech"},
                //{"da", "Danish"},
                //{"nl", "Dutch"},
                {"en", "English"},
                //{"eo", "Esperanto"},
                //{"et", "Estonian"},
                //{"tl", "Filipino"},
                //{"fi", "Finnish"},
                //{"fr", "French"},
                //{"gl", "Galician"},
                //{"ka", "Georgian"},
                //{"de", "German"},
                //{"el", "Greek"},
                //{"gu", "Gujarati"},
                //{"ht", "Haitian Creole"},
                //{"iw", "Hebrew"},
                //{"hi", "Hindi"},
                //{"hu", "Hungarian"},
                //{"is", "Icelandic"},
                //{"id", "Indonesian"},
                //{"ga", "Irish"},
                //{"it", "Italian"},
                //{"ja", "Japanese"},
                //{"kn", "Kannada"},
                //{"km", "Khmer"},
                {"ko", "Korean"},
                //{"lo", "Lao"},
                //{"la", "Latin"},
                //{"lv", "Latvian"},
                //{"lt", "Lithuanian"},
                //{"mk", "Macedonian"},
                //{"ms", "Malay"},
                //{"mt", "Maltese"},
                //{"no", "Norwegian"},
                //{"fa", "Persian"},
                //{"pl", "Polish"},
                //{"pt", "Portuguese"},
                //{"ro", "Romanian"},
                //{"ru", "Russian"},
                //{"sr", "Serbian"},
                //{"sk", "Slovak"},
                //{"sl", "Slovenian"},
                {"es", "Spanish"}
                //{"sw", "Swahili"},
                //{"sv", "Swedish"},
                //{"ta", "Tamil"},
                //{"te", "Telugu"},
                //{"th", "Thai"},
                //{"tr", "Turkish"},
                //{"uk", "Ukrainian"},
                //{"ur", "Urdu"},
                //{"vi", "Vietnamese"},
                //{"cy", "Welsh"},
                //{"yi", "Yiddish"}
            };


        public virtual async Task<TranslateOutput> Translate(
            string languageToTranslateTo,
            string key,
            string pluralKey
        )
        {
            if (string.IsNullOrEmpty(value: languageToTranslateTo)) languageToTranslateTo = "en";

            return new TranslateOutput
            {
                PluralForms = new List<LocalizationPluralForm>
                {
                    new()
                    {
                        PluralFormIndex = 0,
                        Value = key,
                        LocalizationCatalogId = 0
                    }
                }
            };
        }

        //%s:end Body
    }
}