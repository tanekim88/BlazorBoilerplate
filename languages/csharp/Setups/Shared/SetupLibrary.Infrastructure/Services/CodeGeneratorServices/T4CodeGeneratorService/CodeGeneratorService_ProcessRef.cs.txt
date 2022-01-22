

using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public static class ABC
    {
        public static async Task<string> ReplaceAsync(this Regex regex, string input,
            Func<Match, Task<string>> replacementFn)
        {
            var sb = new StringBuilder();
            var lastIndex = 0;

            foreach (Match match in regex.Matches(input: input))
            {
                sb.Append(value: input, startIndex: lastIndex, count: match.Index - lastIndex)
                    .Append(value: await replacementFn(arg: match).ConfigureAwait(continueOnCapturedContext: false));

                lastIndex = match.Index + match.Length;
            }

            sb.Append(value: input, startIndex: lastIndex, count: input.Length - lastIndex);
            return sb.ToString();
        }
    }


    public partial class CodeGeneratorService
    {
        public async Task<string> GetReferenceRef(
            string inputString,
            TemplateData data,
            TemplateCodeType codeType)
        {
            var commandContent = GetFirstCommandContent(
                inputString: inputString,
                command: TemplateCommand.Ref,
                codeType: codeType);

            if (commandContent != null)
            {
                var toReturn = await new Regex(pattern: @"<#=(?<Expression>.*?)#>").ReplaceAsync(input: commandContent,
                    replacementFn: async match =>
                    {
                        return null;
                        //var expression = match.Groups[groupname: "Expression"].Value;
                        //var result = await _evalService.EvaluateExpression<string>(
                        //    code: expression,
                        //    parameters: new
                        //    {
                        //        Data = data
                        //    }
                        //);

                        //var pattern = @"^\s*Data\.(?<Domains>\w+)\.Find\(\s*(?<item>\w+)\s*=>\s*\k<item>.(?<PropertyToQuery>\w+)\s*==\s*""(?<Value>\w+)""\s*\)\.(?<Property>\w+)\s*$";
                        //expression = Regex.Replace(expression, pattern, (match) =>
                        //{
                        //    var domains = match.Groups["Domains"].Value;
                        //    //var item = matched.Groups["item"].Value;
                        //    var propertyToQuery = match.Groups["PropertyToQuery"].Value;
                        //    var value = match.Groups["Value"].Value;
                        //    var property = match.Groups["Property"].Value;
                        //    var items = (IList)data.GetType().GetProperty(domains).GetValue(data);
                        //    foreach (var item in items)
                        //    {
                        //        var itemValue = item.GetType().GetProperty(propertyToQuery).GetValue(item);
                        //        if (itemValue.Equals(value))
                        //        {
                        //            var propertyValue = item.GetType().GetProperty(property).GetValue(item).ToString();
                        //            return propertyValue;
                        //        }
                        //    }
                        //    return match.Value;
                        //}, RegexOptions.Singleline);


                        //return result.Payload;
                    });

                return toReturn;
            }

            return commandContent;
        }
    }
}