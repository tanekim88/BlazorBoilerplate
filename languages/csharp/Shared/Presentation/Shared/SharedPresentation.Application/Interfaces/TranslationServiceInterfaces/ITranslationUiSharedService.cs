

using System.Collections.Generic;
using System.Threading.Tasks;
using SharedPresentation.Domain.Models;



namespace SharedPresentation.Application.Interfaces.TranslationServiceInterfaces
{
    public interface ITranslationSharedUiService
    {
        Dictionary<string, string> Languages { get; set; }

        Task<TranslateOutput> Translate(
            string languageToTranslateTo,
            string key,
            string pluralKey
        );

        public class TranslateOutput
        {
            public List<LocalizationPluralForm> PluralForms { get; init; }
        }
    }
}