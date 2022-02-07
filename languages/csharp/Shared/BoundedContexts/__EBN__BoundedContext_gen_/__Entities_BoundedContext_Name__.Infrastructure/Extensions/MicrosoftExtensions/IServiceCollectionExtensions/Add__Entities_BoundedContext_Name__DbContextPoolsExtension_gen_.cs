

using __BoundedContext_Name__.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace __BoundedContext_Name__.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class Add__BoundedContext_Name__DbContextPoolsExtension_gen_
    {
        private static readonly string migrationsAssembly = typeof(__BoundedContext_Name__DbContext_Gen_).Assembly.FullName;

        public static IServiceCollection AddCustom__BoundedContext_Name__DbContextPool(this IServiceCollection services,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddPooledDbContextFactory<__BoundedContext_Name__DbContext_Gen_>(optionsAction: options =>
                options.BuildCustomDbContextOptions(configuration, env, migrationsAssembly));
            return services;
        }
    }
}