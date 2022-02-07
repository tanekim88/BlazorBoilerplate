using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shop.Infrastructure.DbContexts;

namespace Shop.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
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