

using Auth.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddAuthDbContextsExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomAuthDbContext(this IServiceCollection services,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddDbContext<AuthDbContext>(optionsAction: options =>
                 options.BuildCustomDbContextOptions(configuration,env, migrationsAssembly));

            return services;
        }
    }
}