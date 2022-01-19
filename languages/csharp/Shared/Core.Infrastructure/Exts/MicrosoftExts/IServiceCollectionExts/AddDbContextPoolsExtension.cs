using Core.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
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