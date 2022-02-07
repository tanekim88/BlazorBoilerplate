

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.Modules.OpenIddictModule.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Modules.OpenIddictModule.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddOpenIddictDbContextExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomOpenIddictDbContext(this IServiceCollection services,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddDbContext<AuthDbContext>(optionsAction: options =>
            {
                options.BuildCustomDbContextOptions(configuration, env, migrationsAssembly);

                options.BuildCustomDbContextOptionsForOpenIddict();
            });
            return services;
        }
    }
}