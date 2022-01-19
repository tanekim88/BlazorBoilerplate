using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.IdentityServer;
using Auth.Infrastructure.IdentityServer.CustomTokenRequestValidators;
using Auth.Infrastructure.IdentityServer.DefaultScopeParsers;
using Auth.Infrastructure.IdentityServer.ProfileServices;
using Auth.Infrastructure.IdentityServer.UserClaimsPrincipalFactories;
using Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions;
using Duende.IdentityServer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using SharedAuth.Application.Models.EntityModels;
using System;

namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddIdentityServerExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;
        public static IServiceCollection AddCustomIdentityServer(this IServiceCollection services,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            //JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddScoped<IUserClaimsPrincipalFactory<UserModel>, CustomUserClaimsPrincipalFactory>();

            var builder = services.AddIdentityServer(options => {
                //options.Authentication.CookieLifetime = TimeSpan.FromHours(1);
                //options.Authentication.CookieSlidingExpiration = false;
                //options.Authentication.CookieAuthenticationScheme = "your_cookie";
                options.Events.RaiseSuccessEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseErrorEvents = true;
            })
                .AddAspNetIdentity<UserModel>()
                .AddScopeParser<CustomDefaultScopeParser>()
                .AddCustomTokenRequestValidator<CustomTokenRequestValidator>()
                .AddProfileService<CustomProfileService>()
                ;

            if (env.IsDevelopment())
            {
                builder
                .AddDeveloperSigningCredential()
                .AddTestUsers(TestUsers.Users)
                .AddInMemoryClients(Config.Clients)
                .AddInMemoryIdentityResources(Config.IdentityResources)
                .AddInMemoryApiScopes(Config.ApiScopes);
            }
            else
            {
                builder.AddConfigurationStore(options =>
                {

                    options.ConfigureDbContext = b => b.BuildCustomDbContextOptions(configuration, migrationsAssembly);
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = b => b.BuildCustomDbContextOptions(configuration, migrationsAssembly);

                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 3600; // interval in seconds (default is 3600)
                });
            }

            return services;
        }
    }
}