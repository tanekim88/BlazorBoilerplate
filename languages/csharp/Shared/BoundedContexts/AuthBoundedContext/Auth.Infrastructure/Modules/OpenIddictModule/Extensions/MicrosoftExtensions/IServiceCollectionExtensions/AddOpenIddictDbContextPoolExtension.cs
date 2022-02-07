

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.Modules.OpenIddictModule.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Modules.OpenIddictModule.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddOpenIddictDbContextPoolExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomOpenIddictDbContextPool(this IServiceCollection services,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddPooledDbContextFactory<AuthDbContext>(optionsAction: options =>
            {
                options.BuildCustomDbContextOptions(configuration, env, migrationsAssembly);

                options.BuildCustomDbContextOptionsForOpenIddict();
            });

            return services;
        }
    }
}