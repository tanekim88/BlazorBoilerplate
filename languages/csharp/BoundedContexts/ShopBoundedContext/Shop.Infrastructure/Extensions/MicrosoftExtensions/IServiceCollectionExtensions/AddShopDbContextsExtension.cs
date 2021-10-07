using Shop.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Core.Infrastructure;

namespace Shop.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddShopDbContextsExtension
    {
        private static readonly string migrationsAssembly = typeof(ShopDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomAuthDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ShopDbContext>(optionsAction: options => options
            .ReplaceService<IValueConverterSelector, StronglyTypedIdValueConverterSelector>()
            .UseSqlServer(connectionString: configuration.GetConnectionString(name: "DefaultConnection"), sqlServerOptionsAction: sql =>
            {
                sql.MigrationsAssembly(assemblyName: migrationsAssembly);
                sql.UseNetTopologySuite();
            }).UseLazyLoadingProxies());
            return services;
        }
    }
}