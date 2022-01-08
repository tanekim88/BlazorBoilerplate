using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Email.Infrastructure.DbContexts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Email.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddEmailDbContextPoolsExtension
    {
        private static readonly string migrationsAssembly = typeof(EmailDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomEmailDbContextPool(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<EmailDbContext>(optionsAction: options =>
               options.BuildCustomDbContextOptions(configuration, migrationsAssembly));
            return services;
        }
    }
}