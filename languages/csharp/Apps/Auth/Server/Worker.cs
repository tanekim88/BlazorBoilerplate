

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.OpenIdDict;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenIddict.Abstractions;
using OpenIddict.Core;
using System;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;
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

            await RegisterApplicationsAsync(scope.ServiceProvider);
            await RegisterScopesAsync(scope.ServiceProvider);
        }

        private async Task RegisterApplicationsAsync(IServiceProvider serviceProvider)
        {
            //var manager = serviceProvider.GetRequiredService<IOpenIddictApplicationManager>();
            var manager = serviceProvider.GetRequiredService<OpenIddictApplicationManager<CustomOpenIddictApplication>>();

            // Angular UI client
            if (await manager.FindByClientIdAsync("angular-app-code") is null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "angular-app-code",
                    ConsentType = ConsentTypes.Explicit,
                    DisplayName = "angular app PKCE",
                    DisplayNames =
                        {
                            [CultureInfo.GetCultureInfo("fr-FR")] = "Applicaion clients"
                        },
                    PostLogoutRedirectUris =
                        {
                            new Uri("https://localhost:4200")
                        },
                    RedirectUris =
                        {
                            new Uri("https://localhost:4200")
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
                            Permissions.Prefixes.Scope + "blazorServer"
                        },
                    Requirements =
                        {
                            Requirements.Features.ProofKeyForCodeExchange
                        }
                });
            }

            // API
            if (await manager.FindByClientIdAsync("rs_blazorServerApi") == null)
            {
                var descriptor = new OpenIddictApplicationDescriptor
                {
                    ClientId = "rs_blazorServerApi",
                    ClientSecret = "blazorServerSecret",
                    Permissions =
                        {
                            Permissions.Endpoints.Introspection
                        }
                };

                await manager.CreateAsync(descriptor);
            }

            // Blazor Hosted
            if (await manager.FindByClientIdAsync("blazor-app-code") is null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "blazor-app-code",
                    ConsentType = ConsentTypes.Explicit,
                    DisplayName = "Blazor code PKCE",
                    DisplayNames =
                        {
                            [CultureInfo.GetCultureInfo("fr-FR")] = "Application cliente MVC"
                        },
                    PostLogoutRedirectUris =
                        {
                            new Uri("https://localhost:5001/signout-callback-oidc")
                        },
                    RedirectUris =
                        {
                            new Uri("https://localhost:5001/signin-oidc")
                        },
                    ClientSecret = "secret",
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
                            Permissions.Prefixes.Scope + "blazorServer"
                        },
                    Requirements =
                        {
                            Requirements.Features.ProofKeyForCodeExchange
                        }
                });
            }
        }

        private async Task RegisterScopesAsync(IServiceProvider serviceProvider)
        {
            var manager = serviceProvider.GetRequiredService<IOpenIddictScopeManager>();
            if (await manager.FindByNameAsync("blazorServer") is null)
            {
                await manager.CreateAsync(new OpenIddictScopeDescriptor
                {
                    DisplayName = "blazorServer API access",
                    DisplayNames =
                        {
                            [CultureInfo.GetCultureInfo("fr-FR")] = "Accès à l'API de démo"
                        },
                    Name = "blazorServer",
                    Resources =
                        {
                            "rs_blazorServerApi"
                        }
                });
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}