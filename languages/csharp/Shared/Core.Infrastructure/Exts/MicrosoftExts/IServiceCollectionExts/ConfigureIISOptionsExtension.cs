﻿

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class ConfigureIISOptionsExtension
    {
        public static IServiceCollection ConfigureCustomIISOptions(this IServiceCollection services)
        {
            services.Configure<IISOptions>(configureOptions: iis =>
            {
                iis.AuthenticationDisplayName = "Windows";
                iis.AutomaticAuthentication = false;
            });

            return services;
        }
    }
}