

using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class ConfigureApplicationCookieExtension
    {
        public static IServiceCollection ConfigureCustomApplicationCookie(this IServiceCollection services)
        {
            services.ConfigureApplicationCookie(configure: options =>
            {
                options.LoginPath = "/Identity/Account/Login";
                options.LogoutPath = "/Identity/Account/Logout";
                options.AccessDeniedPath = "/Identity/Account/AccessDenied";
                options.SlidingExpiration = true;
            });

            return services;
        }
    }
}