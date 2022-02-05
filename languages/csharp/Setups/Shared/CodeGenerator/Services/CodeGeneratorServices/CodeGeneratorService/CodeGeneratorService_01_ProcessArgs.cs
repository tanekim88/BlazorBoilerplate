using CodeGenerator.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.CommandLine;
using System.CommandLine.NamingConventionBinder;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData, TFile> where TFile : TemplateFile<TData>
    {
        public async Task<int> ProcessArgs(string[] args)
        {
            var cmd = new RootCommand
            {
                new Option(aliases: new[] {"--gen", "-g"}, description: "Generate Code."),
                new Option<List<FileInfo>>(aliases: new[] {"--path", "-f"}, description: "Template Paths.")
            };

            cmd.Handler = CommandHandler.Create(
                action: async (bool gen, List<FileInfo> fileInfos) =>
                {
                    var templatePaths = fileInfos.SelectMany(selector: fileInfo =>
                       {
                           var processedPath = fileInfo.FullName
                           .Replace(oldValue: "\"", newValue: "")
                           .TrimEnd(trimChar: '\\')
                           .TrimEnd(trimChar: '/');

                           if (File.GetAttributes(processedPath).HasFlag(FileAttributes.Directory))
                           {
                               var task = _codeGeneratorProvider.GetTemplatesWithinDirectoryPathAsync(processedPath);
                               task.Wait();

                               var templates = task.Result.Where(filePath =>
                               {
                                   if (File.GetAttributes(filePath).HasFlag(FileAttributes.Directory))
                                   {
                                       if (Directory.Exists(filePath))
                                       {
                                           var isValidTemplateDirectoryTask = _codeGeneratorProvider.IsValidTemplateDirectory(filePath);
                                           isValidTemplateDirectoryTask.Wait();
                                           return isValidTemplateDirectoryTask.Result;
                                       }
                                   }
                                   else
                                   {
                                       if (File.Exists(filePath))
                                       {
                                           var isValidTemplateFileTask = _codeGeneratorProvider.IsValidTemplateFile(filePath);
                                           isValidTemplateFileTask.Wait();
                                           return isValidTemplateFileTask.Result;
                                       }
                                   }

                                   return false;
                               });

                               return templates.ToList();
                           }
                           else
                           {
                               var isValidTemplateFileTask = _codeGeneratorProvider.IsValidTemplateFile(processedPath);
                               isValidTemplateFileTask.Wait();
                               if (File.Exists(processedPath) && isValidTemplateFileTask.Result)
                               {
                                   return new List<string> { processedPath };
                               }
                           }

                           throw new Exception("File doesn't exists");
                       });

                    try
                    {
                        var host = CreateHostBuilder(args: null).Build();
                        if (gen)
                            using (var scope = host.Services.CreateScope())
                            {
                                var provider = scope.ServiceProvider;
                                var codeSetupService = provider.GetRequiredService<CodeGeneratorService<TData, TFile>>();

                                await codeSetupService.GenerateCodes(
                                    templatePaths: templatePaths.ToList());
                            }
                        else
                            host.Run();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message);
                    }
                });

            return cmd.Invoke(args: args);
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args: args)
                .ConfigureAppConfiguration(configureDelegate: (hostingContext, config) =>
                {
                    var env = hostingContext.HostingEnvironment;

                    //config.AddServerAppSettings(env);
                })
                .ConfigureWebHostDefaults(configure: webBuilder =>
                {
                    webBuilder
                        //.UseStartup<Startup>()
                        .UseUrls("https://localhost:7001", "http://localhost:7000")
                        .UseSerilog();
                });
        }


        public record ProcessArgsOutput
        {
        }
    }
}