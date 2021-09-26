﻿

using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public ProcessContentsBodyOutput ProcessContentsBody(
                List<TemplateDirectory> directories,
                string text,
                TemplateCodeType codeType,
                List<TemplateTokenInfo> templateInfos,
                TemplateFile file
        )
        {
            text = codeType.RemoveTemplatePostfix(inputString: text, isPath: false);

            //var attributes = new List<TemplateAttribute>();

            foreach (var templateInfo in templateInfos)
            {
                var propertyPaths = templateInfo.PropertyPaths;
                var value = templateInfo.Value;

                var last = propertyPaths.Last();
                var rest = propertyPaths.SkipLast(count: 1);

                if (Regex.IsMatch(input: last, pattern: @"^[a-zA-Z]+$"))
                {
                    var tuples =
                        codeType.GetCasedNameAndCasedValueTuples_IncludingBothSingularAndPlural(name: last,
                            value: value);

                    var contentTuples = tuples.Select(selector: x =>
                        (Name: codeType.GetPropertyPathsName(propertyPaths: rest.Concat(second: new List<string> { x.Name }).ToList(), isPath: false),
                            x.Value)
                    ).ToList();

                    foreach (var contentTuple in contentTuples)
                    {
                        var currentTemplateNameForContent = codeType.GetTemplateName(inputName: contentTuple.Name);
                        var propSep = codeType.GetPropertyPathSeparator(false);

                        if (contentTuple.Name.Contains($"{propSep}00{propSep}"))
                        {
                            var values = contentTuple.Value.Split('|');

                            text = Regex.Replace(text, @$"(?<sep>[^\w""])?\b(?<pre>\w*?){currentTemplateNameForContent}(?<post>\w*?)\b", match =>
                            {

                                var pre = match.Groups["pre"].Value;
                                var post = match.Groups["post"].Value;
                                var sep = match.Groups["sep"].Value;

                                if (string.IsNullOrEmpty(sep))
                                {
                                    sep = ".";
                                }

                                if (string.IsNullOrEmpty(contentTuple.Value))
                                {
                                    return "";
                                }

                                var finalValues = values.Select(v => $"{pre}{v}{post}");
                                var finalValue = string.Join(sep, finalValues);
                                return $"{finalValue}";
                            });
                        }
                        else
                        {

                            text = codeType.ReplaceBasedOnCodeType(content: text, what: currentTemplateNameForContent,
                                replaceWith: contentTuple.Value);

                        }

                        text = codeType.ReplaceIgnoredNameInContent(inputString: text, name: contentTuple.Value);
                    }
                }
            }


            text = codeType.ReplaceWithCSharpExpressionForContent(inputString: text);

            text = codeType.ActivateTemplateSyntaxByUncommenting(intputString: text);
            text = codeType.ApplyUncommentCommand(intputString: text);

            text = codeType.ApplyIgnoreCommand(text: text);

            return new ProcessContentsBodyOutput
            {
                ProcessedText = text
            };
        }


        public record ProcessContentsBodyOutput
        {
            public string ProcessedText { get; init; }
        }
    }
}