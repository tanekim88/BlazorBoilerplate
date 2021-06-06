

using Core.Infrastructure.Extensions.MicrosoftExtensions.IConfigurationBuilderExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
using SetupLibrary.Application.Models;
using SetupLibrary.Infrastructure.Services.CodeGeneratorServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace Setup.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            await CodeGeneratorService.ProcessArgs(
                args: new[]
                {
                                "-g",
                                "-f", @"C:\App\BoundedContexts\__EBN__BoundedContext_gen_",
                                //"-f", @"C:\App\BoundedContexts\__EBN__BoundedContext_gen_\__Entities_BoundedContext_Name__.Infrastructure\DbContexts\__Entities_BoundedContext_Name__DbContext_Gen_.cs",
                },
                dependentProjects: new List<TemplateProject>
                {
                    //CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Infrastructure)}" ],
                    //CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Application)}" ],
                    //CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Domain)}" ],
                    //CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Infrastructure)}" ],
                    //CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Application)}" ],
                    //CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Domain)}" ],
                }
            );
            //throw new Exception();

            await CodeGeneratorService.ProcessArgs(
                args: new[]
                {
                    "-g",
                    "-f", @"C:\App\Shared\Shared\SharedCore.Domain",
                    "-f", @"C:\App\Shared\Shared\SharedCore.Application",
                    "-f", @"C:\App\Shared\Shared\SharedCore.Infrastructure",
                    "-f", @"C:\App\Shared\Core.Domain",
                    "-f", @"C:\App\Shared\Core.Application",
                    "-f", @"C:\App\Shared\Core.Infrastructure"
                },
                dependentProjects: new List<TemplateProject>
                {
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Infrastructure)}" ],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Application)}" ],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Domain)}" ],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Infrastructure)}" ],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Application)}" ],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Domain)}" ],
                }
            );
            throw new Exception();


            await CodeGeneratorService.ProcessArgs(
                 args: new[]
                 {
                                        "-g",
                                        "-f", @"C:\App\BoundedContexts\AuthBoundedContext\Shared\SharedAuth.Domain",
                                        "-f", @"C:\App\BoundedContexts\AuthBoundedContext\Shared\SharedAuth.Application",
                                        "-f", @"C:\App\BoundedContexts\AuthBoundedContext\Shared\SharedAuth.Infrastructure",
                                        "-f", @"C:\App\BoundedContexts\AuthBoundedContext\Auth.Domain",
                                        //"-f", @"C:\App\BoundedContexts\AuthBoundedContext\Auth.Application",
                                        "-f", @"C:\App\BoundedContexts\AuthBoundedContext\Auth.Infrastructure"
                 },
                 dependentProjects: new List<TemplateProject>
                 {
                                        CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedAuth)}.{nameof(SharedAuth.Infrastructure)}" ],
                                        CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedAuth)}.{nameof(SharedAuth.Application)}" ],
                                        CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedAuth)}.{nameof(SharedAuth.Domain)}" ],
                                        CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Infrastructure)}" ],
                                        //CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Application)}" ],
                                        CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Domain)}" ],
                 }
             );
            //throw new Exception();


            await CodeGeneratorService.ProcessArgs(
                args: new[] { "-g", "-f", @"C:\Apps\Packages\BlazorApp.Package\Server" },
                dependentProjects: new List<TemplateProject>
                {
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(Library)],
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(SharedLibrary)],
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(Core)],
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(SharedCore)],
                    CodeGeneratorService.ProjectNameToProjectDic
                        [key: $"{nameof(BlazorApp)}.{nameof(BlazorApp.Shared)}"],
                    CodeGeneratorService.ProjectNameToProjectDic
                        [key: $"{nameof(BlazorApp)}.{nameof(BlazorApp.Client)}"],
                    CodeGeneratorService.ProjectNameToProjectDic
                        [key: $"{nameof(BlazorApp)}.{nameof(BlazorApp.Server)}"],
                });
            //throw new Exception();

            await CodeGeneratorService.ProcessArgs(
                args: new[] { "-g", "-f", @"C:\Apps\Packages\BlazorApp.Package\Client" },
            dependentProjects: new List<TemplateProject>
            {
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(SharedCore)],
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(SharedLibrary)],
                    CodeGeneratorService.ProjectNameToProjectDic
                        [key: $"{nameof(BlazorApp)}.{nameof(BlazorApp.Shared)}"],
                    CodeGeneratorService.ProjectNameToProjectDic
                        [key: $"{nameof(BlazorApp)}.{nameof(BlazorApp.Client)}"],
            });
            //throw new Exception();
            await CodeGeneratorService.ProcessArgs(
                args: new[] { "-g", "-f", @"C:\Apps\Packages\BlazorApp.Package\Shared\Localizations" },
                dependentProjects: new List<TemplateProject>
                {
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(Library)],
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(Core)],
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(SharedCore)],
                    CodeGeneratorService.ProjectNameToProjectDic[key: nameof(SharedLibrary)],
                    CodeGeneratorService.ProjectNameToProjectDic
                        [key: $"{nameof(BlazorApp)}.{nameof(BlazorApp.Shared)}"],
                    CodeGeneratorService.ProjectNameToProjectDic
                        [key: $"{nameof(BlazorApp)}.{nameof(BlazorApp.Server)}"],
                    CodeGeneratorService.ProjectNameToProjectDic
                        [key: $"{nameof(BlazorApp)}.{nameof(BlazorApp.Client)}"],
                });
            throw new Exception();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args: args)
                .ConfigureAppConfiguration(configureDelegate: (hostingContext, config) =>
                {
                    var env = hostingContext.HostingEnvironment;

                    config.AddServerAppSettings(env);
                })
                .ConfigureWebHostDefaults(configure: webBuilder =>
                {
                    webBuilder
                        .UseStartup<Startup>()
                        .UseUrls("https://localhost:7001", "http://localhost:7000")
                        .UseSerilog();
                });
        }
    }
}