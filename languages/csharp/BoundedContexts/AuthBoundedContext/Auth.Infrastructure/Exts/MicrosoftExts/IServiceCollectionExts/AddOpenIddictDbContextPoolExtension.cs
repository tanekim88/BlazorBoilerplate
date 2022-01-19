

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Auth.Infrastructure.OpenIdDict;
using Core.Infrastructure;
using Core.Infrastructure.Exts.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
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