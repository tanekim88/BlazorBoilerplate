

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
using Core.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
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
                options.BuildCustomDbContextOptions(configuration, migrationsAssembly);

                options.BuildCustomDbContextOptionsForOpenIDDict();
            });
            return services;
        }
    }
}