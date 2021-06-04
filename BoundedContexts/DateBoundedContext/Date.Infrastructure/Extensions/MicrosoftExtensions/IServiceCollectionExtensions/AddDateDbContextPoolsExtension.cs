using Date.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Date.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddDateDbContextPoolsExtension
    {
        private static readonly string migrationsAssembly = typeof(DateDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomAuthDbContextPool(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<DateDbContext>(optionsAction: options => options.UseSqlServer(connectionString: configuration.GetConnectionString(name: "DefaultConnection"), sqlServerOptionsAction: sql =>
            {
                sql.MigrationsAssembly(assemblyName: migrationsAssembly);
                sql.UseNetTopologySuite();
            }).UseLazyLoadingProxies());
            return services;
        }
    }
}