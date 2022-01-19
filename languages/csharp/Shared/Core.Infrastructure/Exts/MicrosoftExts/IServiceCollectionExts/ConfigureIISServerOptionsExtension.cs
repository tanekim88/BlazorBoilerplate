

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class ConfigureIISServerOptionsExtension
    {
        public static IServiceCollection ConfigureCustomIIServerOptions(this IServiceCollection services)
        {
            services.Configure<IISServerOptions>(configureOptions: iis =>
            {
                iis.AuthenticationDisplayName = "Windows";
                iis.AutomaticAuthentication = false;
            });

            return services;
        }
    }
}