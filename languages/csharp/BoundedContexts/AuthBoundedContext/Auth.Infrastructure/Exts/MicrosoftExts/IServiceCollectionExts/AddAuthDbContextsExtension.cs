

using Auth.Infrastructure.DbContexts;
using Core.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddAuthDbContextsExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomAuthDbContext(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<AuthDbContext>(optionsAction: options =>
                 options.BuildCustomDbContextOptions(configuration, migrationsAssembly));

            return services;
        }
    }
}