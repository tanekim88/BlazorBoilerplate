

using System.Collections.Generic;
using System.Text.RegularExpressions;



namespace SharedLibrary.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces
{
    public interface ISharedRegexService
    {
        GenerateRegexOutput GenerateRegex(GenerateRegexInput options);

        GetNamedRegexOutput GetNamedRegex(string name, string regexContent);

        RemoveLinesWithOnlySpacesOutput RemoveLinesWithOnlySpaces(string text);

        public record GenerateRegexInput
        {
            public List<string> StartsWithTheseWords { get; set; }
            public List<string> DoesNotStartWithTheseWords { get; set; }

            public List<string> ContainsTheseWords { get; set; }
            public List<string> DoesNotContainTheseWords { get; set; }

            public List<string> EndsWithTheseWords { get; set; }
            public List<string> DoesNotEndsWithTheseWords { get; set; }

            public bool CaseInsensitive { get; set; }
        }

        public record GenerateRegexOutput
        {
            public Regex Regex { get; set; }

            public string RegexString { get; set; }
        }


        public record GetNamedRegexOutput
        {
            public string Text { get; set; }
        }

        public record RemoveLinesWithOnlySpacesOutput
        {
            public string Text { get; set; }
        }
    }
}