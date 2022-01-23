using Core.Infrastructure.Exts.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shop.Infrastructure.DbContexts;

namespace Shop.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddShopDbContextPoolsExtension
    {
        private static readonly string migrationsAssembly = typeof(ShopDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomShopDbContextPool(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<ShopDbContext>(optionsAction: options =>
               options.BuildCustomDbContextOptions(configuration, migrationsAssembly));

            return services;
        }
    }
}