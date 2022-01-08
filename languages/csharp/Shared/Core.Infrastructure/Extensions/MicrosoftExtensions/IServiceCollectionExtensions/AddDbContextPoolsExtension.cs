

using Core.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddDbContextPoolsExtension
    {
        public static IServiceCollection AddCustomDbContextPool<TDbContext>(this IServiceCollection services,
            IConfiguration configuration) where TDbContext : DbContext
        {
            string migrationsAssembly = typeof(TDbContext).Assembly.FullName;
            services.AddPooledDbContextFactory<TDbContext>(optionsAction: options =>
               options.BuildCustomDbContextOptions(configuration, migrationsAssembly));
            return services;
        }
    }
}