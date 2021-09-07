

using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;



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
            //using var scope = _serviceProvider.CreateScope();

            //var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            //await context.Database.EnsureCreatedAsync();

            //var manager = scope.ServiceProvider.GetRequiredService<OpenIddictApplicationManager<CustomOpenIdApplication>>();

            //if (await manager.FindByClientIdAsync("code") is null)
            //{
            //    await manager.CreateAsync(new OpenIddictApplicationDescriptor
            //    {
            //        ClientId = "code",
            //        ConsentType = ConsentTypes.Explicit,
            //        DisplayName = "BlazorWeb client application",
            //        Type = ClientTypes.Public,
            //        PostLogoutRedirectUris =
            //        {
            //            new Uri("https://localhost:5001/authentication/logout-callback"),
            //            new Uri("https://localhost:4001/authentication/logout-callback"),
            //        },
            //        RedirectUris =
            //        {
            //            new Uri("https://localhost:5001/authentication/login-callback"),
            //            new Uri("https://localhost:4001/authentication/login-callback"),
            //        },
            //        Permissions =
            //        {
            //            Permissions.Endpoints.Authorization,
            //            Permissions.Endpoints.Logout,
            //            Permissions.Endpoints.Token,
            //            Permissions.GrantTypes.AuthorizationCode,
            //            Permissions.GrantTypes.RefreshToken,
            //            Permissions.ResponseTypes.Code,
            //            Permissions.Scopes.Email,
            //            Permissions.Scopes.Profile,
            //            Permissions.Scopes.Roles
            //        },
            //        Requirements =
            //        {
            //            Requirements.Features.ProofKeyForCodeExchange
            //        }
            //    });
            //}
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}