

using Auth.Domain.Interfaces.RepositoryInterfaces.__Entities_Groups_00_Name__RepositoryInterfaces;
using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.Repositories.__Entities_Groups_00_Name__Repositories;
using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddAuthServerExtensions
    {
        public static IServiceCollection AddCustomAuthServer(
            this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddCustomControllersWithViews();
            services.AddCustomCors();

            services.AddCustomGraphQLServer();
            services.AddCustomIdentity();
            //services.AddCustomIdentityServerAuthentication(configuration);


            var interfaceAssembly = typeof(I__Entities_Name__Repository_AuthGen_).Assembly;
            var implementationAssembly = typeof(__Entities_Name__Repository_AuthGen_<AuthDbContext>).Assembly;
            services.AddCustomEfRepositories<AuthDbContext>(interfaceAssembly, implementationAssembly);
            services.AddCustomStores();

            services.AddCustomLocalization();
            services.AddCustomAuthentication(configuration: configuration);


            // OpenIdDict
            //services.AddCustomOpenIddictDbContextPool(configuration: configuration);
            //services.AddCustomOpenIddictDbContext(configuration: configuration);
            //services.AddCustomOpenIddict();

            // IdentityServer
            services.AddCustomAuthDbContextPool(configuration);
            services.AddCustomAuthDbContext(configuration);
            services.AddCustomIdentityServerAuthentication(configuration);


            services.AddCustomRazorPages();
            services.AddCustomSignalR();
            services.ConfigureCustomApplicationCookie();
            services.ConfigureCustomIdentityOptions();
            services.ConfigureCustomIISOptions();
            services.ConfigureCustomIIServerOptions();
            services.ConfigureCustomMvcOptions(configuration: configuration);

            var projName = Assembly.GetExecutingAssembly().GetName().Name;
            services.ConfigureCustomSerilog(env: environment, logFileName: projName);
            services.ConfigureCustomTwilio(configuration: configuration);

            return services;
        }
    }
}