using CodeGenerator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;



namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData>
    {
        public List<TemplateTokenInfo> GetMatchingNames(
            int maxLength,
            bool isPath,
            List<string> candidates,
            Type objectType,
            TemplateCodeType codeType,
            string text,
            string parentName = null,
            List<string> parentPropertyPaths = null,
            List<TemplateTokenInfo> toReturn = null)
        {
            if (parentPropertyPaths == null) parentPropertyPaths = new List<string>();

            var listOfCombinedPaths = new List<string>
            {
                string.Join(separator: codeType.GetPropertySeparator(isPath: isPath), values: parentPropertyPaths)
            };

            if (toReturn == null) toReturn = new List<TemplateTokenInfo>();

            if (parentName?.Length > maxLength) return toReturn;

            var lastPath = parentPropertyPaths.LastOrDefault();
            var restPaths = parentPropertyPaths.SkipLast(count: 1).ToList();
            if (lastPath != null && Regex.IsMatch(input: lastPath, pattern: @"\w+"))
            {
                var sep = codeType.GetPropertySeparator(isPath);
                var tuples =
                    codeType.GetCasedNameAndCasedValueTuples_IncludingBothSingularAndPlural(name: lastPath, value: "", sep);
                listOfCombinedPaths = tuples.Select(selector: x =>
                        codeType.GetPropertyPathsName(
                            propertyPaths: restPaths.Concat(second: new List<string> { x.Name }).ToList(),
                            isPath: isPath))
                    .ToList();
            }

            var matchFound = candidates.Any(predicate: candidate =>
            {
                if (string.IsNullOrEmpty(value: listOfCombinedPaths[index: 0])) return true;

                var found = listOfCombinedPaths.FirstOrDefault(predicate: x => x == candidate);

                if (found != null)
                {
                    return true;
                }

                found = listOfCombinedPaths.FirstOrDefault(predicate: x =>
                    candidate.StartsWith(value: x + codeType.GetPropertySeparator(isPath: isPath)));

                if (found != null) return true;

                return false;
            });

            if (!matchFound) return toReturn;

            var foundTokenName = codeType.GetPropertyPathsName(propertyPaths: parentPropertyPaths, isPath: isPath);

            if (objectType.IsEnumerableType() && objectType.IsGenericType)
            {
                var isDict = objectType.IsGenericType &&
                             objectType.GetGenericTypeDefinition() == typeof(Dictionary<,>);

                if (isDict)
                {
                    var keyType = objectType.GetGenericArguments()[0];
                    var valueType = objectType.GetGenericArguments()[1];

                    var firstMatch = codeType.MatchTextAgainstCasedTemplateName(
                        text: text,
                        parentName: parentName,
                        name: "Key",
                        isPath: isPath,
                        codeType: codeType
                    ).Matches.FirstOrDefault();

                    if (firstMatch != null && firstMatch.Success)
                    {
                        var currentName = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                            {
                                parentName, firstMatch.Groups[groupname: "Name"].Value
                            },
                            isPath: isPath);

                        GetMatchingNames(
                            maxLength: maxLength,
                            isPath: isPath,
                            candidates: candidates,
                            objectType: keyType,
                            codeType: codeType,
                            text: text,
                            parentName: currentName,
                            parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                            {
                                firstMatch.Groups[groupname: "Name"].Value
                            }).ToList(),
                            toReturn: toReturn);
                    }


                    var firstMatch2 = codeType.MatchTextAgainstCasedTemplateName(
                        text: text,
                        parentName: parentName,
                        name: "DotKey",
                        isPath: isPath,
                        codeType: codeType
                    ).Matches.FirstOrDefault();

                    if (firstMatch2 != null && firstMatch2.Success)
                    {
                        var currentName = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                            {
                                parentName, firstMatch.Groups[groupname: "Name"].Value
                            },
                            isPath: isPath);

                        GetMatchingNames(
                            maxLength: maxLength,
                            isPath: isPath,
                            candidates: candidates,
                            objectType: keyType,
                            codeType: codeType,
                            text: text,
                            parentName: currentName,
                            parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                            {
                                firstMatch.Groups[groupname: "Name"].Value
                            }).ToList(),
                            toReturn: toReturn);
                    }


                    var pattern2 = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                    {
                        parentName,
                        "RawKey"
                    }, isPath: isPath);

                    var result2 = Regex.Match(input: text, pattern: pattern2);

                    if (result2.Success)
                    {
                        var currentName = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                        {
                            parentName, "RawKey"
                        }, isPath: isPath);

                        GetMatchingNames(
                            maxLength: maxLength,
                            isPath: isPath,
                            candidates: candidates,
                            objectType: keyType,
                            codeType: codeType,
                            text: text,
                            parentName: currentName,
                            parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                            {
                                "RawKey"
                            }).ToList(),
                            toReturn: toReturn);
                    }


                    var isSystemType = valueType.FullName.StartsWith(value: "System.");

                    if (isSystemType)
                    {
                        var matches = codeType.MatchTextAgainstCasedTemplateName(
                            text: text,
                            parentName: parentName,
                            name: "WithRawKey",
                            argName: @"(?<Matched>[a-zA-Z\d]*)",
                            isPath: isPath,
                            codeType: codeType
                        ).Matches;

                        foreach (var match in matches)
                            if (match.Success)
                            {
                                var currentName = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                                {
                                    parentName,
                                    match.Groups[groupname: "Name"].Value,
                                    match.Groups[groupname: "Matched"].Value
                                }, isPath: isPath);

                                GetMatchingNames(
                                    maxLength: maxLength,
                                    isPath: isPath,
                                    candidates: candidates,
                                    objectType: keyType,
                                    codeType: codeType,
                                    text: text,
                                    parentName: currentName,
                                    parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                                    {
                                        match.Groups[groupname: "Name"].Value,
                                        match.Groups[groupname: "Matched"].Value
                                    }).ToList(),
                                    toReturn: toReturn);
                            }
                    }
                    else
                    {
                        var pattern = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                        {
                            parentName,
                            "Values"
                        }, isPath: isPath);

                        var result = Regex.Match(input: text, pattern: pattern);

                        if (result.Success)
                            GetMatchingNames(
                                maxLength: maxLength,
                                isPath: isPath,
                                candidates: candidates,
                                objectType: valueType,
                                codeType: codeType,
                                text: text,
                                parentName: result.Value,
                                parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                                {
                                    "Values"
                                }).ToList(),
                                toReturn: toReturn);
                    }
                }
                else
                {
                    //List 

                    var elementType = GetAnyElementType(type: objectType);
                    var isSystemType = elementType.FullName.StartsWith(value: "System.");
                    if (isSystemType)
                    {
                        var pattern = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                        {
                            parentName,
                            @"(?<Matched>\d+)"
                        }, isPath: isPath);

                        var result = codeType.MatchTextAgainstCasedTemplateName(
                            text: text,
                            parentName: pattern,
                            name: "Value",
                            isNameOptional: true,
                            isPath: isPath,
                            codeType: codeType
                        );

                        foreach (var match in result.Matches.Where(predicate: x => x.Success)
                            .GroupBy(keySelector: m => m.Value)
                            .Select(selector: m => m.First()))
                            if (match.Success)
                            {
                                var currentName = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                                {
                                    parentName,
                                    match.Groups[groupname: "Matched"].Value,
                                    match.Groups[groupname: "Name"].Value
                                }.Where(predicate: x => !string.IsNullOrEmpty(value: x)).ToList(), isPath: isPath);

                                GetMatchingNames(
                                    maxLength: maxLength,
                                    isPath: isPath,
                                    candidates: candidates,
                                    objectType: elementType,
                                    codeType: codeType,
                                    text: text,
                                    parentName: currentName,
                                    parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                                    {
                                        match.Groups[groupname: "Matched"].Value,
                                        match.Groups[groupname: "Name"].Value
                                    }.Where(predicate: x => !string.IsNullOrEmpty(value: x)).ToList()).ToList(),
                                    toReturn: toReturn);
                            }
                    }
                    else
                    {
                        var pattern = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                        {
                            parentName,
                            $@"(?<Matched>\d+)(?={codeType.GetPropertySeparator(isPath: isPath)}[a-zA-Z\d]+)"
                        }, isPath: isPath);

                        var matches = Regex.Matches(input: text, pattern: pattern);

                        foreach (var match in matches.Where(predicate: x => x.Success)
                            .GroupBy(keySelector: m => m.Value)
                            .Select(selector: m => m.First()))
                            GetMatchingNames(
                                maxLength: maxLength,
                                isPath: isPath,
                                candidates: candidates,
                                objectType: elementType,
                                codeType: codeType,
                                text: text,
                                parentName: match.Value,
                                parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                                {
                                    match.Groups[groupname: "Matched"].Value
                                }).ToList(),
                                toReturn: toReturn);

                        var pattern2 = codeType.GetPropertyPathsName(propertyPaths: new List<string>
                        {
                            parentName,
                            @"(?=[a-zA-Z]+)"
                        }, isPath: isPath);

                        var matched = Regex.Match(input: text, pattern: pattern2);

                        if (matched.Success)
                            GetMatchingNames(
                                maxLength: maxLength,
                                isPath: isPath,
                                candidates: candidates,
                                objectType: elementType,
                                codeType: codeType,
                                text: text,
                                parentName: parentName,
                                parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>()).ToList(),
                                toReturn: toReturn);
                    }
                }
            }
            else
            {
                var isSystemType = objectType.FullName.StartsWith(value: "System.");

                if (objectType.IsClass && !isSystemType)
                {
                    // Class 
                    var properties = objectType.GetProperties();

                    foreach (var propInfo in properties)
                    {
                        var propObjectType = propInfo.PropertyType;

                        var propName = propInfo.Name;

                        var navigatable = false;

                        var isFromSystem = propInfo.PropertyType.FullName.StartsWith(value: "System.");

                        if (
                            propObjectType.IsEnumerableType() && propInfo.PropertyType.IsGenericType ||
                            propObjectType.IsClass && !isFromSystem
                        )
                        {
                            GetMatchingNames(
                                maxLength: maxLength,
                                isPath: isPath,
                                candidates: candidates,
                                objectType: propObjectType,
                                codeType: codeType,
                                text: text,
                                parentName: codeType.GetPropertyPathsName(
                                    propertyPaths: new List<string> { parentName, propInfo.Name }, isPath: isPath),
                                parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                                {
                                    propInfo.Name
                                }).ToList(),
                                toReturn: toReturn);
                        }
                        else
                        {
                            var currentName =
                                codeType.GetPropertyPathsName(
                                    propertyPaths: new List<string> { parentName, propInfo.Name }, isPath: isPath);

                            GetMatchingNames(
                                maxLength: maxLength,
                                isPath: isPath,
                                candidates: candidates,
                                objectType: propInfo.PropertyType,
                                codeType: codeType,
                                text: text,
                                parentName: currentName,
                                parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>
                                {
                                    propInfo.Name
                                }).ToList(),
                                toReturn: toReturn);
                        }
                    }
                }
                else
                {
                    // Primitive
                    var toAdd = new TemplateTokenInfo
                    {
                        PropertyPaths = parentPropertyPaths,
                        CurrentName = foundTokenName
                    };

                    toReturn.Add(item: toAdd);
                }
            }


            return toReturn;
        }

        public static Type GetAnyElementType(Type type)
        {
            if (type.IsArray)
                return type.GetElementType();
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                return type.GetGenericArguments()[0];

            var enumType = type.GetInterfaces()
                .Where(predicate: t => t.IsGenericType &&
                                       t.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                .Select(selector: t => t.GenericTypeArguments[0]).FirstOrDefault();
            return enumType ?? type;
        }
    }
}