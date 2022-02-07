//using Auth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.BuilderExtensions.WebApplicationExtensions;
//using Core.Infrastructure.Extensions.MicrosoftExtensions.IConfigurationBuilderExtensions;
//using Microsoft.AspNetCore.Builder;
//using Microsoft.Extensions.DependencyInjection;
//using Serilog;
using CodeGenerator.Models;
using CodeGenerator.Services.CodeGeneratorServices;
using System;
using System.Collections.Generic;






await CodeGeneratorService.ProcessArgs(
             args: new[]
             {
                                "-g",
                                "-f", @"C:\app\languages\csharp\Shared\BoundedContexts\__BoundedContext_gen_",
             },
             dependentProjects: new List<TemplateProject>
             {
             }
         );
throw new Exception();

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














//var builder = WebApplication.CreateBuilder(args);
//builder.Host.ConfigureAppConfiguration(configureDelegate: (hostingContext, config) =>
//{
//    var env = hostingContext.HostingEnvironment;

//    config.AddServerAppSettings(env);
//})
////   .UseUrls("https://localhost:4001", "http://localhost:4000")
//.UseSerilog();

//AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);




//var app = builder.Build();

////app.UseCustomServerExtensions(configuration: builder.Configuration, builder.Environment);
//app.UseCustomBff(builder.Configuration, builder.Environment);
//using (var scope = app.Services.CreateScope())
//{
//    try
//    {
//        Log.Information(messageTemplate: "Starting web host");
//        app.Run();
//    }
//    catch (Exception ex)
//    {
//        Log.Fatal(exception: ex, messageTemplate: "Host terminated unexpectedly");
//    }
//    finally
//    {
//        Log.CloseAndFlush();
//    }
//}

