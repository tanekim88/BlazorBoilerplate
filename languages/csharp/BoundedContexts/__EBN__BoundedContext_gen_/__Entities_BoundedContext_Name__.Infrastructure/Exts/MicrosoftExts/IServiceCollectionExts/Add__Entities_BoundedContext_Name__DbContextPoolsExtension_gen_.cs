

using __Entities_BoundedContext_Name__.Infrastructure.DbContexts;
using Core.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace __Entities_BoundedContext_Name__.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class Add__Entities_BoundedContext_Name__DbContextPoolsExtension_gen_
    {
        private static readonly string migrationsAssembly = typeof(__Entities_BoundedContext_Name__DbContext_Gen_).Assembly.FullName;

        public static IServiceCollection AddCustom__Entities_BoundedContext_Name__DbContextPool(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<__Entities_BoundedContext_Name__DbContext_Gen_>(optionsAction: options =>
                options.BuildCustomDbContextOptions(configuration, migrationsAssembly));
            return services;
        }
    }
}