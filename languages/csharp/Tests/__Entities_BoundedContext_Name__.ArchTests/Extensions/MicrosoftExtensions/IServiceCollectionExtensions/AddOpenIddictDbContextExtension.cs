

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.OpenIdDict;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddOpenIddictDbContextExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomOpenIddictDbContext(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<AuthDbContext>(optionsAction: options =>
            {
                options.UseSqlServer(
                    connectionString: configuration.GetConnectionString(name: "DefaultConnection"),
                    sqlServerOptionsAction: sql =>
                    {
                        sql.MigrationsAssembly(assemblyName: migrationsAssembly);
                        sql.UseNetTopologySuite();
                    }).UseLazyLoadingProxies();

                options.UseOpenIddict<CustomOpenIdApplication,
                    CustomOpenIdAuthorization, CustomOpenIdScope, CustomOpenIdToken, int>();
            });
            return services;
        }
    }
}