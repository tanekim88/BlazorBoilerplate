

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using SharedCore.Application.Dtos.SettingsDtos;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.Json;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IConfigurationBuilderExtensions
{
    public static class AddAppSettingsExtension
    {
        public static IConfigurationBuilder AddServerAppSettings(this IConfigurationBuilder config,
            IHostEnvironment env)
        {
            var sharedAppSettings = AppSettingsDto.GetAppSettingsDto(config.Build());

            var options = new JsonSerializerOptions
            {
                IncludeFields = true
            };

            var json = JsonSerializer.Serialize(value: sharedAppSettings, options: options);

            var sharedSettingsStream = new MemoryStream(buffer: Encoding.ASCII.GetBytes(s: json));

            config
                  .SetBasePath(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location))
                //.AddJsonStream(stream: sharedSettingsStream)
                .AddJsonFile(path: "sharedAppsettings.json", optional: false)
                .AddJsonFile(path: "appsettings.json", optional: false)
                .AddJsonFile(path: $"sharedAppsettings.{env.EnvironmentName}.json", optional: false)
                .AddJsonFile(path: $"appsettings.{env.EnvironmentName}.json", optional: false)
                ;

            return config;
        }
    }
}