

using System;
using System.Threading;
using System.Threading.Tasks;
using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.OpenIdDict;
using Core.Infrastructure.DbContexts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenIddict.Abstractions;
using OpenIddict.Core;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Auth.Server
{
    public class Worker : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public Worker(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<AuthDbContext>();
            await context.Database.EnsureCreatedAsync();

            var manager = scope.ServiceProvider.GetRequiredService<OpenIddictApplicationManager<CustomOpenIdApplication>>();

            if (await manager.FindByClientIdAsync("code") is null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "code",
                    ConsentType = ConsentTypes.Explicit,
                    DisplayName = "BlazorWeb client application",
                    Type = ClientTypes.Public,
                    PostLogoutRedirectUris =
                    {
                        new Uri("https://localhost:5001/authentication/logout-callback"),
                        new Uri("https://localhost:4001/authentication/logout-callback"),
                        new Uri("https://localhost:3001/authentication/logout-callback"),
                    },
                    RedirectUris =
                    {
                        new Uri("https://localhost:5001/authentication/login-callback"),
                        new Uri("https://localhost:4001/authentication/login-callback"),
                        new Uri("https://localhost:3001/authentication/login-callback"),
                    },
                    Permissions =
                    {
                        Permissions.Endpoints.Authorization,
                        Permissions.Endpoints.Logout,
                        Permissions.Endpoints.Token,
                        Permissions.GrantTypes.AuthorizationCode,
                        Permissions.GrantTypes.RefreshToken,
                        Permissions.ResponseTypes.Code,
                        Permissions.Scopes.Email,
                        Permissions.Scopes.Profile,
                        Permissions.Scopes.Roles,
                        Permissions.Scopes.Phone,
                        Permissions.Scopes.Address,
                    },
                    Requirements =
                    {
                        Requirements.Features.ProofKeyForCodeExchange
                    },
                    ClientSecret = "secret",
                    
                });
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}