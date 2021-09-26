

using System;
using System.Collections.Generic;
using System.CommandLine;
using System.CommandLine.Invocation;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Core.Infrastructure.Extensions.MicrosoftExtensions.IConfigurationBuilderExtensions;
using Library.Infrastructure.Services.PathServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public static async Task<int> ProcessArgs(string[] args, List<TemplateProject> dependentProjects)
        {
            dependentProjects.Reverse();
            var cmd = new RootCommand
            {
                new Option(aliases: new[] {"--gen", "-g"}, description: "Generate Code."),
                new Option<List<FileInfo>>(aliases: new[] {"--path", "-f"}, description: "Template Paths.")
            };

            cmd.Handler = CommandHandler.Create(
                action: async (bool gen, List<FileInfo> path) =>
                {
                    var templatePaths = path.SelectMany(selector: p =>
                    {
                        var path = p.FullName.Replace(oldValue: "\"", newValue: "").TrimEnd(trimChar: '\\')
                            .TrimEnd(trimChar: '/');

                        var toReturn = new List<string> { path };

                        if (!File.Exists(path: path))
                        {

                            var dirGenPaths = Directory.EnumerateDirectories(path, "*_*Gen_", SearchOption.AllDirectories);

                            var result = PathService.GetFilesThatMatchesTheGlob_Static(
                                currentDirPath: path,
                                excludedDirs: new List<string> { "node_modules" },
                                globPatterns: new List<string> { "*_*Gen_*" }
                            );

                            var foundFilePaths = result.FoundPaths.Concat(dirGenPaths);

                            if (Regex.IsMatch(input: path, pattern: @"_\w*[Gg]en_$"))
                            {
                                foundFilePaths = foundFilePaths.Concat(new List<string> { path });
                            }

                            toReturn = foundFilePaths.Where(predicate: p =>
                            {
                                return Regex.IsMatch(input: p, pattern: @"_\w*[Gg]en_(\.\w+)?$");
                            }).ToList();

                        }

                        return toReturn;
                    }).ToList();

                    try
                    {
                        var host = CreateHostBuilder(args: null).Build();
                        if (gen)
                            using (var scope = host.Services.CreateScope())
                            {
                                var provider = scope.ServiceProvider;
                                var codeSetupService = provider.GetRequiredService<CodeGeneratorService>();

                                await codeSetupService.GenerateCodes(
                                    templatePaths: templatePaths, dependentProjects: dependentProjects);
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


        public record ProcessArgsOutput
        {
        }
    }
}