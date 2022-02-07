

using Auth.Domain.Interfaces.RepositoryInterfaces.__Entities_Groups_00_Name__RepositoryInterfaces;
using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.Repositories.__Entities_Groups_00_Name__Repositories;
using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Core.Infrastructure.Impls.IdentityImpls.AspNetCoreImpls.IdentityImpls.UIImpls.ServicesImpls.IEmailSenderImpls;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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
            //services.AddCustomAuthentication(configuration: configuration);


            // OpenIdDict
            //services.AddCustomOpenIddictDbContextPool(configuration: configuration);
            //services.AddCustomOpenIddictDbContext(configuration: configuration);
            //services.AddCustomOpenIddict();

            // IdentityServer
            services.AddCustomAuthDbContextPool(configuration, environment);
            services.AddCustomAuthDbContext(configuration, environment);
            services.AddCustomIdentityServer(configuration, environment);


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

            services.AddTransient<IEmailSender, CustomEmailSender>();

            return services;
        }
    }
}