using Humanizer;
using Mono.Cecil;
using CodeGenerator.Models;
using SharedCore.Domain.Attributes.ServiceAttributes;
using SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.MethodInfoExtensions;
using SharedLibrary.Application.Extensions.SystemExtensions.ReflectionExtensions.PropertyInfoExtensions;
using SharedLibrary.Application.StringEnums.ServiceLifetimeStringEnums;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using CodeGenerator.Interfaces.CodeGeneratorInterfaces;

namespace CodeGenerator.Impls.CodeGeneratorImpls
{
    public partial class DefaultCodeGeneratorProvider : ICodeGeneratorProvider<TemplateData>
    {
        public void PopulateServices(TemplateData data)
        {

            var projects = data.Projects;

            foreach (var project in projects)
            {
                var assembly = project.Assembly;

                var CecilAssembly = AssemblyDefinition.ReadAssembly(fileName: assembly.Location);

                var serviceTypes = assembly.GetTypes().Where(predicate: t =>
                {
                    if (t.Namespace == null) return false;

                    var serviceNamePattern = @$"{project.Name}\.Services(\.(?<GroupNames>.*?))?\s*$";
                    var toReturn = Regex.IsMatch(input: t.Namespace, pattern: serviceNamePattern,
                        options: RegexOptions.Singleline);
                    return toReturn;
                }).ToList();


                var services = new List<TemplateService>();

                var key = project.Name + "|Services";


                if (Cache.TryGetValue(key: key, value: out var value))
                {
                    services = (List<TemplateService>)value;
                }
                else
                {
                    serviceTypes?.ForEach(action: serviceType =>
                    {
                        var groupNamePattern = @$"{project.Name}\.Services(\.(?<GroupNames>.*?))?\s*$";
                        var match = Regex.Match(input: serviceType.Namespace, pattern: groupNamePattern,
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

                        if (splittedGroupNames.All(predicate: x => x.EndsWith(value: "Services")))
                            groups = splittedGroupNames.Select(selector: groupName =>
                            {
                                groupName = groupName.Substring(startIndex: 0,
                                    length: groupName.Length - "Services".Length);
                                return new TemplateGroup
                                {
                                    Name = groupName
                                };
                            }).ToList();


                        if (
                            groups[index: 0].Name != "__Services_Groups_0_Name__" &&
                            serviceType.Name.EndsWith(value: "Service")
                            )
                        {
                            var methods = serviceType.GetMethods(
                                bindingAttr: BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.Instance
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
                                        Name = methodInfo.GetNameSignature()
                                    },
                                    Name = methodInfo.Name,
                                    IsPublic = methodInfo.IsPublic
                                };
                                return method;
                            }).ToList();


                            var regMatch = Regex.Match(serviceType.Name,
                                @"(?<shared>Shared)?(?<baseName>\w+?)(?<type>Core.Domain)?Service");
                            var isShared = !string.IsNullOrEmpty(regMatch.Groups["shared"].Value);
                            var baseName = regMatch.Groups["baseName"].Value;
                            var type = regMatch.Groups["type"].Value;



                            var serviceLifetime = ServiceLifetimeStringEnum.Singleton;

                            var serviceLifetimeAttribute =
                                (ServiceLifetimeAttribute)serviceType.GetCustomAttribute(
                                    attributeType: typeof(ServiceLifetimeAttribute));

                            if (serviceLifetimeAttribute != null) serviceLifetime = serviceLifetimeAttribute.Name;

                            var properties = serviceType.GetProperties().Select(selector: propertyInfo =>
                            {
                                var declaredOnly = serviceType.GetProperty(name: propertyInfo.Name,
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

                            var constructors = serviceType.GetConstructors().Select(selector: constructorInfo =>
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

                            var interfaces = serviceType.GetInterfaces().Select(selector: serviceInterface =>
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

                            var baseType = serviceType.BaseType;
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


                            var toAdd = new TemplateService
                            {
                                Name = serviceType.Name,
                                BaseName = baseName,
                                Type = type,
                                IsShared = isShared,
                                Groups = groups,
                                Project = project,
                                Namespace = serviceType.Namespace,
                                Methods = methods ?? new List<TemplateMethod>(),
                                ServiceLifetime = serviceLifetime,
                                IsAbstract = serviceType.IsAbstract,
                                Properties = properties ?? new List<TemplateProperty>(),
                                Constructors = constructors,
                                Interfaces = interfaces,
                                ParentType = parentType
                            };

                            services.Add(item: toAdd);
                        }
                    });

                    Cache.TryAdd(key: key, value: services);
                }

                data.Models.ForEach(action: model =>
                {
                    var foundService = services.Find(match: service =>
                        service.Name == model.Name && service.Groups.Select(selector: x => x.Name)
                            .SequenceEqual(second: model.Groups.Select(selector: x => x.Name)));

                    var modelMethods = new List<TemplateMethod>();

                    var primaryKeys = model.Properties.Where(predicate: property => property.IsPrimaryKey).ToList();

                    var primaryKeySignatures = primaryKeys.Select(selector: primaryKey => primaryKey.Signature);

                    var camelPrimaryKeyNames = primaryKeySignatures.Select(selector: x => x.Name.Camelize());
                    var camelPrimaryKeyNames_by_slash = string.Join(separator: "/", values: camelPrimaryKeyNames);
                    var camelPrimaryKeyNames_by_comma = string.Join(separator: ",", values: camelPrimaryKeyNames);

                    var camelPrimaryKeyFullNames =
                        primaryKeySignatures.Select(selector: x => x.FullType + " " + x.Name.Camelize());
                    var camelPrimaryKeyFullNames_by_comma =
                        string.Join(separator: ",", values: camelPrimaryKeyFullNames);

                    var camelPrimaryKeyName_eq_modelsName_dot_Names =
                        primaryKeySignatures.Select(
                            selector: x => x.Name.Camelize() + " = " + model.Name + "." + x.Name);
                    var camelPrimaryKeyName_eq_modelsName_dot_Names_by_comma =
                        string.Join(separator: ",", values: camelPrimaryKeyName_eq_modelsName_dot_Names);

                    var modelsName_dot_Names = primaryKeySignatures.Select(selector: x => model.Name + "." + x.Name);
                    var modelsName_dot_Names_by_comma = string.Join(separator: ",", values: modelsName_dot_Names);

                    var modelInfos = new List<(string name, string inputTypeAndNames)>
                    {
                        (name: "Get",
                            inputTypeAndNames:
                            $"Get{project.Prefix}Input{project.Postfix}{project.GeneratorSymbol} input"),
                        (name: "GetById", inputTypeAndNames: camelPrimaryKeyFullNames_by_comma),
                        (name: "GetById", inputTypeAndNames: $"{model.Name}Id id"),
                        (name: "GetByIds", inputTypeAndNames: $"List<{model.Name}Id> ids"),


                        (name: "Create",
                            inputTypeAndNames:
                            $"Create{project.Prefix}Input{project.Postfix}{project.GeneratorSymbol} input"),

                        (name: "Read",
                            inputTypeAndNames:
                            $"Read{project.Prefix}Input{project.Postfix}{project.GeneratorSymbol} input"),
                        (name: "ReadById", inputTypeAndNames: camelPrimaryKeyFullNames_by_comma),
                        (name: "ReadById", inputTypeAndNames: $"{model.Name}Id id"),
                        (name: "ReadByIds", inputTypeAndNames: $"List<{model.Name}Id> ids"),

                        (name: "Update",
                            inputTypeAndNames:
                            $"Update{project.Prefix}Input{project.Postfix}{project.GeneratorSymbol} input"),

                        (name: "Patch",
                            inputTypeAndNames:
                            $"Update{project.Prefix}Input{project.Postfix}{project.GeneratorSymbol} input"),

                        (name: "Delete",
                            inputTypeAndNames:
                            $"Delete{project.Prefix}Input{project.Postfix}{project.GeneratorSymbol} input"),
                        (name: "DeleteById", inputTypeAndNames: camelPrimaryKeyFullNames_by_comma),
                        (name: "DeleteById", inputTypeAndNames: $"{model.Name}Id id"),
                        (name: "DeleteByIds", inputTypeAndNames: $"List<{model.Name}Id> ids")
                    };

                    if (primaryKeys.Count() == 1)
                        modelInfos.AddRange(
                            collection: new List<(string name, string inputTypeAndNames)>
                            {
                                (name: "GetByIds",
                                    inputTypeAndNames: $"List<{primaryKeys[index: 0].Signature.FullType}> ids"),
                                (name: "ReadByIds",
                                    inputTypeAndNames: $"List<{primaryKeys[index: 0].Signature.FullType}> ids"),
                                (name: "DeleteByIds",
                                    inputTypeAndNames: $"List<{primaryKeys[index: 0].Signature.FullType}> ids")
                            });

                    ;

                    modelInfos.ForEach(action: tuple =>
                    {
                        var name = tuple.name;
                        var completeName = name + "Async";
                        var inputTypeAndName = tuple.inputTypeAndNames;
                        var typeName = $"Task<{name}{project.Prefix}Output{project.Postfix}{project.GeneratorSymbol}>";

                        modelMethods.Add(item: new TemplateMethod
                        {
                            Name = $"{name}Async",
                            IsPublic = true,
                            Signature = new TemplateMethodSignature
                            {
                                AccessModifier = "public",
                                Parameters = new List<string> { inputTypeAndName, "CancellationToken cancellationToken" },
                                Type = $"Task<{name}{project.Prefix}Output{project.Postfix}{project.GeneratorSymbol}>",
                                Name = $"{name}Async",
                                TypeAndNameAndParameters =
                                    $"{typeName} {name}Async({inputTypeAndName}, CancellationToken cancellationToken)"
                            },
                            IsAdded = true,
                            IsModelMethod = true
                        });
                    });

                    modelMethods = new List<TemplateMethod>();
                    if (foundService is null)
                    {
                        var modelService = new TemplateService
                        {
                            Name = model.Name,
                            Groups = model.Groups,
                            IsAbstract = false,
                            Methods = modelMethods,
                            ModelCounterpart = model,
                            Properties = new List<TemplateProperty>(),
                            Constructors = new List<TemplateConstructor>(),
                            Interfaces = new List<TemplateInterface>(),
                            Project = project
                        };

                        services.Add(item: modelService);
                    }
                    else
                    {
                        foundService.ModelCounterpart = model;
                        modelMethods.ForEach(action: modelMethod =>
                        {
                            var exists = foundService.Methods.Exists(match: method =>
                            {
                                var hasSameTypeName = method.Signature.Type == modelMethod.Signature.Type;
                                var hasSameName = method.Signature.Name == modelMethod.Signature.Name;
                                var hasSameParameters = method.Signature.Parameters.Count() ==
                                                        modelMethod.Signature.Parameters.Count();

                                if (hasSameParameters)
                                    for (var i = 0; i < modelMethod.Signature.Parameters.Count(); i++)
                                        if (method.Signature.Parameters[index: i] !=
                                            modelMethod.Signature.Parameters[index: i])
                                            hasSameParameters = false;

                                return hasSameTypeName && hasSameName && hasSameParameters;
                            });

                            if (!exists) foundService.Methods.Add(item: modelMethod);
                        });
                    }
                });

                data.Services.AddRange(collection: services);

                var a = services
                    .Where(predicate: x => x.Methods.Any(predicate: y => y.Signature.FullTypeAndName is null)).ToList();
            }
        }

    }
}
