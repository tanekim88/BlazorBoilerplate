

using Core.Application.Services.__Entities_Groups_00_Name__ApplicationServices;
using Core.Domain.Services.__Entities_Groups_00_Name__Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SharedCore.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using System;
using System.Reflection;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddServerExtensions
    {
        public static IServiceCollection AddCustomServer(
            this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddGrpc();
            services.AddGrpcReflection();

            services.AddHttpContextAccessor();
            services.AddHttpClient();
            services.AddDatabaseDeveloperPageExceptionFilter();
            // Configure Identity to use the same JWT claims as OpenIddict instead
            // of the legacy WS-Federation claims it uses by default (ClaimTypes),
            // which saves you from doing the mapping in your authorization controller.

            services.AddCustomServices(new Assembly[] { 
                typeof(__Entities_Name__DomainService_Gen_).Assembly,
                typeof(__Entities_Name__ApplicationService_Gen_).Assembly,
            });
            //////////////////////////////////////////////////////////////////////////////////

            services.AddCustomControllersWithViews();
            services.AddCustomCors();
            //services.AddCustomDbContextPool(configuration);
            //services.AddCustomDbContext(configuration);
            services.AddCustomGraphQLServer();

            //services.AddCustomIdentityServerAuthentication(configuration);


            services.AddCustomLocalization();
            //services.AddCustomOpenIddictAuthentication(configuration);

            services.AddCustomRazorPages();
            services.AddCustomSignalR();
            services.AddCustomSwaggerGen();
            services.ConfigureCustomApplicationCookie();
            services.ConfigureCustomIdentityOptions();
            services.ConfigureCustomIISOptions();
            services.ConfigureCustomIIServerOptions();
            services.ConfigureCustomMvcOptions(configuration: configuration);

            var projName = Assembly.GetExecutingAssembly().GetName().Name;
            services.ConfigureCustomSerilog(env: environment, logFileName: projName);
            services.ConfigureCustomTwilio(configuration: configuration);

            //var interfaceAssembly = typeof(I__Entities_Name__Repository_Gen_).Assembly;
            //var implementationAssembly = typeof(__Entities_Name__Repository_Gen_<ApplicationDbContext>).Assembly;
            //services.AddCustomEfRepositories<ApplicationDbContext>(interfaceAssembly, implementationAssembly);


            return services;
        }
    }
}