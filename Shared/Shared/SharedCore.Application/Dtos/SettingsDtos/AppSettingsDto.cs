

using System.Collections.Generic;



namespace SharedCore.Application.Dtos.SettingsDtos
{
    public class AppSettingsDto
    {
        public Dictionary<string, ProjectSettingsDto> Projects { get; set; } = new()
        {
            [key: "IdentityServer"] = new()
            {
                Url = "https://localhost:5001"
            },
            [key: "BlazorApp"] = new()
            {
                Url = "https://localhost:4001"
            }
        };
    }
}