using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Email.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddEmailServerExtensions
    {
        public static IServiceCollection AddCustomEmailServer(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            return services;
        }
    }
}