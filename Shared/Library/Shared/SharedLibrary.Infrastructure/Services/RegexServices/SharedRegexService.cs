/*%runIf: 
Data.Services.Exists(service => service.Groups[0].Name == "Regex" && service.Name == "Regex")
*/

//%t:begin Intro


//%t:end Intro

//%s:begin Header
//%s:end Header

//%t:begin Header



using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using SharedLibrary.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces;
using static SharedLibrary.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces.ISharedRegexService;



//%t:end Header


namespace SharedLibrary.Services.RegexServices
{
    //%s:begin Attributes
    //%s:end Attributes
    public class SharedRegexService :
        /*%s:begin BaseClass*/ /*%s:end BaseClass*/
        ISharedRegexService
    {
        //%s:begin Properties
        //%s:end Properties


        //%s:begin Body

        public GenerateRegexOutput GenerateRegex(GenerateRegexInput options)
        {
            var toContain = new List<string>();
            var toReturn = "";
            if (options.StartsWithTheseWords?.Count > 0)
            {
                var joinedByBar = string.Join(separator: '|',
                    values: options.StartsWithTheseWords.Select(selector: word => Regex.Escape(str: word)));
                toContain.Add(item: $"({joinedByBar})");
                toReturn += "^";
            }

            if (options.ContainsTheseWords?.Count > 0)
            {
                var joinedByBar = string.Join(separator: '|',
                    values: options.ContainsTheseWords.Select(selector: word => Regex.Escape(str: word)));
                toContain.Add(item: $".*({joinedByBar})");
            }

            if (options.EndsWithTheseWords?.Count > 0)
            {
                var joinedByBar = string.Join(separator: '|',
                    values: options.ContainsTheseWords.Select(selector: word => Regex.Escape(str: word) + "$"));

                toContain.Add(item: $".*({joinedByBar})");
            }

            if (toContain.Count > 0)
                toReturn += "(?=A)".Replace(oldValue: "A", newValue: string.Join(separator: "", values: toContain));

            var notToContain = new List<string>();

            if (options.DoesNotStartWithTheseWords?.Count > 0)
            {
                var joinedByBar = string.Join(separator: '|',
                    values: options.DoesNotStartWithTheseWords.Select(selector: word => Regex.Escape(str: word)));
                notToContain.Add(item: $"({joinedByBar})");
                toReturn += "^";
            }

            if (options.DoesNotContainTheseWords?.Count > 0)
            {
                var joinedByBar = string.Join(separator: '|',
                    values: options.DoesNotContainTheseWords.Select(selector: word => Regex.Escape(str: word)));
                notToContain.Add(item: $".*({joinedByBar})");
            }


            if (options.DoesNotContainTheseWords?.Count > 0)
            {
                var joinedByBar = string.Join(separator: '|',
                    values: options.DoesNotContainTheseWords.Select(selector: word => Regex.Escape(str: word) + "$"));
                notToContain.Add(item: $".*({joinedByBar})");
            }

            if (notToContain.Count > 0)
                toReturn += "(?!A)".Replace(oldValue: "A", newValue: string.Join(separator: "|", values: notToContain));

            var flags = RegexOptions.None;

            if (options.CaseInsensitive) flags |= RegexOptions.IgnoreCase;

            var result = new GenerateRegexOutput
            {
                Regex = new Regex(pattern: toReturn, options: flags)
            };

            return result;
        }


        public GetNamedRegexOutput GetNamedRegex(string name, string regexContent)
        {
            var toReturn = $"(?<{name}>{regexContent})";

            return new GetNamedRegexOutput
            {
                Text = toReturn
            };
        }


        public RemoveLinesWithOnlySpacesOutput RemoveLinesWithOnlySpaces(string text)
        {
            var textResult = Regex.Replace(input: text, pattern: @"^\s+$[\r\n]*", replacement: string.Empty,
                options: RegexOptions.Multiline);

            return new RemoveLinesWithOnlySpacesOutput
            {
                Text = textResult
            };
        }

        //%s:end Body
    }
}