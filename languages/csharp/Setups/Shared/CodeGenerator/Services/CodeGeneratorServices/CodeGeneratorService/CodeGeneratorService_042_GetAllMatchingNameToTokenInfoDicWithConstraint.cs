

using Humanizer;
using CodeGenerator.Models;
using CodeGenerator.Services.IdServices;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData, TFile, TTokenInfo> where TFile : TemplateFile<TData> where TTokenInfo : TemplateTokenInfo<TData>
    {
        public List<TemplateTokenInfo<TData>> GetAllMatchingNameToTokenInfoDicWithConstraint(
            bool isPath,
            TemplateTokenInfo<TData> matchingToken,
            TemplateCodeType codeType,
            string text,
            object obj,
            List<TemplateTokenInfo<TData>> constraints = null,
            string parentName = null,
            List<string> parentPropertyPaths = null,
            List<string> allParentPropertyPaths = null,
            List<TemplateAttribute> attributes = null,
            List<string> parentGroupIds = null,
            List<string> parentIds = null,
            List<object> parentObjects = null,
            List<TemplateTokenInfo<TData>> toReturn = null)
        {
            if (toReturn == null) toReturn = new List<TemplateTokenInfo<TData>>();

            if (parentGroupIds == null)
            {
                var id = ObjectIdService.GetId(obj: obj);
                parentGroupIds = new List<string> { id };
            }

            if (parentIds == null)
            {
                var id = ObjectIdService.GetId(obj: obj);
                parentIds = new List<string> { id };
            }

            if (parentObjects == null) parentObjects = new List<object> { obj };

            if (attributes == null) attributes = new List<TemplateAttribute>();

            if (parentPropertyPaths == null) parentPropertyPaths = new List<string>();


            if (allParentPropertyPaths == null) allParentPropertyPaths = new List<string>();

            var allowListNavigationWithConstraint = false;

            if (constraints is not null && constraints.Count() > 0)
            {
                var matchFound = constraints.All(predicate: constraint =>
                {
                    var minCount = Math.Min(val1: allParentPropertyPaths.Count(),
                        val2: constraint.AllPropertyPaths.Count() - 1);

                    if (minCount > 0)
                        for (var i = 0; i < minCount; i++)
                            if (allParentPropertyPaths[index: i] == constraint.AllPropertyPaths[index: i])
                            {
                                if (parentObjects[index: i + 1] != constraint.Objects[index: i + 1]) return false;

                                if (i == minCount - 1) allowListNavigationWithConstraint = true;
                            }
                            else
                            {
                                return true;
                            }


                    return true;
                });

                if (!matchFound) return toReturn;
            }

            var objectType = obj.GetType();

            var matchingPropertyPaths = matchingToken.PropertyPaths;
            var currentName = matchingToken.CurrentName;


            var firstPropertyPath = matchingPropertyPaths.FirstOrDefault();
            var restPaths = matchingPropertyPaths.Skip(count: 1).ToList();

            if (objectType.IsEnumerableType() && objectType.IsGenericType)
            {
                var isDict = objectType.IsGenericType &&
                             objectType.GetGenericTypeDefinition() == typeof(Dictionary<,>);
                if (isDict)
                {
                    //Dic
                    var task = ProcessDictionary(
                     objectType, firstPropertyPath,
                     currentName, restPaths,
                     isPath,
                     matchingToken,
                     codeType,
                     text,
                     obj,
                     constraints,
                     parentName,
                     parentPropertyPaths,
                     allParentPropertyPaths,
                     attributes,
                     parentGroupIds,
                     parentIds,
                     parentObjects,
                     toReturn);
                    task.Wait();
                }
                else
                {
                    //List
                    var task = ProcessList(
                      allowListNavigationWithConstraint,
                      objectType, firstPropertyPath,
                      currentName, restPaths,
                      isPath,
                      matchingToken,
                      codeType,
                      text,
                      obj,
                      constraints,
                      parentName,
                      parentPropertyPaths,
                      allParentPropertyPaths,
                      attributes,
                      parentGroupIds,
                      parentIds,
                      parentObjects,
                      toReturn);
                    task.Wait();

                    if(task.Result is not null)
                    {
                        return task.Result;
                    }
                }
            }
            else
            {
                var isSystemType = objectType.FullName.StartsWith(value: "System.");

                if (objectType.IsClass && !isSystemType)
                {
                    //Class
                    var task = ProcessClass(
                       objectType, firstPropertyPath,
                       currentName, restPaths,
                       isPath,
                       matchingToken,
                       codeType,
                       text,
                       obj,
                       constraints,
                       parentName,
                       parentPropertyPaths,
                       allParentPropertyPaths,
                       attributes,
                       parentGroupIds,
                       parentIds,
                       parentObjects,
                       toReturn);
                    task.Wait();
                }
                else
                {
                    var value = obj.ToString();
                    var lastName = currentName.Split(separator: codeType.GetPropertySeparator(isPath: isPath))
                        .LastOrDefault();
                    var matchingCasedValue = GetCasedValueMatchingKeyCase(casedKey: lastName, value: value);
                    var last = currentName.Split(separator: codeType.GetPropertySeparator(isPath: isPath)).Last();
                    var isPlural = last.Pluralize() == last;

                    toReturn.Add(item: new TemplateTokenInfo<TData>
                    {
                        IsAlias = false,
                        CurrentName = currentName,
                        Value = matchingCasedValue,
                        GroupIds = parentGroupIds,
                        Ids = parentIds,
                        Attributes = attributes,
                        PropertyPaths = parentPropertyPaths,
                        AllPropertyPaths = allParentPropertyPaths,
                        Objects = parentObjects,
                        IsPlural = isPlural
                    });
                }
            }

            return toReturn;
        }

        public async Task ProcessClass(
  Type objectType, string firstPropertyPath,
  string currentName, List<string> restPaths,
   bool isPath,
  TemplateTokenInfo<TData> matchingToken,
  TemplateCodeType codeType,
  string text,
  object obj,
  List<TemplateTokenInfo<TData>> constraints,
  string parentName,
  List<string> parentPropertyPaths,
  List<string> allParentPropertyPaths,
  List<TemplateAttribute> attributes,
  List<string> parentGroupIds,
  List<string> parentIds,
  List<object> parentObjects,
  List<TemplateTokenInfo<TData>> toReturn)
        {
            var objProperty = objectType.GetProperty(name: firstPropertyPath);
            var propObj = objProperty?.GetValue(obj: obj);
            if (propObj != null)
            {
                var isPropSystemType = objProperty.PropertyType.FullName.StartsWith(value: "System.");

                if (isPropSystemType && !objProperty.PropertyType.IsGenericType)
                {
                    var id = currentName + string.Join(separator: '_', values: parentIds) + '_' +
                             firstPropertyPath;

                    var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                    clonedMatchingToken.PropertyPaths = restPaths;

                    GetAllMatchingNameToTokenInfoDicWithConstraint(
                        isPath: isPath,
                        matchingToken: clonedMatchingToken,
                        codeType: codeType,
                        text: text,
                        obj: propObj.ToString(),
                        constraints: constraints,
                        parentName: codeType.GetPropertyPathsName(propertyPaths: new List<string> { parentName },
                            isPath: isPath),
                        parentPropertyPaths: parentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        allParentPropertyPaths: allParentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        attributes: attributes,
                        parentGroupIds: parentGroupIds.Concat(second: new List<string>()).ToList(),
                        parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                        parentObjects: parentObjects.Concat(second: new List<object> { propObj }).ToList(),
                        toReturn: toReturn);
                }
                else
                {
                    var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                    clonedMatchingToken.PropertyPaths = restPaths;

                    var id = ObjectIdService.GetId(obj: propObj);

                    GetAllMatchingNameToTokenInfoDicWithConstraint(
                        isPath: isPath,
                        matchingToken: clonedMatchingToken,
                        codeType: codeType,
                        text: text,
                        obj: propObj,
                        constraints: constraints,
                        parentName: codeType.GetPropertyPathsName(
                            propertyPaths: new List<string> { parentName, firstPropertyPath }, isPath: isPath),
                        parentPropertyPaths: parentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        allParentPropertyPaths: allParentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        attributes: attributes,
                        parentGroupIds: parentGroupIds.Concat(second: new List<string>()).ToList(),
                        parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                        parentObjects: parentObjects.Concat(second: new List<object> { propObj }).ToList(),
                        toReturn: toReturn);
                }
            }
        }

        public async Task<List<TemplateTokenInfo<TData>>> ProcessList(
        bool allowListNavigationWithConstraint,
    Type objectType, string firstPropertyPath,
    string currentName, List<string> restPaths,
     bool isPath,
    TemplateTokenInfo<TData> matchingToken,
    TemplateCodeType codeType,
    string text,
    object obj,
    List<TemplateTokenInfo<TData>> constraints,
    string parentName,
    List<string> parentPropertyPaths,
    List<string> allParentPropertyPaths,
    List<TemplateAttribute> attributes,
    List<string> parentGroupIds,
    List<string> parentIds,
    List<object> parentObjects,
    List<TemplateTokenInfo<TData>> toReturn)
        {

            var elementType = GetAnyElementType(type: objectType);
            var isSystemType = elementType.FullName.StartsWith(value: "System.");
            var objList = (IEnumerable)obj;

            if (int.TryParse(s: firstPropertyPath, result: out var number))
            {
                // List with index

                if (firstPropertyPath == "00")
                {


                    var groups = (IEnumerable<TemplateGroup>)objList;
                    var groupNames = groups.Select(group => group.Name);
                    var groupNamesBySep = string.Join('|', groupNames);

                    toReturn.Add(item: new TemplateTokenInfo<TData>
                    {
                        IsAlias = false,
                        CurrentName = currentName,
                        Value = groupNamesBySep,
                        GroupIds = parentGroupIds,
                        Ids = parentIds,
                        Attributes = attributes,
                        PropertyPaths = parentPropertyPaths.Concat(new List<string> { "00", "Name" }).ToList(),
                        AllPropertyPaths = allParentPropertyPaths.Concat(new List<string> { "00", "Name" }).ToList(),
                        Objects = parentObjects,
                        IsPlural = false
                    });
                }
                else
                {
                    object foundElem = null;
                    var i = 0;
                    foreach (var elem in objList)
                    {
                        if (i == number)
                        {
                            foundElem = elem;
                            break;
                        }

                        i++;
                    }

                    if (isSystemType)
                    {
                        var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                        clonedMatchingToken.PropertyPaths = restPaths;
                        var id = currentName + string.Join(separator: '_', values: parentIds) + '_' +
                                 firstPropertyPath + i;
                        GetAllMatchingNameToTokenInfoDicWithConstraint(
                            isPath: isPath,
                            matchingToken: clonedMatchingToken,
                            codeType: codeType,
                            text: text,
                            obj: foundElem.ToString(),
                            constraints: constraints,
                            parentName: codeType.GetPropertyPathsName(
                                propertyPaths: new List<string> { parentName, firstPropertyPath }, isPath: isPath),
                            parentPropertyPaths: parentPropertyPaths
                                .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                            allParentPropertyPaths: allParentPropertyPaths
                                .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                            attributes: attributes,
                            parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                            parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                            parentObjects: parentObjects.Concat(second: new List<object> { foundElem }).ToList(),
                            toReturn: toReturn);
                    }
                    else
                    {
                        var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                        clonedMatchingToken.PropertyPaths = restPaths;

                        var id = ObjectIdService.GetId(obj: foundElem);

                        GetAllMatchingNameToTokenInfoDicWithConstraint(
                            isPath: isPath,
                            matchingToken: clonedMatchingToken,
                            codeType: codeType,
                            text: text,
                            obj: foundElem,
                            constraints: constraints,
                            parentName: codeType.GetPropertyPathsName(
                                propertyPaths: new List<string> { parentName, firstPropertyPath }, isPath: isPath),
                            parentPropertyPaths: parentPropertyPaths
                                .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                            allParentPropertyPaths: allParentPropertyPaths
                                .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                            attributes: attributes,
                            parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                            parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                            parentObjects: parentObjects.Concat(second: new List<object> { foundElem }).ToList(),
                            toReturn: toReturn);
                    }
                }
            }
            else
            {
                // List  Without index
                if (constraints is not null && !allowListNavigationWithConstraint) return toReturn;


                if (isSystemType)
                {
                    var i = 0;
                    foreach (var value in objList)
                    {
                        if (firstPropertyPath.ToLower() == "value")
                        {
                            var casedValue = GetCasedValueMatchingKeyCase(casedKey: firstPropertyPath,
                                value: value.ToString());
                            var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                            clonedMatchingToken.PropertyPaths = restPaths;
                            var id = currentName + string.Join(separator: '_', values: parentIds) + '_' +
                                     firstPropertyPath +
                                     i;
                            GetAllMatchingNameToTokenInfoDicWithConstraint(
                                isPath: isPath,
                                matchingToken: clonedMatchingToken,
                                codeType: codeType,
                                text: text,
                                obj: casedValue,
                                constraints: constraints,
                                parentName: codeType.GetPropertyPathsName(
                                    propertyPaths: new List<string> { parentName, firstPropertyPath },
                                    isPath: isPath),
                                parentPropertyPaths: parentPropertyPaths
                                    .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                                allParentPropertyPaths: allParentPropertyPaths
                                    .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                                attributes: attributes,
                                parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                                parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                                parentObjects: parentObjects.Concat(second: new List<object> { value }).ToList(),
                                toReturn: toReturn);
                        }
                        else
                        {
                            var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                            clonedMatchingToken.PropertyPaths = restPaths;
                            var id = currentName + string.Join(separator: '_', values: parentIds) + '_' +
                                     firstPropertyPath +
                                     i;
                            GetAllMatchingNameToTokenInfoDicWithConstraint(
                                isPath: isPath,
                                matchingToken: clonedMatchingToken,
                                codeType: codeType,
                                text: text,
                                obj: value.ToString(),
                                constraints: constraints,
                                parentName: codeType.GetPropertyPathsName(
                                    propertyPaths: new List<string> { parentName, firstPropertyPath },
                                    isPath: isPath),
                                parentPropertyPaths: parentPropertyPaths
                                    .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                                allParentPropertyPaths: allParentPropertyPaths
                                    .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                                attributes: attributes,
                                parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                                parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                                parentObjects: parentObjects.Concat(second: new List<object> { value }).ToList(),
                                toReturn: toReturn);
                        }

                        i++;
                    }
                }
                else
                {
                    var i = 0;
                    foreach (var o in objList)
                    {
                        var isValueSystemType = o.GetType().FullName.StartsWith(value: "System.");

                        var id = isValueSystemType
                            ? currentName + string.Join(separator: '_', values: parentIds) + '_' +
                              firstPropertyPath + i
                            : ObjectIdService.GetId(obj: o);
                        i++;

                        GetAllMatchingNameToTokenInfoDicWithConstraint(
                            isPath: isPath,
                            matchingToken: matchingToken,
                            codeType: codeType,
                            text: text,
                            obj: o,
                            constraints: constraints,
                            parentName: codeType.GetPropertyPathsName(
                                propertyPaths: new List<string> { parentName }, isPath: isPath),
                            parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string>())
                                .ToList(),
                            allParentPropertyPaths: allParentPropertyPaths.Concat(second: new List<string> { "" })
                                .ToList(),
                            attributes: attributes,
                            parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                            parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                            parentObjects: parentObjects.Concat(second: new List<object> { o }).ToList(),
                            toReturn: toReturn);
                    }
                }
            }

            return null;
        }

        public async Task ProcessDictionary(
            Type objectType, string firstPropertyPath,
            string currentName, List<string> restPaths,
             bool isPath,
            TemplateTokenInfo<TData> matchingToken,
            TemplateCodeType codeType,
            string text,
            object obj,
            List<TemplateTokenInfo<TData>> constraints,
            string parentName,
            List<string> parentPropertyPaths,
            List<string> allParentPropertyPaths,
            List<TemplateAttribute> attributes,
            List<string> parentGroupIds,
            List<string> parentIds,
            List<object> parentObjects,
            List<TemplateTokenInfo<TData>> toReturn)
        {
            var objDic = (IDictionary)obj;
            var keyType = objectType.GetGenericArguments()[0];
            var valueType = objectType.GetGenericArguments()[1];
            var isSystemType = valueType.FullName.StartsWith(value: "System.");

            var lowerFirstPropertyPath = firstPropertyPath.ToLower();

            if (lowerFirstPropertyPath.StartsWith(value: "key"))
            {
                var rawKeyAndCasedKeyTuple = new List<(string RawKey, string CasedKey)>();
                var rawKeys = objDic.Keys;

                var i = 0;
                foreach (var rawKey in rawKeys)
                {
                    var casedKey = GetCasedValueMatchingKeyCase(casedKey: firstPropertyPath,
                        value: rawKey.ToString());

                    var id = currentName + string.Join(separator: '_', values: parentIds) + '_' +
                             firstPropertyPath + i;
                    i++;

                    var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                    clonedMatchingToken.PropertyPaths = restPaths;

                    GetAllMatchingNameToTokenInfoDicWithConstraint(
                        isPath: isPath,
                        matchingToken: clonedMatchingToken,
                        codeType: codeType,
                        text: text,
                        obj: casedKey,
                        constraints: constraints,
                        parentName: codeType.GetPropertyPathsName(
                            propertyPaths: new List<string> { parentName, firstPropertyPath }, isPath: isPath),
                        parentPropertyPaths: parentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        allParentPropertyPaths: allParentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        attributes: attributes,
                        parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                        parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                        parentObjects: parentObjects.Concat(second: new List<object> { objDic[key: rawKey] })
                            .ToList(),
                        toReturn: toReturn);
                }
            }

            if (lowerFirstPropertyPath.StartsWith(value: "dotkey"))
            {
                var rawKeyAndCasedKeyTuple = new List<(string RawKey, string CasedKey)>();
                var rawKeys = objDic.Keys;

                var i = 0;
                foreach (var rawKey in rawKeys)
                {
                    var casedKey = GetCasedValueMatchingKeyCase(casedKey: firstPropertyPath,
                        value: rawKey.ToString());
                    rawKeyAndCasedKeyTuple.Add(item: (rawKey.ToString(), casedKey));


                    var id = currentName + string.Join(separator: '_', values: parentIds) + '_' +
                             firstPropertyPath + i;
                    i++;

                    var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                    clonedMatchingToken.PropertyPaths = restPaths;

                    GetAllMatchingNameToTokenInfoDicWithConstraint(
                        isPath: isPath,
                        matchingToken: clonedMatchingToken,
                        codeType: codeType,
                        text: text,
                        obj: string.IsNullOrEmpty(value: casedKey) ? "" : $".{casedKey}",
                        constraints: constraints,
                        parentName: codeType.GetPropertyPathsName(
                            propertyPaths: new List<string> { parentName, firstPropertyPath }, isPath: isPath),
                        parentPropertyPaths: parentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        allParentPropertyPaths: allParentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        attributes: attributes,
                        parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                        parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                        parentObjects: parentObjects.Concat(second: new List<object> { objDic[key: rawKey] })
                            .ToList(),
                        toReturn: toReturn);
                }
            }


            if (isSystemType)
            {
                if (firstPropertyPath.ToLower().StartsWith(value: "withkey"))
                {
                    var secondPropertyPath = restPaths[index: 0];

                    var casedValue = GetCasedValueMatchingKeyCase(casedKey: firstPropertyPath,
                        value: objDic[key: secondPropertyPath].ToString());

                    var i = 0;
                    var foundIndex = -1;
                    foreach (var key in objDic.Keys)
                    {
                        if (key == secondPropertyPath) foundIndex = i;

                        i++;
                    }

                    ;


                    var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                    clonedMatchingToken.PropertyPaths = restPaths;
                    var id = currentName + string.Join(separator: '_', values: parentIds) + '_' +
                             firstPropertyPath +
                             secondPropertyPath + foundIndex;
                    GetAllMatchingNameToTokenInfoDicWithConstraint(
                        isPath: isPath,
                        matchingToken: clonedMatchingToken,
                        codeType: codeType,
                        text: text,
                        obj: casedValue,
                        constraints: constraints,
                        parentName: codeType.GetPropertyPathsName(
                            propertyPaths: new List<string> { parentName, firstPropertyPath }, isPath: isPath),
                        parentPropertyPaths: parentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        allParentPropertyPaths: allParentPropertyPaths
                            .Concat(second: new List<string> { firstPropertyPath }).ToList(),
                        attributes: attributes,
                        parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                        parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                        parentObjects: parentObjects
                            .Concat(second: new List<object> { objDic[key: secondPropertyPath] }).ToList(),
                        toReturn: toReturn);
                }
            }
            else
            {
                if (firstPropertyPath == "Values")
                {
                    var values = objDic.Values;

                    var i = 0;
                    foreach (var value in values)
                    {
                        var isValueSystemType = value.GetType().FullName.StartsWith(value: "System.");

                        var id = isValueSystemType
                            ? currentName + string.Join(separator: '_', values: parentIds) + '_' +
                              firstPropertyPath + i
                            : ObjectIdService.GetId(obj: value);
                        i++;

                        var clonedMatchingToken = (TemplateTokenInfo<TData>)matchingToken.Clone();
                        clonedMatchingToken.PropertyPaths = restPaths;

                        GetAllMatchingNameToTokenInfoDicWithConstraint(
                            isPath: isPath,
                            matchingToken: clonedMatchingToken,
                            codeType: codeType,
                            text: text,
                            obj: value,
                            constraints: constraints,
                            parentName: codeType.GetPropertyPathsName(
                                propertyPaths: new List<string> { parentName, "Values" }, isPath: isPath),
                            parentPropertyPaths: parentPropertyPaths.Concat(second: new List<string> { "Values" })
                                .ToList(),
                            allParentPropertyPaths: allParentPropertyPaths
                                .Concat(second: new List<string> { "Values" }).ToList(),
                            attributes: attributes,
                            parentGroupIds: parentGroupIds.Concat(second: new List<string> { id }).ToList(),
                            parentIds: parentIds.Concat(second: new List<string> { id }).ToList(),
                            parentObjects: parentObjects.Concat(second: new List<object> { value }).ToList(),
                            toReturn: toReturn);
                    }
                }
            }
        }

        public string GetCasedValueMatchingKeyCase(string casedKey, string value)
        {
            var match = Regex.Match(input: casedKey,
                pattern:
                @"(?<Name>\w+?)(?<Plural>Plural)?(Case)?(?<Postfix>PascalCase|HumanCase|HumanTitleCase|CamelCase)?$");
            var prefixKey = match.Groups[groupname: "Name"].Value;
            var postFix = match.Groups[groupname: "Postfix"].Value;
            var plural = match.Groups[groupname: "Plural"].Value;

            if (!string.IsNullOrEmpty(value: plural)) value = value.Pluralize();

            if (casedKey.EndsWith(value: "PascalCase"))
                return value.Pascalize();
            if (casedKey.EndsWith(value: "CamelCase"))
                return value.Camelize();
            if (casedKey.EndsWith(value: "HumanCase"))
                return value.Humanize();
            if (casedKey.EndsWith(value: "HumanTitleCase"))
                return value.Humanize(casing: LetterCasing.Title);
            if (char.IsLower(c: casedKey[index: 0])) return value.Camelize();

            return value;
        }
    }
}