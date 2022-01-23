using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Shop.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddShopServerExtensions
    {
        public static IServiceCollection AddCustomShopServer(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            return services;
        }
    }
}