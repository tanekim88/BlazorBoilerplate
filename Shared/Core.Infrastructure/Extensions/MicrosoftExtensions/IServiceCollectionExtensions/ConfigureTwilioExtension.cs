

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SharedCore.Application.Models.TextMessageProviderModels.TwilioModels;
using Twilio;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class ConfigureTwilioExtension
    {
        public static IServiceCollection ConfigureCustomTwilio(this IServiceCollection services,
            IConfiguration configuration)
        {
            var twillioSection = configuration.GetSection(key: "Twilio");
            var accountSid = twillioSection.GetValue<string>(key: "AccountSid");
            var authToken = twillioSection.GetValue<string>(key: "AuthToken");
            TwilioClient.Init(username: accountSid, password: authToken);

            services.Configure<TwilioVerifySettingModel>(config: configuration.GetSection(key: "Twilio"));

            //services.AddSingleton<TwilioService>();
            return services;
        }
    }
}