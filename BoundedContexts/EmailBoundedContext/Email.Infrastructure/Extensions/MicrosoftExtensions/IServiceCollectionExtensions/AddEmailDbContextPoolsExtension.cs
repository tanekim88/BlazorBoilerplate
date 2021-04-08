using Email.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Email.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddEmailDbContextPoolsExtension
    {
        private static readonly string migrationsAssembly = typeof(EmailDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomAuthDbContextPool(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<EmailDbContext>(optionsAction: options => options.UseSqlServer(connectionString: configuration.GetConnectionString(name: "DefaultConnection"), sqlServerOptionsAction: sql =>
            {
                sql.MigrationsAssembly(assemblyName: migrationsAssembly);
                sql.UseNetTopologySuite();
            }).UseLazyLoadingProxies());
            return services;
        }
    }
}