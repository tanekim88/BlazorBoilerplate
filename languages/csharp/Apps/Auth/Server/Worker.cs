

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
                            new Uri("http://localhost:4200/signout-callback-oidc"),
                            new Uri("https://localhost:4200/signout-callback-oidc"),
                        },
                    RedirectUris =
                        {
                            new Uri("http://localhost:4200/signin-oidc"),
                            new Uri("https://localhost:4200/signin-oidc"),
                        },
                    Permissions =
                        {
                            Permissions.Endpoints.Authorization,
                            Permissions.Endpoints.Logout,
                            Permissions.Endpoints.Token,
                            Permissions.Endpoints.Revocation,
                            Permissions.Endpoints.Introspection,
                            Permissions.GrantTypes.AuthorizationCode,
                            Permissions.GrantTypes.RefreshToken,
                            Permissions.ResponseTypes.Code,
                            Permissions.Scopes.Email,
                            Permissions.Scopes.Profile,
                            Permissions.Scopes.Roles,
                            Permissions.Scopes.Phone,
                            Permissions.Scopes.Address,
                            Permissions.Prefixes.Scope + "angular-app-server-code",

                        },
                    Requirements =
                        {
                            Requirements.Features.ProofKeyForCodeExchange
                        },

                });
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
                            new Uri("https://localhost:3001/signout-callback-oidc"),
                            new Uri("https://localhost:4001/signout-callback-oidc"),
                            new Uri("https://localhost:5001/signout-callback-oidc"),
                        },
                    RedirectUris =
                        {
                            new Uri("https://localhost:3001/signin-oidc"),
                            new Uri("https://localhost:4001/signin-oidc"),
                            new Uri("https://localhost:5001/signin-oidc"),
                        },
                    ClientSecret = "secret",
                    Permissions =
                        {
                            Permissions.Endpoints.Authorization,
                            Permissions.Endpoints.Logout,
                            Permissions.Endpoints.Token,
                            Permissions.Endpoints.Revocation,
                            Permissions.Endpoints.Introspection,
                            Permissions.GrantTypes.AuthorizationCode,
                            Permissions.GrantTypes.RefreshToken,
                            Permissions.ResponseTypes.Code,
                            Permissions.Scopes.Email,
                            Permissions.Scopes.Profile,
                            Permissions.Scopes.Roles,
                            Permissions.Scopes.Phone,
                            Permissions.Scopes.Address,
                            Permissions.Prefixes.Scope + "blazor-app-code"
                        },
                    Requirements =
                        {
                            Requirements.Features.ProofKeyForCodeExchange
                        }
                });
            }


            // Blazor Hosted
            if (await manager.FindByClientIdAsync("auth-code") is null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "auth-code",
                    ConsentType = ConsentTypes.Explicit,
                    DisplayName = "Auth code PKCE",
                    DisplayNames =
                        {
                            [CultureInfo.GetCultureInfo("fr-FR")] = "Application cliente MVC"
                        },
                    PostLogoutRedirectUris =
                        {
                            new Uri("https://localhost:5001/signout-callback-oidc"),
                        },
                    RedirectUris =
                        {
                            new Uri("https://localhost:5001/signin-oidc"),
                        },
                    ClientSecret = "secret",
                    Permissions =
                        {
                            Permissions.Endpoints.Authorization,
                            Permissions.Endpoints.Logout,
                            Permissions.Endpoints.Token,
                            Permissions.Endpoints.Revocation,
                            Permissions.GrantTypes.AuthorizationCode,
                            Permissions.GrantTypes.RefreshToken,
                            Permissions.ResponseTypes.Code,
                            Permissions.Scopes.Email,
                            Permissions.Scopes.Profile,
                            Permissions.Scopes.Roles,
                            Permissions.Scopes.Phone,
                            Permissions.Scopes.Address,
                            Permissions.Prefixes.Scope + "auth-code"
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
            if (await manager.FindByNameAsync("blazor-app-code") is null)
            {
                await manager.CreateAsync(new OpenIddictScopeDescriptor
                {
                    DisplayName = "blazorServer API access",
                    DisplayNames =
                        {
                            [CultureInfo.GetCultureInfo("fr-FR")] = "Accès à l'API de démo"
                        },
                    Name = "blazor-app-code",
                    Resources =
                        {
                            "blazor-app-code"
                        }
                });
            }


            if (await manager.FindByNameAsync("auth-code") is null)
            {
                await manager.CreateAsync(new OpenIddictScopeDescriptor
                {
                    DisplayName = "Auth API access",
                    DisplayNames =
                        {
                            [CultureInfo.GetCultureInfo("fr-FR")] = "Accès à l'API de démo"
                        },
                    Name = "auth-code",
                    Resources =
                        {
                            "auth-code"
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