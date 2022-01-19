

using Auth.Infrastructure.DbContexts;
using Core.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddAuthDbContextPoolsExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomAuthDbContextPool(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<AuthDbContext>(optionsAction: options =>
                options.UseSqlServer(
                    connectionString: configuration.GetConnectionString(name: "DefaultConnection"),
                    sqlServerOptionsAction: sql =>
                    {
                        sql.MigrationsAssembly(assemblyName: migrationsAssembly);
                        sql.UseNetTopologySuite();
                    }).UseLazyLoadingProxies());
            return services;
        }
    }
}