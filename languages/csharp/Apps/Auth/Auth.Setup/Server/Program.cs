using CodeGenerator.Models;
using CodeGenerator.Services.CodeGeneratorServices;
using Core.Infrastructure.Exts.MicrosoftExts.IConfigurationBuilderExts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Auth.Setup.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            CodeGeneratorService.AddExistingProjects(new List<TemplateProject>
                {
                    new()
                    {
                        Name = $"{nameof(Auth)}.{nameof(Auth.Client)}",
                        Prefix = "",
                        Postfix = "",
                        Assembly =
                            typeof(Auth.Client.App).Assembly,
                        CodeName =  $"{nameof(Auth)}_{nameof(Auth.Client)}",
                        GeneratorSymbol = "Auth",
                        IsShared = true
                    },
                    new()
                    {
                        Name = $"{nameof(Auth)}.{nameof(Auth.Server)}",
                        Prefix = "",
                        Postfix = "",
                        Assembly =
                            typeof(Auth.Server.Controllers.OidcConfigurationController).Assembly,
                        CodeName = $"{nameof(Auth)}_{nameof(Auth.Server)}",
                        GeneratorSymbol = "Auth",
                        IsShared = true
                    },
                    new()
                    {
                        Name = $"{nameof(Auth)}.{nameof(Auth.Shared)}",
                        Prefix = "",
                        Postfix = "",
                        Assembly =
                            typeof(Auth.Shared.WeatherForecast).Assembly,
                        CodeName = $"{nameof(Auth)}_{nameof(Auth.Shared)}",
                        GeneratorSymbol = "Auth",
                        IsShared = true
                    } 
            });
            await CodeGeneratorService.ProcessArgs(
               args: new[]
                {
                                "-g",
                                "-f", @"C:\Projects\Apps\Auth\Server",
                                "-f", @"C:\Projects\Apps\Auth\Shared",
                                "-f", @"C:\Projects\Apps\Auth\Client",

                },
                dependentProjects: new List<TemplateProject>
                {             
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Client)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Server)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Shared)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Domain)}"],
                    //CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Application)}" ],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Auth)}.{nameof(Auth.Infrastructure)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedAuth)}.{nameof(SharedAuth.Domain)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedAuth)}.{nameof(SharedAuth.Application)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedAuth)}.{nameof(SharedAuth.Infrastructure)}"],

                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Domain)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Application)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(Core)}.{nameof(Core.Infrastructure)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Domain)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Application)}"],
                    CodeGeneratorService.ProjectNameToProjectDic[key: $"{nameof(SharedCore)}.{nameof(SharedCore.Infrastructure)}"]
                }
            );
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