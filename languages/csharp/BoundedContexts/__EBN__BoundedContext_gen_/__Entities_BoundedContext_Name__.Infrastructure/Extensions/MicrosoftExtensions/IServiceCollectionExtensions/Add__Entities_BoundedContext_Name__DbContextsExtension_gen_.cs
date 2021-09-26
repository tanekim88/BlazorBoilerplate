using __Entities_BoundedContext_Name__.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace __Entities_BoundedContext_Name__.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class Add__Entities_BoundedContext_Name__DbContextsExtension_gen_
    {
        private static readonly string migrationsAssembly = typeof(__Entities_BoundedContext_Name__DbContext_Gen_).Assembly.FullName;

        public static IServiceCollection AddCustomAuthDbContext(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<__Entities_BoundedContext_Name__DbContext_Gen_>(optionsAction: options =>
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