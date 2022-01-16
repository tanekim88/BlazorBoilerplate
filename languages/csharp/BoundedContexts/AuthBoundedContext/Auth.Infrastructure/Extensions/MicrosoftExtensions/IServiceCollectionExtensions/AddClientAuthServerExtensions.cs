

using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using static OpenIddict.Abstractions.OpenIddictConstants;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddClientAuthServerExtensions
    {
        public static IServiceCollection AddCustomClientAuthServer(
            this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.Configure<IdentityOptions>(configureOptions: options =>
            {
                options.ClaimsIdentity.UserNameClaimType = Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = Claims.Role;
            });

            services.AddCustomAntiforgery();
            services.AddCustomIdentity();
            services.AddCustomOpenIddictDbContextPool(configuration: configuration);
            services.AddCustomOpenIddictDbContext(configuration: configuration);
            services.AddCustomOpenIddict();

            return services;
        }
    }
}