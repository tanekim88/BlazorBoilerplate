using Date.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Date.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddDateDbContextsExtension
    {
        private static readonly string migrationsAssembly = typeof(DateDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomAuthDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DateDbContext>(optionsAction: options => options.UseSqlServer(connectionString: configuration.GetConnectionString(name: "DefaultConnection"), sqlServerOptionsAction: sql =>
            {
                sql.MigrationsAssembly(assemblyName: migrationsAssembly);
                sql.UseNetTopologySuite();
            }).UseLazyLoadingProxies());
            return services;
        }
    }
}