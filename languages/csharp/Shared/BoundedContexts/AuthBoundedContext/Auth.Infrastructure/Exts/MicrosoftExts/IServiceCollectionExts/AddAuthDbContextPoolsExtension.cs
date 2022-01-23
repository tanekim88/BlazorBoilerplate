

using Auth.Infrastructure.DbContexts;
using Core.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddAuthDbContextPoolsExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomAuthDbContextPool(this IServiceCollection services,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddPooledDbContextFactory<AuthDbContext>(optionsAction: options =>
                options.BuildCustomDbContextOptions(configuration, env, migrationsAssembly));
            return services;
        }
    }
}