

using System.IO;
using System.Text;
using System.Threading.Tasks;
using Karambolo.PO;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData>
    {
        public async Task<POCatalog> ParsePoFileAsync(string poFilePath)
        {
            var settings = new POParserSettings();

            var parser = new POParser(settings: settings);

            POParseResult result;
            using (var reader = new StreamReader(path: poFilePath, encoding: Encoding.UTF8))
            {
                result = parser.Parse(reader: reader);
            }

            if (result.Success)
            {
                var catalog = result.Catalog;
                // process the parsed data...
                return catalog;
            }

            var diagnostics = result.Diagnostics;
            // examine diagnostics, display an error, etc...

            return null;
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