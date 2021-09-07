

using Microsoft.Extensions.Configuration;
using System.Collections.Generic;



namespace SharedCore.Application.Dtos.SettingsDtos
{
    public class AppSettingsDto
    {
        public Dictionary<string, ProjectSettingsDto> Projects { get; set; } = new()
        {
            [key: "Auth"] = new()
            {
                Url = "https://localhost:5001"
            },
            [key: "BlazorApp"] = new()
            {
                Url = "https://localhost:4001"
            }
        };

        public static AppSettingsDto GetAppSettingsDto(IConfiguration configuration)
        {
            var sharedAppSettings = new AppSettingsDto();

            foreach (var projKeyValuePair in sharedAppSettings.Projects)
            {
                var url = configuration.GetServiceUri(projKeyValuePair.Key);

                if (url is not null)
                {
                    projKeyValuePair.Value.Url = url.ToString();
                }
            }

            return sharedAppSettings;
        }
    }
}