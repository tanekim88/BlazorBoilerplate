﻿

using AutoMapper.Internal;
using Force.DeepCloner;
using Karambolo.Common;
using Microsoft.EntityFrameworkCore;
using ProtoBuf;
using SetupLibrary.Application.Models;
using SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.MethodInfoExtensions;
using SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.PropertyInfoExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task PopulateModels(TemplateData data)
        {
            var projects = data.Projects;
            if (data.Models.Count() != 0) return;

            foreach (var project in projects)
            {
                var assembly = project.Assembly;
                var assemblyTypes = assembly.GetTypes();
                var modelTypes = assemblyTypes.Where(predicate: t =>
                {
                    if (t.Namespace == null) return false;

                    var modelNamePattern = @$"{project.Name}.Models(\.)?";
                    var toReturn = Regex.IsMatch(input: t.Namespace, pattern: modelNamePattern,
                        options: RegexOptions.Singleline);
                    return toReturn;
                }).ToList();

                var domainProject = projects.FirstOrDefault(p =>
                p.BaseName == project.BaseName && p.Type == "Domain" &&
               !p.IsShared);
                if (domainProject is null)
                {
                    continue;
                }
                var domainProjectAssembly = domainProject.Assembly;
                var entityTypes = domainProjectAssembly.GetTypes().Where(predicate: t =>
                {
                    if (t.Namespace == null) return false;

                    var entityNamePattern = @$"{domainProject.Name}.Entities(\.)?";
                    var toReturn = Regex.IsMatch(input: t.Namespace, pattern: entityNamePattern,
                        options: RegexOptions.Singleline);
                    return toReturn;
                }).ToList();

                var models = new List<TemplateModel>();
                var entities = new List<TemplateEntity>();

                var key = project.Name + "|Models";

                if (Cache.TryGetValue(key: key, value: out var value))
                {
                    models = (List<TemplateModel>)value;
                }
                else
                {
                    modelTypes?.ForEach(action: modelType =>
                    {
                        var groupNamePattern = @$"{project.Name}\.Models(\.(?<GroupNames>.*))?";
                        var match = Regex.Match(input: modelType.Namespace, pattern: groupNamePattern,
                            options: RegexOptions.Singleline);
                        var groupNames = match.Groups[groupname: "GroupNames"].Value;

                        var groups = new List<TemplateGroup>
                        {
                            new()
                            {
                                Name = ""
                            }
                        };

                        var splittedGroupNames = groupNames.Split(separator: '.').ToList();

                        if (splittedGroupNames.All(predicate: x => x.EndsWith(value: "Models")))
                        {
                            groups = splittedGroupNames.Select(selector: groupName =>
                            {
                                groupName = groupName.Substring(startIndex: 0,
                                    length: groupName.Length - "Models".Length);
                                return new TemplateGroup
                                {
                                    Name = groupName
                                };
                            }).ToList();
                        }

                        groups = groups.Where(group => !string.IsNullOrEmpty(group.Name)).ToList();
                        if (groups.Count() > 0 && groups[0].Name == "Entity")
                        {
                        }


                        var groupName = string.Join('.', groups.Select(group => group.Name));
                        var entityGroupName = string.Join('.', groups.Skip(1).Select(group => group.Name));
                        var entityNamespace = domainProject.Name + ".Entities" + (groups.Count() > 0 ? $".{entityGroupName}" : "");

                        if (groups.Count() == 0 || groups[index: 0].Name != "__Models_Groups_00_Name__")
                        {
                            var propertiesWithPrimaryKeys = modelType.GetProperties().Select(selector: propertyInfo =>
                            {
                                var keyAttribute = propertyInfo.GetCustomAttribute<KeyAttribute>(inherit: true);

                                if (keyAttribute == null)
                                {
                                    return (propertyInfo, -1);
                                }

                                var columnAttribute =
                                    propertyInfo.GetCustomAttribute<ColumnAttribute>(inherit: true);
                                return (propertyInfo, columnAttribute?.Order ?? 0);
                            }).Where(predicate: i => i.Item2 != -1).OrderBy(keySelector: i => i.Item2)
                                .Select(selector: x => x.Item1).ToList();

                            var dbContextType = project.InfrastructureAssembly.GetTypes().FirstOrDefault(type => type.Name == project.BoundedContext.Name + "DbContext");


                            var dbContextFactoryType = typeof(IDbContextFactory<>);
                            DbContext dbContext = null;

                            if (dbContextType is not null)
                            {
                                var toGet = dbContextFactoryType.MakeGenericType(dbContextType);
                                var dbContextFactory = _serviceProvider.GetService(toGet);
                                dbContext = (DbContext)dbContextFactory.GetType().GetMethod("CreateDbContext").Invoke(dbContextFactory, null);
                            }


                            var foundEntity = entityTypes.FirstOrDefault(entityType => entityType.Name == modelType.Name.Substring(0, modelType.Name.Length - "Model".Length));

                            var propertyInfosWithPrimaryKeys = dbContext?.Model.FindEntityType(name: foundEntity?.FullName)?
                                .FindPrimaryKey().Properties?.Select(selector: x => x.PropertyInfo).ToList();

                            propertyInfosWithPrimaryKeys = propertyInfosWithPrimaryKeys ?? propertiesWithPrimaryKeys;

                            var properties = modelType.GetProperties().GroupBy(property => property.Name).Select(props => props.First())
                            .Select(selector: (propertyInfo, i) =>
                            {

                                var isNullable = propertyInfo.PropertyType.IsNullableType();

                                var declaredOnly = modelType.GetProperty(name: propertyInfo.Name,
                                    bindingAttr: BindingFlags.DeclaredOnly | BindingFlags.Public |
                                                 BindingFlags.Instance) != null;
                                var primaryKeyPropertyInfo = propertyInfosWithPrimaryKeys.Find(
                                    match: primaryKeyPropertyInfo =>
                                        primaryKeyPropertyInfo.Name == propertyInfo.Name);
                                var isPrimaryKey = primaryKeyPropertyInfo is not null;

                                var order = -1;

                                var protoMemberAttribute = propertyInfo.GetCustomAttribute<ProtoMemberAttribute>();

                                if (protoMemberAttribute is not null) order = protoMemberAttribute.Tag;

                                order = i;

                                var attributes = propertyInfo.GetCustomAttributes().Where(predicate: attribute =>
                                {
                                    return attribute.GetType().Name != "NullableAttribute";
                                }).Select(selector: attribute =>
                                {
                                    var attributeProperties = attribute.GetType().GetProperties().Select(selector: property =>
                                    {
                                        return new TemplateAttributeProperty
                                        {
                                            Name = property.Name,
                                            Value = attribute.GetType().GetProperty(property.Name)?.GetValue(attribute)?.ToString()
                                        };
                                    }).ToList();

                                    var nameSig = attribute.GetType().Name.Substring(startIndex: 0,
                                        length: attribute.GetType().Name.Length - "Attribute".Length);

                                    var isDbType = false;

                                    if (nameSig == "Key" ||
                                        nameSig == "Column" ||
                                        nameSig == "ForeignKey" ||
                                        nameSig == "InverseProperty")
                                    {
                                        isDbType = true;
                                    }

                                    return new TemplateAttribute
                                    {
                                        Name = nameSig,
                                        Properties = attributeProperties,
                                        Signature = new TemplateAttributeSignature { Name = nameSig },
                                        IsDbType = isDbType
                                    };
                                }).ToList();

                                //var foundProtoMemberAttribute =
                                //    attributes.Find(match: attr => attr.Name == "ProtoMember");

                                //if (foundProtoMemberAttribute is not null)
                                //    foundProtoMemberAttribute.Signature.NameAndArgumentsInsideBrackets =
                                //        $"[ProtoMember({order + 1})]";
                                //else
                                //    attributes.Add(item: new TemplateAttribute
                                //    {
                                //        Name = "ProtoMember",
                                //        Signature = new TemplateAttributeSignature
                                //        {
                                //            Name = "ProtoMember",
                                //            NameAndArgumentsInsideBrackets = $"[ProtoMember({order + 1})]"
                                //        }
                                //    });


                                var type = propertyInfo.PropertyType;
                                var isEnumerableClass = !type.IsSimpleType() && type.IsEnumerableType();

                                var childType = "";

                                var childFullType = "";

                                if (isEnumerableClass)
                                {
                                    var genericArgs = type.GetGenericArguments();
                                    var firstArg = genericArgs.First();
                                    childType = firstArg.GetSignature();
                                    childFullType = firstArg.GetFullSignature();
                                }

                                var isSimpleType = propertyInfo.PropertyType.IsSimpleType();


                                var isValueObject = false;

                                if (!isSimpleType)
                                {
                                    isValueObject = propertyInfo.PropertyType.Namespace.Contains(".ValueObjectModels");
                                }

                                if (propertyInfo.Name == "Id")
                                {
                                    isValueObject = true;
                                }


                                var toReturn = new TemplateProperty
                                {
                                    Name = propertyInfo.Name,
                                    IsValueObject = isValueObject,
                                    IsDictionaryType = propertyInfo.PropertyType.IsDictionaryType(),
                                    BaseName = propertyInfo.Name,
                                    PropertyInfo = propertyInfo,
                                    IsEnumerableClass = isEnumerableClass,
                                    IsNullable = isNullable,
                                    Signature = new TemplatePropertySignature
                                    {
                                        FullTypeAndName = propertyInfo.GetFullTypeSignature() + " " +
                                                          propertyInfo.GetNameSignature(),
                                        TypeAndName = propertyInfo.GetTypeSignature() + " " +
                                                      propertyInfo.GetNameSignature(),
                                        AccessModifier = propertyInfo.GetAccessModifierSignature(),
                                        Type = propertyInfo.GetTypeSignature(),
                                        FullType = propertyInfo.GetFullTypeSignature(),
                                        Name = propertyInfo.GetNameSignature(),
                                        ChildFullType = childFullType,
                                        ChildType = childType
                                    },
                                    IsPublic = propertyInfo.IsPublic(),
                                    IsSimpleType = isSimpleType,
                                    IsDeclaredOnly = declaredOnly,
                                    HasPublicGetter = propertyInfo.GetGetMethod() != null,
                                    HasPublicSetter = propertyInfo.GetSetMethod() != null,
                                    IsPrimaryKey = isPrimaryKey,
                                    Order = order,
                                    Attributes = attributes,
                                    PrimaryKeyOrder = -1
                                };

                                if (isPrimaryKey)
                                {
                                    var primaryKeyOrder =
                                        propertyInfosWithPrimaryKeys.IndexOf(item: primaryKeyPropertyInfo);
                                    toReturn.PrimaryKeyOrder = primaryKeyOrder;
                                }

                                return toReturn;
                            }).ToList();
                            properties.Sort((a, b) =>
                            {
                                if (a.Name == "Id" && b.Name != "Id")
                                {
                                    return 1;
                                }

                                if (b.Name != "Id" && b.Name == "Id")
                                {
                                    return -1;
                                }

                                if (a.IsPrimaryKey && !b.IsPrimaryKey)
                                {
                                    return -1;
                                }
                                if (!a.IsPrimaryKey && b.IsPrimaryKey)
                                {
                                    return 1;
                                }

                                if (!a.IsNullable && b.IsNullable)
                                {
                                    return -1;
                                }
                                if (a.IsNullable && !b.IsNullable)
                                {
                                    return 1;
                                }

                                return 0;
                            });
                            var usedEntityNamespaces = new List<string>();

                            var entityProperties = properties
                            .Select(property =>
                            {
                                var propertyInfo = property.PropertyInfo;
                                var entityProperty = (TemplateProperty)property.Clone();

                                var typeSig = propertyInfo.GetTypeSignature();
                                var fullTypeSig = propertyInfo.GetFullTypeSignature();


                                var childType = "";

                                var childFullType = "";


                                if (!propertyInfo.PropertyType.IsSimpleType())
                                {
                                    if (property.IsEnumerableClass)
                                    {
                                        var genericArgs = propertyInfo.PropertyType.GetGenericArguments();
                                        var firstArg = genericArgs.First();

                                        if (!firstArg.IsSimpleType())
                                        {
                                            childType = Regex.Replace(firstArg.GetSignature(), @"Model$", "");
                                            var entityPropNamespace = Regex.Replace(firstArg.Namespace, @"([a-z])Models?\b", "$1Entities");
                                            entityPropNamespace = entityPropNamespace.Replace(".Models", ".Entities");
                                            var relativeEntityPropNamespace = entityPropNamespace.Substring(assembly.GetName().Name.Length);
                                            relativeEntityPropNamespace = relativeEntityPropNamespace.Replace(".EntityEntities", "");
                                            var finalEntityPropNamespace = domainProjectAssembly.GetName().Name + relativeEntityPropNamespace;
                                            usedEntityNamespaces.Add(finalEntityPropNamespace);
                                            childFullType = finalEntityPropNamespace + "." + childType;
                                            fullTypeSig = fullTypeSig.Replace("<" + firstArg.Namespace, "<" + finalEntityPropNamespace);
                                            fullTypeSig = Regex.Replace(fullTypeSig, @"([a-z])Model?\b", "$1");
                                            fullTypeSig = Regex.Replace(fullTypeSig, @"ICollection<", "List<");
                                            typeSig = Regex.Replace(typeSig, @"([a-z])Model\b", "$1");
                                            typeSig = Regex.Replace(typeSig, @"ICollection<", "List<");
                                        }
                                        else
                                        {

                                            if (propertyInfo.PropertyType.IsDictionaryType())
                                            {
                                                var secondArg = genericArgs[1];

                                                if (!secondArg.IsSimpleType())
                                                {
                                                    childType = Regex.Replace(secondArg.GetSignature(), @"Model$", "");
                                                    var entityPropNamespace = Regex.Replace(secondArg.Namespace, @"([a-z\.])Models?\b", "$1Entities");
                                                    var relativeEntityPropNamespace = entityPropNamespace.Substring(assembly.GetName().Name.Length);
                                                    var finalEntityPropNamespace = domainProjectAssembly.GetName().Name + relativeEntityPropNamespace;
                                                    usedEntityNamespaces.Add(finalEntityPropNamespace);
                                                    childFullType = finalEntityPropNamespace + "." + childType;
                                                    fullTypeSig = fullTypeSig.Replace(secondArg.Namespace, finalEntityPropNamespace);
                                                    fullTypeSig = Regex.Replace(fullTypeSig, @"([a-z])Model\b", "$1");
                                                    typeSig = Regex.Replace(typeSig, @"([a-z])Model\b", "$1");
                                                }
                                            }
                                            else
                                            {
                                                var ns = firstArg.Namespace;
                                                usedEntityNamespaces.Add(ns);
                                            }
                                        }


                                        typeSig = Regex.Replace(typeSig, @"Model>", ">");
                                        fullTypeSig = Regex.Replace(fullTypeSig, @"Model>", ">");
                                    }
                                    else
                                    {

                                        typeSig = Regex.Replace(typeSig, @"Model\b", "");
                                        var entityPropNamespace2 = Regex.Replace(propertyInfo.PropertyType.Namespace, @"([a-z])Model(s)?\b", "$1");
                                        entityPropNamespace2 = entityPropNamespace2.Replace(".Models", ".Entities");
                                        entityPropNamespace2 = entityPropNamespace2.Replace(".Entities.Entity", ".Entities");
                                        var relativeEntityPropNamespace2 = entityPropNamespace2.Substring(assembly.GetName().Name.Length);
                                        var finalEntityPropNamespace2 = domainProjectAssembly.GetName().Name + relativeEntityPropNamespace2;
                                        usedEntityNamespaces.Add(finalEntityPropNamespace2);
                                        fullTypeSig = finalEntityPropNamespace2 + "." + typeSig;
                                    }

                                }
                                else
                                {
                                    if (propertyInfo.Name == "Id")
                                    {
                                        var modelTypeName = modelType.Name;
                                        modelTypeName = Regex.Replace(modelTypeName, @"Model$", "");

                                        typeSig = modelTypeName + "Id";
                                        fullTypeSig = modelTypeName + "Id";

                                        var entityGroups = groups.Skip(1);
                                        var entityGroupIdName = string.Join('.', entityGroups.Select(group => group.Name + "Ids"));
                                        var entityIdNamespace = domainProjectAssembly.GetName().Name + ".ValueObjects.Ids" + (entityGroups.Count() > 0 ? "." : "") + entityGroupIdName;
                                        usedEntityNamespaces.Add(entityIdNamespace);
                                    }
                                    else if (propertyInfo.Name.EndsWith("Id"))
                                    {
                                        var counterPart = properties.FirstOrDefault(prop => prop.Name == propertyInfo.Name.Substring(0, propertyInfo.Name.Length - 2));

                                        if (counterPart is not null)
                                        {
                                            var t = counterPart.Signature.Type;
                                            t = Regex.Replace(t, @"Model$", "");
                                            var idType = t + "Id";
                                            typeSig = idType;
                                            fullTypeSig = idType;
                                            var entityGroups = groups.Skip(1);
                                            var entityGroupIdName = string.Join('.', entityGroups.Select(group => group.Name + "Ids"));
                                            var entityIdNamespace = domainProjectAssembly.GetName().Name + ".ValueObjects.Ids" + (entityGroups.Count() > 0 ? "." : "") + entityGroupIdName;
                                            usedEntityNamespaces.Add(entityIdNamespace);

                                            entityProperty.IsSimpleType = false;
                                            entityProperty.IsValueObject = true;
                                        }
                                    }
                                    else
                                    {
                                        usedEntityNamespaces.Add(propertyInfo.PropertyType.Namespace);
                                    }
                                }

                                var name = propertyInfo.GetNameSignature();

                                if (typeSig == "int")
                                {
                                    Console.WriteLine();
                                }

                                var signature = new TemplatePropertySignature
                                {
                                    FullTypeAndName = fullTypeSig + " " +
                                                          propertyInfo.GetNameSignature(),
                                    TypeAndName = typeSig + " " +
                                                      propertyInfo.GetNameSignature(),
                                    AccessModifier = propertyInfo.GetAccessModifierSignature(),
                                    Type = typeSig,
                                    FullType = fullTypeSig,
                                    Name = propertyInfo.GetNameSignature(),
                                    ChildType = childType,
                                    ChildFullType = childFullType
                                };

                                entityProperty.Signature = signature;

                                return entityProperty;
                            }).ToList();

                            var relPath = modelType.Namespace.Substring(startIndex: project.Name.Count() + 1)
                                .Replace(oldChar: '.', newChar: Path.DirectorySeparatorChar);

                            var fullPath = Path.Combine(path1: project.DirPath, path2: relPath,
                                path3: modelType.Name + ".cs");
                            var content = File.ReadAllText(path: fullPath);
                            var useMatches = Regex.Matches(input: content, pattern: @"using\s+(?<using>[\w\.]+)\s*;");

                            var usedNamespaces = useMatches.Select(selector: m =>
                            {
                                var u = m.Groups[groupname: "using"].Value;
                                return u;
                            }).Distinct().ToList();


                            var entityFullPath = Path.Combine(path1: domainProject.DirPath, path2: relPath.Replace("Models", "Entities"),
                                path3: modelType.Name + ".cs");


                            if (File.Exists(entityFullPath))
                            {
                                var entityContent = File.ReadAllText(path: entityFullPath);
                                var useEntityMatches = Regex.Matches(input: entityContent, pattern: @"using\s+(?<using>[\w\.]+)\s*;");
                                var usedEntityNamespacesToAdd = useMatches.Select(selector: m =>
                                {
                                    var u = m.Groups[groupname: "using"].Value;
                                    return u;
                                }).Distinct().ToList();
                                usedEntityNamespaces.AddRange(usedEntityNamespacesToAdd);
                            }

                            usedEntityNamespaces = usedEntityNamespaces.Distinct().ToList();

                            var s = modelType.Name;
                            var matches = Regex.Matches(input: content,
                                pattern:
                                @"(\r|\n|\s)*(?<attributes>[^{}]*?)public.*?(?<name>\w+)\s*{.*?}\s*(?<initializer>=\s*(.*?);)?");

                            foreach (Match m in matches)
                            {
                                var name = m.Groups[groupname: "name"].Value;
                                var foundProp = properties.Find(match: property => property.Name == name);
                                var attributeSignature = m.Groups[groupname: "attributes"].Value;
                                var initializer = m.Groups[groupname: "initializer"].Value;

                                var isVirtual = m.Value.Contains(value: " virtual ");
                                foundProp.IsVirtual = isVirtual;

                                if (!string.IsNullOrEmpty(value: initializer))
                                    foundProp.Signature.Initializer = initializer;

                                var attrs = Regex.Matches(input: attributeSignature,
                                    pattern: @"(?:\[)(?<attribute>[^\[\]]+)(?:\])");
                                foreach (Match att in attrs)
                                {
                                    var value = att.Value;
                                    var attribute = att.Groups[groupname: "attribute"].Value;

                                    var subAttributes = Regex.Split(input: attribute, pattern: @"(?<!\""),(?!\"")");


                                    foreach (var subAtt in subAttributes)
                                    {
                                        var sig = $"[{subAtt.Trim()}]";
                                        var subMatch = Regex.Match(input: subAtt,
                                            pattern: @"(?<name>\w+)(?<arguments>\(.*?\))?");
                                        var subAttName = subMatch.Groups[groupname: "name"].Value;
                                        var foundAtt = foundProp.Attributes.Find(match: a => a.Name == subAttName);
                                        foundAtt.Signature.NameAndArgumentsInsideBrackets = sig;
                                    }

                                }
                            }



                            foreach (var entityProperty in entityProperties)
                            {
                                var entityAttributes = entityProperty.Attributes.Select(attribute =>
                                {
                                    if (attribute.Signature.NameAndArgumentsInsideBrackets is not null)
                                    {
                                        var entityAttribute = attribute.DeepClone();

                                        entityAttribute.Signature.NameAndArgumentsInsideBrackets =
                                        Regex.Replace(attribute.Signature.NameAndArgumentsInsideBrackets, @"([a-z\.])Models\b", "$1Entities");

                                        entityAttribute.Signature.NameAndArgumentsInsideBrackets =
                                        Regex.Replace(entityAttribute.Signature.NameAndArgumentsInsideBrackets, @"([a-z])Model\b", "$1");

                                        return entityAttribute;
                                    }

                                    return attribute;
                                }).ToList();

                                entityProperty.Attributes = entityAttributes;

                            }

                            var interfaces = modelType.GetInterfaces().Select(selector: modelInterface =>
                            {
                                return new TemplateInterface
                                {
                                    Name = modelInterface.Name,
                                    Signature = new TemplateInterfaceSignature
                                    {
                                        Name = modelInterface.Name,
                                        FullType = modelInterface.GetFullSignature(),
                                        Type = modelInterface.GetSignature(),
                                        FullTypeAndName = modelInterface.GetFullSignature() + " " + modelInterface.Name
                                    }
                                };
                            }).ToList();

                            var modelAttributes = modelType.CustomAttributes.Select(selector: attribute =>
                            {
                                return new TemplateAttribute();
                            }).ToList();

                            TemplateModel baseClass = null;

                            if (modelType.BaseType.Name != "Object")
                            {
                                var name = modelType.BaseType.GetSignature();
                                var fname = modelType.BaseType.GetFullSignature();

                                baseClass = new TemplateModel
                                {
                                    Name = name,
                                    Namespace = modelType.BaseType.Namespace
                                };
                            }

                            var methods = modelType.GetMethods(
                              bindingAttr: BindingFlags.DeclaredOnly | BindingFlags.Instance
                              ).Where(predicate: methodInfo => !methodInfo.IsSpecialName).Select(selector: methodInfo =>
                              {
                                  var fullSig = methodInfo.GetFullSignature();
                                  var method = new TemplateMethod
                                  {
                                      MethodInfo = methodInfo,
                                      Signature = new TemplateMethodSignature
                                      {
                                          FullTypeAndNameAndParameters = methodInfo.GetFullSignature(),
                                          TypeAndNameAndParameters = methodInfo.GetSignature(),
                                          AccessModifier = methodInfo.GetAccessModifierSignature(),
                                          Type = methodInfo.GetTypeSignature(),
                                          FullType = methodInfo.GetFullTypeSignature(),
                                          Parameters = methodInfo.GetParameterSignatures(),
                                          FullParameters = methodInfo.GetFullParameterSignatures(),
                                          Name = methodInfo.GetNameSignature(),

                                      },
                                      Name = methodInfo.Name,
                                      IsPublic = methodInfo.IsPublic
                                  };
                                  return method;
                              }).ToList();

                            var baseName = modelType.Name.Substring(0, modelType.Name.Length - "Model".Length);
                            var baseFullName = modelType.FullName.Substring(0, modelType.Name.Length - "Model".Length);


                            var isValueObject = modelType.Namespace.Contains(".ValueObjectModels");

                            var toAdd = new TemplateModel
                            {
                                Name = modelType.Name,
                                IsValueObject = isValueObject,
                                BaseName = baseName,
                                FullName = modelType.FullName,
                                BaseFullName = baseFullName,
                                Groups = groups,
                                Project = project,
                                Properties = properties,
                                Attributes = modelAttributes,
                                Interfaces = interfaces ?? new List<TemplateInterface>(),
                                UsedNamespaces = usedNamespaces,
                                Namespace = modelType.Namespace,
                                BaseClass = baseClass,
                                Methods = methods,
                                BoundedContext = project.BoundedContext
                            };

                            models.Add(item: toAdd);


                            if (groups.Count() > 0 && groups[0].Name == "Entity")
                            {
                                var entityToAdd = new TemplateEntity
                                {
                                    Name = baseName,
                                    IsValueObject = isValueObject,
                                    FullName = baseFullName,
                                    Groups = groups.Skip(1).ToList(),
                                    Project = domainProject,
                                    Properties = entityProperties,
                                    Attributes = modelAttributes,
                                    Interfaces = interfaces ?? new List<TemplateInterface>(),
                                    UsedNamespaces = usedEntityNamespaces,
                                    Namespace = modelType.Namespace,
                                    BaseClass = baseClass,
                                    BoundedContext = domainProject.BoundedContext
                                };
                                entities.Add(item: entityToAdd);
                            }

                        }
                    });

                    Cache.TryAdd(key: key, value: models);
                }

                data.Models.AddRange(collection: models);
                data.Entities.AddRange(collection: entities);
            }
        }
    }
}