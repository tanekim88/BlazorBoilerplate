using Core.Infrastructure;
using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Email.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Email.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddEmailDbContextsExtension
    {
        private static readonly string migrationsAssembly = typeof(EmailDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomEmailDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EmailDbContext>(optionsAction: options =>
                options.BuildCustomDbContextOptions(configuration, migrationsAssembly));
            return services;
        }
    }
}