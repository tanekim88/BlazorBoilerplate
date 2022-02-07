using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Email.Infrastructure.DbContexts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Email.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddEmailDbContextsExtension
    {
        private static readonly string migrationsAssembly = typeof(EmailDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomEmailDbContext(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddDbContext<EmailDbContext>(optionsAction: options =>
                options.BuildCustomDbContextOptions(configuration, env, migrationsAssembly));
            return services;
        }
    }
}