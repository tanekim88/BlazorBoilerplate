

using Auth.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
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