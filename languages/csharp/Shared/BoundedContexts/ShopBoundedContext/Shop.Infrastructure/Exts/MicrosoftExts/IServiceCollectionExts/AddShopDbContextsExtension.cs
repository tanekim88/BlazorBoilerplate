using Shop.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Core.Infrastructure;
using Core.Infrastructure.Exts.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;

namespace Shop.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddShopDbContextsExtension
    {
        private static readonly string migrationsAssembly = typeof(ShopDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomShopDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ShopDbContext>(optionsAction: options =>
               options.BuildCustomDbContextOptions(configuration, migrationsAssembly));
            return services;
        }
    }
}