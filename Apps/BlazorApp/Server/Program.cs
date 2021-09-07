using Core.Infrastructure.Extensions.MicrosoftExtensions.IConfigurationBuilderExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Threading.Tasks;

namespace BlazorApp.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                try
                {
                    Log.Information("Starting web host");
                    host.Run();
                }
                catch (Exception ex)
                {
                    Log.Fatal(ex, "Host terminated unexpectedly");
                }
                finally
                {
                    Log.CloseAndFlush();
                }
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
              Host.CreateDefaultBuilder(args)
                  .ConfigureAppConfiguration((hostingContext, config) =>
                  {
                      var env = hostingContext.HostingEnvironment;

                      config.AddServerAppSettings(env);
                  })
                  .ConfigureWebHostDefaults(webBuilder =>
                  {
                      webBuilder
                          .UseStartup<Startup>()
                          .UseUrls("https://localhost:4001", "http://localhost:4000")
                          .UseSerilog();
                  });
    }
}