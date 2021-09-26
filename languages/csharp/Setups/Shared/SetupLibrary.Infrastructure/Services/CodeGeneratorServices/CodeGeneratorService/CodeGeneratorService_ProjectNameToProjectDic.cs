
using DocumentFormat.OpenXml.Office2013.PowerPoint.Roaming;
using Library.Infrastructure.Services.PathServices;
using SetupLibrary.Application.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public static List<string> newBoundedContextNames = new List<string> { "Email", "Shop" };

        public static List<TemplateProject> templateProjects = new List<TemplateProject> {

             new()
                {
                    Name = $"{nameof(__Entities_BoundedContext_Name__)}.{nameof(__Entities_BoundedContext_Name__.Domain)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(__Entities_BoundedContext_Name__.Domain.Interfaces.RepositoryInterfaces.__Entities_Groups_00_Name__RepositoryInterfaces.I__Entities_Name__Repository_Gen_).Assembly,
                    CodeName = $"{nameof(__Entities_BoundedContext_Name__)}_{nameof(__Entities_BoundedContext_Name__.Domain)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(__Entities_BoundedContext_Name__)}.{nameof(__Entities_BoundedContext_Name__.Application)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(__Entities_BoundedContext_Name__.Application.__Entities_BoundedContext_Name__ApplicationConfig).Assembly,
                    CodeName = $"{nameof(__Entities_BoundedContext_Name__)}_{nameof(__Entities_BoundedContext_Name__.Application)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(__Entities_BoundedContext_Name__)}.{nameof(__Entities_BoundedContext_Name__.Infrastructure)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(__Entities_BoundedContext_Name__.Infrastructure.DbContexts.__Entities_BoundedContext_Name__DbContext_Gen_).Assembly,
                    CodeName = $"{nameof(__Entities_BoundedContext_Name__)}_{nameof(__Entities_BoundedContext_Name__.Infrastructure)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },

                new()
                {
                    Name = $"{nameof(Shared__Entities_BoundedContext_Name__)}.{nameof(Shared__Entities_BoundedContext_Name__.Domain)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Shared__Entities_BoundedContext_Name__.Domain.Shared__Entities_BoundedContext_Name__DomainConfig).Assembly,
                    CodeName = $"{nameof(Shared__Entities_BoundedContext_Name__)}_{nameof(Shared__Entities_BoundedContext_Name__.Domain)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(Shared__Entities_BoundedContext_Name__)}.{nameof(Shared__Entities_BoundedContext_Name__.Application)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Shared__Entities_BoundedContext_Name__.Application.Shared__Entities_BoundedContext_Name__ApplicationConfig).Assembly,
                    CodeName = $"{nameof(Shared__Entities_BoundedContext_Name__)}_{nameof(Shared__Entities_BoundedContext_Name__.Application)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(Shared__Entities_BoundedContext_Name__)}.{nameof(Shared__Entities_BoundedContext_Name__.Infrastructure)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Shared__Entities_BoundedContext_Name__.Infrastructure.Shared__Entities_BoundedContext_Name__InfrastructureConfig).Assembly,
                    CodeName = $"{nameof(Shared__Entities_BoundedContext_Name__)}_{nameof(Shared__Entities_BoundedContext_Name__.Infrastructure)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(__Entities_BoundedContext_Name__)}.{nameof(__Entities_BoundedContext_Name__.IntegrationEvents)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(__Entities_BoundedContext_Name__.IntegrationEvents.__Entities_BoundedContext_Name__IntegrationEventsConfig).Assembly,
                    CodeName = $"{nameof(__Entities_BoundedContext_Name__)}_{nameof(__Entities_BoundedContext_Name__.IntegrationEvents)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(__Entities_BoundedContext_Name__)}.{nameof(__Entities_BoundedContext_Name__.ArchTests)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(__Entities_BoundedContext_Name__.ArchTests.UnitTest1).Assembly,
                    CodeName = $"{nameof(__Entities_BoundedContext_Name__)}_{nameof(__Entities_BoundedContext_Name__.ArchTests)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(__Entities_BoundedContext_Name__)}.{nameof(__Entities_BoundedContext_Name__.UnitTests)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(__Entities_BoundedContext_Name__.UnitTests.UnitTest1).Assembly,
                    CodeName = $"{nameof(__Entities_BoundedContext_Name__)}_{nameof(__Entities_BoundedContext_Name__.UnitTests)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(__Entities_BoundedContext_Name__)}.{nameof(__Entities_BoundedContext_Name__.IntegrationTests)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(__Entities_BoundedContext_Name__.IntegrationTests.UnitTest1).Assembly,
                    CodeName = $"{nameof(__Entities_BoundedContext_Name__)}_{nameof(__Entities_BoundedContext_Name__.IntegrationTests)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
        };

        public static List<TemplateProject> existingProjects = new List<TemplateProject>
            {
                new()
                {
                    Name = $"{nameof(SharedLibrary)}.{nameof(SharedLibrary.Domain)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedLibrary.Domain.Class1).Assembly,
                    CodeName = $"{nameof(SharedLibrary)}_{nameof(SharedLibrary.Domain)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(SharedLibrary)}.{nameof(SharedLibrary.Application)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedLibrary.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces.ISharedAssemblyService).Assembly,
                    CodeName = $"{nameof(SharedLibrary)}_{nameof(SharedLibrary.Application)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(SharedLibrary)}.{nameof(SharedLibrary.Infrastructure)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedLibrary.Infrastructure.Services.AssemblyServices.SharedAssemblyService).Assembly,
                    CodeName = $"{nameof(SharedLibrary)}_{nameof(SharedLibrary.Infrastructure)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },



                new()
                {
                    Name = $"{nameof(Library)}.{nameof(Library.Domain)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Library.Domain.Class1).Assembly,
                    CodeName = $"{nameof(Library)}_{nameof(Library.Domain)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(Library)}.{nameof(Library.Application)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Library.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces.IAssemblyService).Assembly,
                    CodeName = $"{nameof(Library)}_{nameof(Library.Application)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(Library)}.{nameof(Library.Infrastructure)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Library.Infrastructure.Services.AssemblyServices.AssemblyService).Assembly,
                    CodeName = $"{nameof(Library)}_{nameof(Library.Infrastructure)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },




                new()
                {
                    Name = $"{nameof(SharedCore)}.{nameof(SharedCore.Domain)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedCore.Domain.Interfaces.ModelInterfaces.IAuthoredAt).Assembly,
                    CodeName =  $"{nameof(SharedCore)}_{nameof(SharedCore.Domain)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(SharedCore)}.{nameof(SharedCore.Application)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedCore.Application.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces.IShared__Entities_Name__ApplicationService_Gen_).Assembly,
                    CodeName =  $"{nameof(SharedCore)}_{nameof(SharedCore.Application)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(SharedCore)}.{nameof(SharedCore.Infrastructure)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedCore.Infrastructure.AppSettings.SharedAppsettings).Assembly,
                    CodeName = $"{nameof(SharedCore)}_{nameof(SharedCore.Infrastructure)}",
                    GeneratorSymbol = "Shared",
                    IsShared = true
                },


                new()
                {
                    Name = $"{nameof(Core)}.{nameof(Core.Domain)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Core.Domain.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces.I__Entities_Name__DomainService_Gen_).Assembly,
                    CodeName = $"{nameof(Core)}_{nameof(Core.Domain)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(Core)}.{nameof(Core.Application)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Core.Application.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces.I__Entities_Name__ApplicationService_Gen_).Assembly,
                    CodeName = $"{nameof(Core)}_{nameof(Core.Application)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                new()
                {
                    Name = $"{nameof(Core)}.{nameof(Core.Infrastructure)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Core.Infrastructure.DbContexts.ApplicationDbContext).Assembly,
                    CodeName = $"{nameof(Core)}_{nameof(Core.Infrastructure)}",
                    GeneratorSymbol = "",
                    IsShared = false
                },
                ///////////////////////////////////////////////////////////////////////////////////////////

                new()
                {
                    Name = $"{nameof(SharedAuth)}.{nameof(SharedAuth.Domain)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedAuth.Domain.Class1).Assembly,
                    CodeName =  $"{nameof(SharedAuth)}_{nameof(SharedAuth.Domain)}",
                    GeneratorSymbol = "Auth",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(SharedAuth)}.{nameof(SharedAuth.Application)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedAuth.Application.Class1).Assembly,
                    CodeName =  $"{nameof(SharedAuth)}_{nameof(SharedAuth.Application)}",
                    GeneratorSymbol = "Auth",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(SharedAuth)}.{nameof(SharedAuth.Infrastructure)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(SharedAuth.Infrastructure.Class1).Assembly,
                    CodeName = $"{nameof(SharedAuth)}_{nameof(SharedAuth.Infrastructure)}",
                    GeneratorSymbol = "Auth",
                    IsShared = true
                },


                new()
                {
                    Name = $"{nameof(Auth)}.{nameof(Auth.Domain)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Auth.Domain.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces.I__Entities_Name__DomainService_AuthGen_).Assembly,
                    CodeName = $"{nameof(Auth)}_{nameof(Auth.Domain)}",
                    GeneratorSymbol = "Auth",
                    IsShared = false
                },
                //new()
                //{
                //    Name = $"{nameof(Auth)}.{nameof(Auth.Application)}",
                //    Prefix = "",
                //    Postfix = "",
                //    Assembly =
                //        typeof(Auth.Application.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces.I__Entities_Name__ApplicationService_Gen_).Assembly,
                //    CodeName = $"{nameof(Auth)}_{nameof(Auth.Application)}",
                //    GeneratorSymbol = "Auth",
                //    IsShared = false
                //},
                new()
                {
                    Name = $"{nameof(Auth)}.{nameof(Auth.Infrastructure)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly =
                        typeof(Auth.Infrastructure.DbContexts.AuthDbContext).Assembly,
                    CodeName = $"{nameof(Auth)}_{nameof(Auth.Infrastructure)}",
                    GeneratorSymbol = "Auth",
                    IsShared = false
                },

                //////////////////////////////////////////////////////////////////////////////////////////////////


                new()
                {
                    Name = $"{nameof(BlazorApp)}.{nameof(BlazorApp.Server)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly = typeof(BlazorApp.Server.Program).Assembly,
                    CodeName = $"{nameof(BlazorApp)}_{nameof(BlazorApp.Server)}",
                    GeneratorSymbol = ""
                },
                new()
                {
                    Name = $"{nameof(BlazorApp)}.{nameof(BlazorApp.Shared)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly = typeof(BlazorApp.Shared.Localizations.Resources.Resource).Assembly,
                    CodeName = $"{nameof(BlazorApp)}_{nameof(BlazorApp.Shared)}",
                    GeneratorSymbol = "",
                    IsShared = true
                },
                new()
                {
                    Name = $"{nameof(BlazorApp)}.{nameof(BlazorApp.Client)}",
                    Prefix = "",
                    Postfix = "",
                    Assembly = typeof(BlazorApp.Client.Program).Assembly,
                    CodeName = $"{nameof(BlazorApp)}_{nameof(BlazorApp.Client)}",
                    GeneratorSymbol = ""
                },
                new ()
                {
                    Name = $"{nameof(BlazorApp)}.{nameof(BlazorApp.IntegrationTests)}",
                    Prefix = "",
                    Postfix = $"",
                    Assembly = typeof(BlazorApp.IntegrationTests.UnitTest1).Assembly,
                    CodeName = $"{nameof(BlazorApp)}_{nameof(BlazorApp.IntegrationTests)}",
                    GeneratorSymbol = ""
                },
                new ()
                {
                    Name = $"{nameof(BlazorApp)}.{nameof(BlazorApp.ArchTests)}",
                    Prefix = "",
                    Postfix = $"",
                    Assembly = typeof(BlazorApp.ArchTests.UnitTest1).Assembly,
                    CodeName = $"{nameof(BlazorApp)}_{nameof(BlazorApp.ArchTests)}",
                    GeneratorSymbol = ""
                },
                new ()
                {
                    Name = $"{nameof(BlazorApp)}.{nameof(BlazorApp.UnitTests)}",
                    Prefix = "",
                    Postfix = $"",
                    Assembly = typeof(BlazorApp.UnitTests.UnitTest1).Assembly,
                    CodeName = $"{nameof(BlazorApp)}_{nameof(BlazorApp.UnitTests)}",
                    GeneratorSymbol = ""
                }


        };

        static CodeGeneratorService()
        {
            AddExistingProjects(existingProjects.Concat(templateProjects).ToList());
            foreach (var newBoundedContextName in newBoundedContextNames)
            {
                AddNewProjects(newBoundedContextName);
            }
        }

        public static void AddNewProjects(string boundedContextName)
        {
            var boundedContext = new TemplateBoundedContext
            {
                Name = boundedContextName
            };


            templateProjects.ForEach(templateProject =>
                    {
                        var clonedProject = (TemplateProject)templateProject.Clone();

                        clonedProject.BoundedContext = boundedContext;

                        foreach (var prop in templateProject.GetType().GetProperties())
                        {
                            var value = prop.GetValue(clonedProject);
                            if (value is not null && value.GetType() == typeof(string))
                            {
                                var finalValue = value.ToString()
                                .Replace("__Entities_BoundedContext_Name__", boundedContextName)
                                .Replace("__EBN__", boundedContextName);

                                var codeType = TemplateCodeType.GetCodeTypeFromExtension(".cs");

                                finalValue = codeType.RemoveTemplatePostfix(finalValue, true);

                                prop.SetValue(clonedProject, finalValue);
                            }
                        }

                        clonedProject.Files = new List<TemplateFile>();



                        ProjectNameToProjectDic[clonedProject.Name] = clonedProject;
                    });
        }


        public static void AddExistingProjects(List<TemplateProject> projects)
        {
            projects.ForEach(proj =>
               {
                   var result = PathService.GetProjectPath_Static(
                       projectName: proj.Name
                   );

                   var projPath = result.ProjectPath;
                   var projDirPath = result.ProjectDirPath;

                   proj.Path = projPath;
                   proj.DirPath = projDirPath;
                   proj.Files = new List<TemplateFile>();


                   ProjectNameToProjectDic[proj.Name] = proj;
               });

        }

        public static List<TemplateProject> GetProjectsByBoundedContextName(string boundedContextName)
        {
            ProjectNameToProjectDic.TryGetValue(boundedContextName + ".Domain", out TemplateProject domainProj);
            ProjectNameToProjectDic.TryGetValue(boundedContextName + ".Application", out TemplateProject applicationProj);
            ProjectNameToProjectDic.TryGetValue(boundedContextName + ".Infrastructure", out TemplateProject infrastructureProj);
            var toReturn = new List<TemplateProject> { domainProj, applicationProj, infrastructureProj }.Where(proj => proj is not null);

            return toReturn.ToList();
        }

        public static Dictionary<string, TemplateProject> ProjectNameToProjectDic { get; set; } = new();

    }
}