

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
using Core.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddOpenIddictDbContextPoolExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomOpenIddictDbContextPool(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<AuthDbContext>(optionsAction: options =>
            {
                options.BuildCustomDbContextOptions(configuration, migrationsAssembly);

                options.BuildCustomDbContextOptionsForOpenIDDict();
            });

            return services;
        }
    }
}