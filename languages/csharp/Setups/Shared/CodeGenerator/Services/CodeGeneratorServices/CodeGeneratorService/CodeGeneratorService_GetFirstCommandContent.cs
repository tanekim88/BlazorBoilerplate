

using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CodeGenerator.Models;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public class GetFirstCommandContentOutput
        {
            public bool Success { get; set; }
            public string? Payload { get; set; }
        }
        public async Task<GetFirstCommandContentOutput> GetFirstCommandContentAsync(string inputString, string command, TemplateCodeType codeType)
        {
            Match matches = null;
            if (!string.IsNullOrEmpty(value: codeType.SingLineCommentSymbol))
            {
                var localMatches = Regex.Match(input: inputString,
                    pattern: codeType.GetSingleLineCommandRegex(command: command),
                    options: RegexOptions.Multiline);
                if (localMatches.Success) matches = localMatches;
            }

            if (!string.IsNullOrEmpty(value: codeType.MultiLineCommentBeginSymbol) && matches == null)
            {
                var localMatches = Regex.Match(input: inputString,
                    pattern: codeType.GetMultiLineCommandRegex(command: command),
                    options: RegexOptions.Singleline);
                if (localMatches.Success) matches = localMatches;
            }

            if (matches != null)
            {
                var commandContent = matches.Groups[groupname: $"{codeType._commandContentName}"].Value;

                var toReturn = commandContent.Trim();
                return new GetFirstCommandContentOutput
                {
                    Payload = toReturn,
                    Success = true
                };
            }

            return new GetFirstCommandContentOutput
            {
                Payload = null,
                Success = false
            };
        }
    }
}