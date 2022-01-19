

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class ConfigureMvcOptionsExtension
    {
        public static IServiceCollection ConfigureCustomMvcOptions(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.Configure<MvcOptions>(configureOptions: options =>
            {
                options.MaxModelBindingCollectionSize = 1024;
            });
            return services;
        }
    }
}