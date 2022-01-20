using Core.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts;
using Email.Infrastructure.DbContexts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Email.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddEmailDbContextPoolsExtension
    {
        private static readonly string migrationsAssembly = typeof(EmailDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomEmailDbContextPool(this IServiceCollection services, 
            IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddPooledDbContextFactory<EmailDbContext>(optionsAction: options =>
               options.BuildCustomDbContextOptions(configuration, env, migrationsAssembly));
            return services;
        }
    }
}