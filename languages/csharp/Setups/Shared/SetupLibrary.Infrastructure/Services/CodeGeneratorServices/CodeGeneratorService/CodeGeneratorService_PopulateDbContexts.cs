﻿

using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using AutoMapper.Internal;
using SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.MethodInfoExtensions;
using SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.PropertyInfoExtensions;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public void PopulateDbContexts(TemplateData data)
        {
            var projects = data.Projects;

            foreach (var project in projects)
            {
                var assembly = project.Assembly;
                var dbContextTypes = assembly.GetTypes().Where(predicate: t =>
                {
                    if (t.Namespace == null) return false;

                    var serviceNamePattern = @$"{Regex.Escape(str: project.Name)}\.Data(\.\w+)?\s*$";
                    var toReturn = Regex.IsMatch(input: t.Namespace, pattern: serviceNamePattern,
                        options: RegexOptions.Singleline);
                    return toReturn;
                }).ToList();


                var dbContexts = new List<TemplateDbContext>();

                var key = project.Name + "|DbContext";


                if (Cache.TryGetValue(key: key, value: out var value))
                {
                    dbContexts = (List<TemplateDbContext>) value;
                }
                else
                {
                    dbContextTypes?.ForEach(action: dbContextType =>
                    {
                        if (
                            dbContextType.Name.EndsWith(value: "DbContext")
                        )
                        {
                            var methods = dbContextType.GetMethods(
                                bindingAttr: BindingFlags.Public | BindingFlags.Instance
                            ).Where(predicate: methodInfo => !methodInfo.IsSpecialName).Select(selector: methodInfo =>
                            {
                                var fullSig = methodInfo.GetFullSignature();
                                var method = new TemplateMethod
                                {
                                    MethodInfo = methodInfo,
                                    Signature = new TemplateMethodSignature
                                    {
                                        FullTypeAndNameAndParameters = methodInfo.GetFullSignature(),
                                        AccessModifier = methodInfo.GetAccessModifierSignature(),
                                        Type = methodInfo.GetTypeSignature(),
                                        FullType = methodInfo.GetFullTypeSignature(),
                                        Parameters = methodInfo.GetParameterSignatures(),
                                        FullParameters = methodInfo.GetFullParameterSignatures(),
                                        Name = methodInfo.GetNameSignature()
                                    },
                                    Name = methodInfo.Name,
                                    IsPublic = methodInfo.IsPublic
                                };
                                return method;
                            }).ToList();

                            var namePattern = @"(?<Name>\w*)DbContext";
                            var toReturn = Regex.Match(input: dbContextType.Name, pattern: namePattern,
                                options: RegexOptions.Singleline);
                            var name = toReturn.Groups[groupname: "Name"].Value;


                            var properties = dbContextType.GetProperties().Select(selector: propertyInfo =>
                            {
                                var declaredOnly = dbContextType.GetProperty(name: propertyInfo.Name,
                                    bindingAttr: BindingFlags.DeclaredOnly | BindingFlags.Public |
                                                 BindingFlags.Instance) != null;

                                return new TemplateProperty
                                {
                                    Name = propertyInfo.Name,
                                    PropertyInfo = propertyInfo,
                                    Signature = new TemplatePropertySignature
                                    {
                                        FullTypeAndName = propertyInfo.GetFullSignature(),
                                        AccessModifier = propertyInfo.GetAccessModifierSignature(),
                                        Type = propertyInfo.GetTypeSignature(),
                                        Name = propertyInfo.GetNameSignature()
                                    },
                                    IsPublic = propertyInfo.IsPublic(),
                                    IsDeclaredOnly = declaredOnly,
                                    HasPublicGetter = propertyInfo.GetGetMethod() != null,
                                    HasPublicSetter = propertyInfo.GetSetMethod() != null
                                };
                            }).ToList();

                            var constructors = dbContextType.GetConstructors().Select(selector: constructorInfo =>
                            {
                                var isExtensionMethod =
                                    constructorInfo.IsDefined(
                                        attributeType: typeof(ExtensionAttribute), inherit: false);
                                var parameterInfos = constructorInfo.GetParameters().AsEnumerable();

                                var parameters = parameterInfos.Select(selector: param =>
                                {
                                    var fullType = param.ParameterType.GetFullSignature();
                                    var type = param.ParameterType.GetSignature();

                                    var name = param.Name;
                                    return new TemplateParameter
                                    {
                                        Name = param.Name,
                                        Signature = new TemplateParameterSignature
                                        {
                                            FullType = fullType,
                                            FullTypeAndName = fullType + " " + name,
                                            AccessModifier = "public",
                                            Name = name,
                                            Type = type
                                        }
                                    };
                                }).ToList();

                                return new TemplateConstructor
                                {
                                    Parameters = parameters
                                };
                            }).ToList();

                            var interfaces = dbContextType.GetInterfaces().Select(selector: serviceInterface =>
                            {
                                return new TemplateInterface
                                {
                                    Name = serviceInterface.Name,
                                    Signature = new TemplateInterfaceSignature
                                    {
                                        Name = serviceInterface.Name,
                                        FullType = serviceInterface.GetFullSignature(),
                                        Type = serviceInterface.GetSignature(),
                                        FullTypeAndName = serviceInterface.GetFullSignature() + " " +
                                                          serviceInterface.Name
                                    }
                                };
                            }).ToList();

                            var baseType = dbContextType.BaseType;
                            var parentConstructors = baseType.GetConstructors().Select(selector: constructorInfo =>
                            {
                                var isExtensionMethod =
                                    constructorInfo.IsDefined(
                                        attributeType: typeof(ExtensionAttribute), inherit: false);
                                var parameterInfos = constructorInfo.GetParameters().AsEnumerable();

                                var parameters = parameterInfos.Select(selector: param =>
                                {
                                    var fullType = param.ParameterType.GetFullSignature();
                                    var type = param.ParameterType.GetSignature();

                                    var name = param.Name;
                                    return new TemplateParameter
                                    {
                                        Name = param.Name,
                                        Signature = new TemplateParameterSignature
                                        {
                                            FullType = fullType,
                                            FullTypeAndName = fullType + " " + name,
                                            TypeAndName = type + " " + name,
                                            AccessModifier = "public",
                                            Name = name,
                                            Type = type
                                        }
                                    };
                                }).ToList();

                                return new TemplateConstructor
                                {
                                    Parameters = parameters
                                };
                            }).ToList();

                            var parentType = new TemplateType
                            {
                                Name = baseType.Name,
                                Constructors = parentConstructors,
                                Signature = new TemplateTypeSignature
                                {
                                    FullType = baseType.GetFullSignature(),
                                    Type = baseType.GetSignature()
                                }
                            };

                            var toAdd = new TemplateDbContext
                            {
                                Name = name,

                                Project = project,
                                Namespace = dbContextType.Namespace,
                                Methods = methods ?? new List<TemplateMethod>(),

                                IsAbstract = dbContextType.IsAbstract,
                                Properties = properties ?? new List<TemplateProperty>(),
                                Constructors = constructors,
                                Interfaces = interfaces,
                                ParentType = parentType
                            };

                            dbContexts.Add(item: toAdd);
                        }
                    });

                    Cache.TryAdd(key: key, value: dbContexts);
                }


                data.DbContexts.AddRange(collection: dbContexts);
            }
        }
    }
}