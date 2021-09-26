

using Core.Infrastructure.Extensions.MicrosoftExtensions.IConfigurationBuilderExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;



namespace Auth.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            var host = CreateHostBuilder(args: args).Build();
            using (var scope = host.Services.CreateScope())
            {
                try
                {
                    Log.Information(messageTemplate: "Starting web host");
                    host.Run();
                }
                catch (Exception ex)
                {
                    Log.Fatal(exception: ex, messageTemplate: "Host terminated unexpectedly");
                }
                finally
                {
                    Log.CloseAndFlush();
                }
            }
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
                        // .UseUrls("https://localhost:5001", "http://localhost:5000")
                        .UseSerilog();
                });
        }
    }
}