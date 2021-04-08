

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Security;
using System.Text.RegularExpressions;
using Humanizer;
using SetupLibrary.Application.Models.Dictionaries;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateCodeType
    {
        //public string OrderBySymbol { get; set; } = "orderBy";
        //public string ForLoopSymbol { get; set; } = "for";
        //public string IfSymbol { get; set; } = "if";
        //public string EndSymbol { get; set; } = "end";
        //public string LabelStartSymbol { get; set; } = "label(";
        //public string LabelEndSymbol { get; set; } = ")";
        //public string TypeStartSymbol { get; set; } = "<";
        //public string TypeEndSymbol { get; set; } = ">";
        //public string PlaceHolderStartSymbol { get; set; } = "(";
        //public string PlaceHolderEndSymbol { get; set; } = ")";


        public readonly string _commandContentName = "CommandContent";
        public string Extension { get; set; } = ".cs";
        public string PropertyPathSeparatorForContent { get; set; } = "_";
        public string PropertyPathSeparatorForPath { get; set; } = "_";
        public string TemplateBeginSymbolForContent { get; set; } = "_";
        public string TemplateEndSymbolForContent { get; set; } = "_";
        public string TemplateBeginSymbolForPath { get; set; } = "_";
        public string TemplateEndSymbolForPath { get; set; } = "_";

        public static List<TemplateAttribute> TemplateAttributes { get; set; } = new()
        {
            new TemplateAttribute
            {
                Name = "With2Keys"
            },
            new TemplateAttribute
            {
                Name = "With3Keys"
            },
            new TemplateAttribute()
            {
                Name = "With4Keys"
            }
        };


        public string CamelCasePostfix { get; set; } = "CamelCase";
        public string PascalCasePostfix { get; set; } = "PascalCase";
        public string HumanCasePostfix { get; set; } = "HumanCase";
        public string HumanTitleCasePostfix { get; set; } = "HumanTitleCase";
        public string KebabCasePostfix { get; set; } = "KebabCase";
        public string SingLineCommentSymbol { get; set; } = "//";
        public string MultiLineCommentBeginSymbol { get; set; } = "/*";
        public string MultiLineCommentEndSymbol { get; set; } = "*/";
        public string T4TemplateExpressionCodePrefix { get; set; } = "<#=";
        public string T4TemplateCodePrefix { get; set; } = "<#";
        public string T4TemplateCodePostfix { get; set; } = "#>";
        public string CSharpExpressionPrefix { get; set; } = "CSBEGIN";
        public string CSharpExpressionPostfix { get; set; } = "CSEND";
        public string CSharpExpressionDotSymbol { get; set; } = "_";
        public string ContentNamePrefix { get; set; } = "__";
        public string ContentNamePostfix { get; set; } = "__";
        public string IgnoredNamePrefix { get; set; } = "_%_";
        public string IgnoredNamePostfix { get; set; } = "_%_";
        public string PathNamePrefix { get; set; } = "__";
        public string PathNamePostfix { get; set; } = "__";
        public string CommandSymbol { get; set; } = "%";
        public string CommandSeperatorSymbol { get; set; } = ";";
        public string AttributePrefix { get; set; } = "__";
        public string AttributePostfix { get; set; } = "__";

        public string GetPropertyPathSeparator(bool isPath)
        {
            if (isPath)
                return PropertyPathSeparatorForPath;
            return PropertyPathSeparatorForContent;
        }

        public string GetPropertyPathsName(List<string> propertyPaths, bool isPath)
        {
            string toReturn = string.Join(separator: GetPropertyPathSeparator(isPath: isPath),
                values: propertyPaths.Where(predicate: x => x != null).ToList());

            return toReturn;
        }

        public string GetTemplateSymbolName(string templateSymbol, bool isPath)
        {
            if (isPath)
                return $"{TemplateBeginSymbolForPath}{templateSymbol}{TemplateEndSymbolForPath}";
            return $"{TemplateBeginSymbolForContent}{templateSymbol}{TemplateEndSymbolForContent}";
        }


        public string RemoveTemplatePostfix(string inputString, bool isPath)
        {
            foreach (var genPostFix in new[]
            {
                "Gen",
                "Tmp"
            })
            {
                var regexes = GetTemplatePostfixRegexes(genPostFix: genPostFix, isPath: isPath);


                regexes.ForEach(action: regex =>
                {
                    inputString = Regex.Replace(input: inputString, pattern: regex, replacement: "$1",
                        options: RegexOptions.IgnoreCase);
                });
            }


            return inputString;
        }


        public List<string> GetTemplatePostfixRegexes(string genPostFix, bool isPath)
        {
            var codeGenSymbol = @"[a-zA-Z]*" + genPostFix;
            var token = GetTemplateSymbolName(templateSymbol: codeGenSymbol, isPath: isPath);
            var regexes = isPath
                ? new List<string>
                {
                    @$"{token}({Regex.Escape(str: Path.DirectorySeparatorChar.ToString())})",
                    @$"{token}(\.)"
                }
                : new List<string>
                {
                    @$"{token}(\b)"
                };


            return regexes;
        }

        public string GetAttributeName(string inputName)
        {
            return $"{AttributePrefix}{inputName}{AttributePostfix}";
        }

        public string GetTemplateName(string inputName, bool isPath = false)
        {
            var prefix = isPath ? PathNamePrefix : ContentNamePrefix;
            var postFix = isPath ? PathNamePostfix : ContentNamePostfix;

            return $"{prefix}{inputName}{postFix}";
        }

        public string GetSingleLineCommandRegex(string command)
        {
            var toReturn =
                $@"{Regex.Escape(str: SingLineCommentSymbol)}{Regex.Escape(str: CommandSymbol)}{command}(?!\w)[:\s]?{GetNamedRegex(name: _commandContentName, regexContent: @".*?")}\s*$";
            return toReturn;
        }

        public string GetMultiLineCommandRegex(string command)
        {
            var toReturn =
                $@"{Regex.Escape(str: MultiLineCommentBeginSymbol)}{Regex.Escape(str: CommandSymbol)}{command}(?!\w)[:\s]?{GetNamedRegex(name: _commandContentName, regexContent: @".*?")}\s*{Regex.Escape(str: MultiLineCommentEndSymbol)}";
            return toReturn;
        }

        public string ApplyIgnoreCommand(string text)
        {
            var beginIgnoreCommandString =
                $@"{Regex.Escape(str: SingLineCommentSymbol)}{Regex.Escape(str: CommandSymbol)}{TemplateCommand.IgnoreBegin}[:\s]?.*?(\n|\r|\r\n)";
            var endIgnoreCommandString =
                $@"{Regex.Escape(str: SingLineCommentSymbol)}{Regex.Escape(str: CommandSymbol)}{TemplateCommand.IgnoreEnd}[:\s]?.*?(\n|\r|\r\n)";

            var beginIgnoreCommandString_multi =
                $@"{Regex.Escape(str: MultiLineCommentBeginSymbol)}{Regex.Escape(str: CommandSymbol)}{TemplateCommand.IgnoreBegin}[:\s]?.*?{Regex.Escape(str: MultiLineCommentEndSymbol)}";
            var endIgnoreCommandString_multi =
                $@"{Regex.Escape(str: MultiLineCommentBeginSymbol)}{Regex.Escape(str: CommandSymbol)}{TemplateCommand.IgnoreEnd}[:\s]?.*?{Regex.Escape(str: MultiLineCommentEndSymbol)}";


            var regex =
                $@"(?<header>^|{endIgnoreCommandString}|{endIgnoreCommandString_multi})(?<body>.*?)(?<footer>{beginIgnoreCommandString}|{beginIgnoreCommandString_multi}|$)";

            var matches = Regex.Matches(input: text, pattern: regex, options: RegexOptions.Singleline);
            Console.WriteLine(value: "111111111111111111111111111");
            Console.WriteLine(value: matches.Count());
            text = Regex.Replace(input: text, pattern: regex, evaluator: match =>
            {
                var header = match.Groups[groupname: "header"].Value;
                var footer = match.Groups[groupname: "footer"].Value;
                var body = match.Groups[groupname: "body"].Value;

                var regex2 =
                    $@"(?<header>{ContentNamePrefix})(?<body>[a-zA-Z]+({PropertyPathSeparatorForContent}|[a-zA-Z0-9]+)*?)(?<footer>{ContentNamePostfix})";
                //var matches = Regex.Matches(body, reg, RegexOptions.Singleline);
                Console.WriteLine(value: "222222222222222");

                body = Regex.Replace(input: body, pattern: regex2, evaluator: match2 =>
                {
                    var header2 = match2.Groups[groupname: "header"].Value;
                    var footer2 = match2.Groups[groupname: "footer"].Value;
                    var body2 = match2.Groups[groupname: "body"].Value;
                    body2 = Regex.Replace(input: body2,
                        pattern:
                        $@"(?<header>{PropertyPathSeparatorForContent})(?<body>\d+)(?<footer>{PropertyPathSeparatorForContent})?",
                        replacement: "[${body}]${footer}");
                    var splitted = body2.Split(separator: PropertyPathSeparatorForContent);
                    var first = splitted.First();
                    var rest = splitted.Skip(count: 1).SkipLast(count: 1);
                    var last = splitted.Last();
                    first = first.Camelize().Singularize();

                    var finalList = new List<string> { first };

                    if (splitted.Count() == 1)
                    {
                        var result = ExtractValueFromCasedValue(casedValue: first);
                        first = result.Value + result.CaseCodePostfix;
                        finalList = new List<string> { first };
                    }
                    else
                    {
                        var result = ExtractValueFromCasedValue(casedValue: last);
                        last = result.Value + result.CaseCodePostfix;

                        finalList = finalList.Concat(second: rest).Concat(second: new List<string> { last }).ToList();
                    }

                    var final = string.Join(separator: '.', values: finalList);
                    return $@"{T4TemplateExpressionCodePrefix}({final}) ?? """" {T4TemplateCodePostfix}";
                }, options: RegexOptions.Singleline);
                return $@"{header}{body}{footer}";
            }, options: RegexOptions.Singleline);


            return text;
        }

        public ApplySectionCommandOutput ApplySectionCommand(
            string sourceContent,
            string targetContent,
            string sectionBeginCommand = TemplateCommand.SectionBegin,
            string sectionEndCommand = TemplateCommand.SectionEnd
            )
        {
            HashSet<string> foundSectionNames = new();
            if (sourceContent.Contains(value: "Url")) Console.WriteLine();
            Func<string, string, string?, string> regexFunc = (sectionBeginCommand, sectionEndCommand, name) =>
            {
                var nameRegex = string.IsNullOrEmpty(value: name) ? @"(?<name>\w+)" : name;
                var nameRegex2 = string.IsNullOrEmpty(value: name) ? @"\k<name>" : name;

                var beginSectionCommandString =
                    $@"{Regex.Escape(str: CommandSymbol)}{sectionBeginCommand}[:\s]{nameRegex}";
                var endSectionCommandString =
                    $@"{Regex.Escape(str: CommandSymbol)}{sectionEndCommand}[:\s]{nameRegex2}";

                var b = $@"{Regex.Escape(str: SingLineCommentSymbol)}{beginSectionCommandString}";
                var b2 =
                    $@"{Regex.Escape(str: MultiLineCommentBeginSymbol)}{beginSectionCommandString}{Regex.Escape(str: MultiLineCommentEndSymbol)}";

                var e = $@"{Regex.Escape(str: SingLineCommentSymbol)}{endSectionCommandString}.*?\n";
                var e2 =
                    $@"{Regex.Escape(str: MultiLineCommentBeginSymbol)}{endSectionCommandString}{Regex.Escape(str: MultiLineCommentEndSymbol)}";


                var regex = $@"(?<header>({b}|{b2}))(?<body>.*?)(?<footer>({e}|{e2}))";

                return regex;
            };

            var regex = regexFunc(arg1: sectionBeginCommand, arg2: sectionEndCommand, arg3: null);

            var matches = Regex.Matches(input: sourceContent, pattern: regex, options: RegexOptions.Singleline);

            foreach (Match match in matches)
            {
                var body = match.Groups[groupname: "body"].Value;
                var isBodyEmpty = Regex
                    .Match(input: body, pattern: @"^(\n|\r|\r\n|\s)*$", options: RegexOptions.Singleline).Success;
                var name = match.Groups[groupname: "name"].Value;
                if (!string.IsNullOrEmpty(value: name) && !isBodyEmpty)
                {
                    foundSectionNames.Add(item: name);
                    var regex2 = regexFunc(arg1: sectionBeginCommand.Pascalize(), arg2: sectionEndCommand.Pascalize(),
                        arg3: name);

                    targetContent = Regex.Replace(input: targetContent, pattern: regex2, evaluator: match =>
                    {
                        var header = match.Groups[groupname: "header"].Value
                            .Replace(oldValue: sectionBeginCommand.Pascalize(), newValue: sectionBeginCommand);
                        var footer = match.Groups[groupname: "footer"].Value
                            .Replace(oldValue: sectionEndCommand.Pascalize(), newValue: sectionEndCommand);

                        return header + body + footer;
                    }, options: RegexOptions.Singleline);
                }
            }


            return new ApplySectionCommandOutput
            {
                FoundSections = foundSectionNames.ToList(),
                ProcessedContent = targetContent
            };
        }

        //public List<TemplateAttribute> RemoveAttributes(string inputString, bool isPath)
        //{
        //    var toReturn = new List<TemplateAttribute>();
        //    TemplateAttributes.ForEach(attr =>
        //    {
        //        var templateAttrName = GetTemplateName(attr.Name, isPath);

        //        if (inputString.Contains(templateAttrName)) {
        //            toReturn.Add(attr);

        //        }
        //    });

        //    return 
        //}
        public string ApplyUncommentCommand(string intputString)
        {
            if (!string.IsNullOrEmpty(value: SingLineCommentSymbol))
            {
                var commandString = Regex.Escape(str: CommandSymbol) + TemplateCommand.Uncomment;
                intputString = Regex.Replace(input: intputString,
                    pattern: @$"{Regex.Escape(str: SingLineCommentSymbol)}{commandString}\s",
                    replacement: "");
            }

            if (!string.IsNullOrEmpty(value: MultiLineCommentBeginSymbol))
                intputString = Regex.Replace(input: intputString,
                    pattern: @$"{GetMultiLineCommandRegex(command: TemplateCommand.Uncomment)}",
                    replacement: "${CommandContent}");
            return intputString;
        }

        public string ApplyDeleteCommand(string intputString)
        {
            var beginDeleteCommandString = Regex.Escape(str: CommandSymbol) + TemplateCommand.DeleteBegin;
            var endDeleteCommandString = Regex.Escape(str: CommandSymbol) + TemplateCommand.DeleteEnd;
            if (!string.IsNullOrEmpty(value: SingLineCommentSymbol))
                intputString = Regex.Replace(input: intputString,
                    pattern:
                    @$"{Regex.Escape(str: SingLineCommentSymbol)}{beginDeleteCommandString}.*?{Regex.Escape(str: SingLineCommentSymbol)}{endDeleteCommandString}.*?\n",
                    replacement: "", options: RegexOptions.Singleline);
            if (!string.IsNullOrEmpty(value: MultiLineCommentBeginSymbol))
                intputString = Regex.Replace(input: intputString,
                    pattern:
                    @$"{GetMultiLineCommandRegex(command: TemplateCommand.DeleteBegin)}.*?{GetMultiLineCommandRegex(command: TemplateCommand.DeleteEnd)}",
                    replacement: "", options: RegexOptions.Singleline);
            return intputString;
        }


        public string RemoveCommandStrings(string intputString)
        {
            var toReturn = intputString;

            if (!string.IsNullOrEmpty(value: SingLineCommentSymbol))
                toReturn = Regex.Replace(input: toReturn,
                    pattern: @$"{GetSingleLineCommandRegex(command: @"(?!([Ss]ection:begin|[Ss]ection:end))")}.*",
                    replacement: "",
                    options: RegexOptions.Multiline);

            if (!string.IsNullOrEmpty(value: MultiLineCommentBeginSymbol))
                toReturn = Regex.Replace(input: toReturn,
                    pattern: @$"{GetMultiLineCommandRegex(command: @"(?!([Ss]ection:begin|[Ss]ection:end))")}",
                    replacement: "",
                    options: RegexOptions.Singleline);

            toReturn = toReturn.Replace(oldValue: "%S:begin", newValue: "%s:begin");
            toReturn = toReturn.Replace(oldValue: "%S:end", newValue: "%s:end");

            return toReturn;
        }

        public string AlignSingleLineTemplateCommands(string intputString)
        {
            if (!string.IsNullOrEmpty(value: SingLineCommentSymbol))
                intputString = Regex.Replace(input: intputString, pattern: @"^\s*<#([^=])", replacement: "<#$1",
                    options: RegexOptions.Multiline);

            return intputString;
        }


        public string GetNamedRegex(string name, string regexContent)
        {
            return $"(?<{Regex.Escape(str: name)}>{regexContent})";
        }


        public static TemplateCodeType GetCodeTypeFromExtension(string extension)
        {
            if (TemplateExtensionToCodeType.ExtensionToCodeTypeDic.TryGetValue(key: extension,
                value: out TemplateCodeType o))
                return TemplateExtensionToCodeType.ExtensionToCodeTypeDic[key: extension];

            return TemplateExtensionToCodeType.ExtensionToCodeTypeDic[key: ".cs"];
        }


        public string GetAllTemplateSymbolToken(TemplateProject project, bool isPath)
        {
            return GetTemplateName(inputName: project.GeneratorSymbol, isPath: isPath);
        }


        public string ActivateTemplateSyntaxByUncommenting(string intputString)
        {
            var toReturn = Regex.Replace(input: intputString, pattern: @$"{Regex.Escape(str: SingLineCommentSymbol)}<#",
                replacement: "<#");
            toReturn = Regex.Replace(input: toReturn,
                pattern:
                @$"{Regex.Escape(str: MultiLineCommentBeginSymbol)}<#(?<Content>.*?){Regex.Escape(str: MultiLineCommentEndSymbol)}",
                replacement: "<#${Content}", options: RegexOptions.Multiline);
            toReturn = Regex.Replace(input: toReturn,
                pattern:
                @$"{Regex.Escape(str: MultiLineCommentBeginSymbol)}(?<Content>.*?)#>{Regex.Escape(str: MultiLineCommentEndSymbol)}",
                replacement: "${Content}#>");
            return toReturn;
        }


        public string GetIgnoredTemplateName(string name)
        {
            return @$"{IgnoredNamePrefix}{name}{IgnoredNamePostfix}";
        }

        public string ReplaceIgnoredNameInContent(string inputString, string name)
        {
            var ignoredTemplateName = GetIgnoredTemplateName(name: name);
            var templateName = GetTemplateName(inputName: name);
            return inputString.Replace(oldValue: ignoredTemplateName, newValue: templateName);
        }

        public string ReplaceIgnoredNamesInContent(string inputString)
        {
            var toReturn = Regex.Replace(input: inputString,
                pattern:
                @$"{Regex.Escape(str: IgnoredNamePrefix)}(?<Content>\w+){Regex.Escape(str: IgnoredNamePostfix)}",
                replacement: $"{ContentNamePrefix}${{Content}}{ContentNamePostfix}");

            return toReturn;
        }

        public string ReplaceWithCSharpExpressionForContent(string inputString)
        {
            var csharpExpressionPrefixTemplateName =
                Regex.Escape(str: GetTemplateName(inputName: CSharpExpressionPrefix));
            var csharpExpressionPostfixTemplateName =
                Regex.Escape(str: GetTemplateName(inputName: CSharpExpressionPostfix));
            var pattern =
                $@"{Regex.Escape(str: csharpExpressionPrefixTemplateName)}(?<Content>\w*){Regex.Escape(str: csharpExpressionPostfixTemplateName)}";
            var toReturn = Regex.Replace(input: inputString, pattern: pattern, evaluator: RegexRead);

            return toReturn;
        }

        public string RegexRead(Match m)
        {
            var mat = m.Groups[groupname: "Content"].Value;
            return T4TemplateExpressionCodePrefix + mat.Replace(oldValue: CSharpExpressionDotSymbol, newValue: ".") +
                   T4TemplateCodePostfix;
        }

        public MatchTextAgainstCasedTemplateNameOutput MatchTextAgainstCasedTemplateName(
            string text,
            string parentName,
            string name,
            string argName = null,
            bool isArgNameOptional = false,
            bool isNameOptional = false,
            bool isPath = false
        )
        {
            var matches = GetCasedNameAndCasedValueTuples_IncludingBothSingularAndPlural(name: name, value: "")
                .Select(selector: casedName =>
                {
                    var nameRegex =
                        @$"({GetPropertyPathSeparator(isPath: isPath)}(?<Name>{casedName.Name})){(isNameOptional ? "?" : "")}";
                    var argRegex =
                        @$"({GetPropertyPathSeparator(isPath: isPath)}(?<ArgName>{argName})){(isArgNameOptional ? "?" : "")}";

                    var finalName = parentName + nameRegex + argRegex;
                    return GetTemplateName(inputName: finalName, isPath: isPath);
                })
                .Select(selector: templateName =>
                {
                    var match = Regex.Match(input: text, pattern: templateName);

                    return match;
                }).Where(predicate: match => match.Success).ToList();

            return new MatchTextAgainstCasedTemplateNameOutput { Matches = matches };
        }

        public List<(string Name, string Value)> GetCasedNameAndCasedValueTuples_IncludingBothSingularAndPlural(
            string name, string value)
        {
            var pascalName = ChangeNameCase(name: name, fun: input => input.Pascalize());
            var pascalPluralName = ChangeNameCase(name: pascalName, fun: input => input + "Plural");

            var pluralValue = ChangeCase(name: value, fun: input => input.Pluralize());

            var toReturn = new List<(string, string, bool)>
                {(pascalName, value, false), (pascalPluralName, pluralValue, true)}.SelectMany(selector: arg =>
            {
                var (name, value, isPlural) = arg;
                var camelName = ChangeNameCase(name: name, fun: input => input.Camelize());

                var toReturn = new List<(string, string)>
                {
                    (name + (isPlural ? "Case" : ""), value),
                    (camelName + (isPlural ? "Case" : ""), ChangeCase(name: value, fun: input => input.Camelize())),
                    (name + CamelCasePostfix, ChangeCase(name: value, fun: input => input.Pascalize())),
                    (name + PascalCasePostfix, ChangeCase(name: value, fun: input => input.Pascalize())),
                    (name + KebabCasePostfix, ChangeCase(name: value, fun: input => input.Kebaberize())),
                    (name + HumanCasePostfix, ChangeCase(name: value, fun: input => input.Humanize())),
                    (name + HumanTitleCasePostfix,
                        ChangeCase(name: value, fun: input => input.Humanize(casing: LetterCasing.Title)))
                };

                return toReturn;
            }).ToList();


            return toReturn;
        }


        public List<(string Name, string Value)> GetCasedNameAndCasedValueTuples(string name, string value)
        {
            var pascalName = ChangeNameCase(name: name, fun: input => input.Pluralize());
            var pascalPluralName = ChangeNameCase(name: pascalName, fun: input => input.Pluralize());

            var pluralValue = ChangeCase(name: value, fun: input => input.Pluralize());

            var toReturn = new List<(string, string)> { (pascalName, value) }.SelectMany(selector: arg =>
              {
                  var (name, value) = arg;
                  var camelName = ChangeNameCase(name: name, fun: input => input.Camelize());

                  var toReturn = new List<(string, string)>
                  {
                    (name, value),
                    (camelName, ChangeCase(name: value, fun: input => input.Camelize())),
                    (name + PascalCasePostfix, ChangeCase(name: value, fun: input => input.Pascalize())),
                    (name + KebabCasePostfix, ChangeCase(name: value, fun: input => input.Kebaberize())),
                    (name + HumanCasePostfix, ChangeCase(name: value, fun: input => input.Humanize())),
                    (name + HumanTitleCasePostfix,
                        ChangeCase(name: value, fun: input => input.Humanize(casing: LetterCasing.Title)))
                  };

                  return toReturn;
              }).ToList();


            return toReturn;
        }

        public string ChangeCase(string name, Func<string, string> fun)
        {
            if (name.Contains(value: "_"))
            {
                var splittedBy_ = name.Split(separator: "_");
                var last = splittedBy_.Last();
                var rest = splittedBy_.SkipLast(count: 1);
                var restJoined = string.Join(separator: "_", values: rest);
                var casedLast = fun(arg: last);
                var toReturn = string.Join(separator: "_", restJoined, casedLast);
                return toReturn;
            }

            var splitted = Regex.Split(input: name, pattern: @"([^a-zA-Z\\])").Select(selector: partName =>
            {
                if (partName != "")
                {
                    if (partName.Contains(value: @"\")) return partName;

                    return fun(arg: partName);
                }

                return "";
            });


            return string.Join(separator: "", values: splitted);
        }


        public string ChangeNameCase(string name, Func<string, string> fun)
        {
            if (name.Contains(value: "_"))
            {
                var splittedBy_ = name.Split(separator: "_");
                var last = splittedBy_.Last();
                var rest = splittedBy_.SkipLast(count: 1);
                var restJoined = string.Join(separator: "_", values: rest);
                var casedLast = fun(arg: last);
                var toReturn = string.Join(separator: "_", restJoined, casedLast);
                return toReturn;
            }

            var splitted = Regex.Split(input: name, pattern: @"([^a-zA-Z\\])").Select(selector: partName =>
            {
                if (partName != "")
                {
                    if (partName.Contains(value: @"\")) return partName;

                    return fun(arg: partName);
                }

                return "";
            });

            return string.Join(separator: "", values: splitted);
        }


        public string ApplyAliasses(string content)
        {
            content = content
                .Replace(oldValue: "__Alias_Prefix__", newValue: "__Context_Project_Prefix__")
                .Replace(oldValue: "__Alias_Postfix__", newValue: "__Context_Project_Postfix__");

            return content;
        }

        public string ReplaceBasedOnCodeType(string content, string what, string replaceWith)
        {
            switch (Extension)
            {
                case ".resx":
                    replaceWith = SecurityElement.Escape(str: replaceWith);
                    break;
            }

            return content.Replace(oldValue: what, newValue: replaceWith);
        }

        public ExtractValueFromCasedValue_Output ExtractValueFromCasedValue(string casedValue)
        {
            var match = Regex.Match(input: casedValue,
                pattern:
                @"(?<value>\w+?)(?<plural>Plural)?(Case)?(?<case>PascalCase|HumanCase|HumanTitleCase|CamelCase)?$");
            var value = match.Groups[groupname: "value"].Value;
            var caseStr = match.Groups[groupname: "case"].Value;
            var plural = match.Groups[groupname: "plural"].Value;

            var isPlural = !string.IsNullOrEmpty(value: plural);

            if (char.IsLower(c: value[index: 0])) caseStr = "CamelCase";

            var caseCodePostfix = caseStr switch
            {
                "PascalCase" => ".Pascalize()",
                "CamelCase" => ".Camelize()",
                "HumanCase" => ".Humanize()",
                "HumanTitileCase" => ".Humanize(LetterCasing.Title)",
                "KebabCase" => ".Kebaberize()",
                _ => ""
            };

            return new ExtractValueFromCasedValue_Output
            {
                Value = char.ToUpper(c: value[index: 0]) + value.Substring(startIndex: 1),
                Case = caseStr,
                IsPlural = isPlural,
                CaseCodePostfix = (isPlural ? ".Pluralize()" : "") + caseCodePostfix
            };
        }

        public class ApplySectionCommandOutput
        {
            public string ProcessedContent { get; set; }
            public List<string> FoundSections { get; set; }
        }

        public record MatchTextAgainstCasedTemplateNameOutput
        {
            public List<Match> Matches { get; init; }
        }


        public class ExtractValueFromCasedValue_Output
        {
            public bool IsPlural { get; set; }
            public string Value { get; set; }
            public string Case { get; set; }
            public string CaseCodePostfix { get; set; }
        }
    }
}