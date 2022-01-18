using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using SharedAuth.Infrastructure.Auth.AccountClaimsPrincipalFactories;
using SharedAuth.Infrastructure.Auth.AuthenticationStateProviders;
using SharedAuth.Infrastructure.Auth.AuthorizationMessageHandlers;
using SharedAuth.Infrastructure.Auth.DelegatingHandlers;
using SharedAuth.Infrastructure.Auth.RemoteAuthenticationStates;
using SharedAuth.Infrastructure.Auth.RemoteUserAccounts;
using SharedAuth.Infrastructure.Service;
using System;
using System.Net.Http;

namespace SharedAuth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.BuilderExtensions.WebApplicationExtensions
{
    public static class BuildAuthClientExtension
    {
        public static WebAssemblyHostBuilder BuildAuthClient(this WebAssemblyHostBuilder builder)
        {

            var services = builder.Services;
            services.AddAuthorizationCore();
            builder.Services.AddScoped<AuthenticationStateProvider, CustomAuthenticationStateProvider>();
            //builder.Services.AddHttpClient(name: "BlazorApp.ServerAPI",
            //        configureClient: client =>
            //            client.BaseAddress = new Uri(uriString: builder.HostEnvironment.BaseAddress))
            //    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

        //    builder.Services.AddScoped<CustomAuthorizationMessageHandler>();
        //    builder.Services.AddHttpClient(name: "BlazorApp.ServerAPI",
        //configureClient: client =>
        //    client.BaseAddress = new Uri(uriString: builder.HostEnvironment.BaseAddress))
        //        .AddHttpMessageHandler<CustomAuthorizationMessageHandler>();

        //    builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("BlazorApp.ServerAPI"));








            // authentication state and authorization
            builder.Services.AddAuthorizationCore();
            builder.Services.AddScoped<AuthenticationStateProvider, CustomBFFAuthenticationStateProvider>();

            // HTTP client configuration
            builder.Services.AddTransient<AntiforgeryHandler>();
            //builder.Services.AddHttpClient("backend", client => client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress))
            builder.Services.AddHttpClient("backend", client => client.BaseAddress = new Uri("https://localhost:5001"))
                .AddHttpMessageHandler<AntiforgeryHandler>();
            builder.Services.AddTransient(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("backend"));








            //////???????????????
            //services.AddScoped<AccountClaimsPrincipalFactory<CustomRemoteUserAccount>, CustomAccountClaimsPrincipalFactory>();
            //services.TryAddScoped(sp => (CustomAccountClaimsPrincipalFactory)sp.GetRequiredService<AccountClaimsPrincipalFactory<CustomRemoteUserAccount>>());

            //services.AddScoped<AuthenticationStateProvider, CustomAuthenticationStateProvider>();
            //services.TryAddScoped(sp => (CustomAuthenticationStateProvider)sp.GetRequiredService<AuthenticationStateProvider>());

            //services.AddScoped<AuthorizationMessageHandler, CustomAuthorizationMessageHandler>();
            //services.TryAddScoped(sp => (CustomAuthorizationMessageHandler)sp.GetRequiredService<AuthorizationMessageHandler>());

            //services.AddScoped<RemoteAuthenticationState, CustomRemoteAuthenticationState>();
            //services.TryAddScoped(sp => (CustomRemoteAuthenticationState)sp.GetRequiredService<RemoteAuthenticationState>());
            //////???????????????





            //services.AddHttpClient("default", client =>
            //{
            //    client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress);
            //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //});

            //services.AddHttpClient("authorizedClient", client =>
            //{
            //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //}).AddHttpMessageHandler<AuthorizedHandler>();
            //services.AddTransient(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("default"));


            builder.Services.AddOidcAuthentication(options =>
            {
                builder.Configuration.Bind("Auth", options.ProviderOptions);
            });

            //builder.services.AddApiAuthorization();
            //In order to authenticate to IS4:
            //services.AddOidcAuthentication<
            //    CustomRemoteAuthenticationState,
            //    CustomRemoteUserAccount>(options =>
            //{
            //    //options.ProviderOptions.ClientId = "blazor-app-code";
            //    //options.ProviderOptions.Authority = "https://localhost:5001/";
            //    //options.ProviderOptions.ResponseType = "code";

            //    builder.Configuration.Bind("Auth", options.ProviderOptions);
            //    // Note: response_mode=fragment is the best option for a SPA. Unfortunately, the BlazorWeb WASM
            //    // authentication stack is impacted by a bug that prevents it from correctly extracting
            //    // authorization error responses (e.g error=access_denied responses) from the URL fragment.
            //    // For more information about this bug, visit https://github.com/dotnet/aspnetcore/issues/28344.
            //    //
            //    options.ProviderOptions.ResponseMode = "query";
            //    options.ProviderOptions.DefaultScopes.Add("email");
            //    options.AuthenticationPaths.RemoteRegisterPath = "https://localhost:5001/Identity/Account/Register";
            //    //options.AuthenticationPaths.RemoteRegisterPath = "Account/Register";
            //    //options.AuthenticationPaths.RemoteProfilePath = "Account/Manage";

            //    //options.AuthenticationPaths.LogInPath = "authorization/login";
            //    //options.AuthenticationPaths.LogInCallbackPath = "authorization/login-callback";
            //    //options.AuthenticationPaths.LogInFailedPath = "authorization/login-failed";
            //    //options.AuthenticationPaths.LogOutPath = "authorization/logout";
            //    //options.AuthenticationPaths.LogOutCallbackPath = "authorization/logout-callback";
            //    //options.AuthenticationPaths.LogOutFailedPath = "authorization/logout-failed";
            //    //options.AuthenticationPaths.LogOutSucceededPath = "authorization/logged-out";
            //    //options.AuthenticationPaths.ProfilePath = "authorization/profile";
            //    //options.AuthenticationPaths.RegisterPath = "authorization/register";


            //    // Add the "roles" (OpenIddictConstants.Scopes.Roles) scope and the "role" (OpenIddictConstants.Claims.Role) claim
            //    // (the same ones used in the Startup class of the Server) in order for the roles to be validated.
            //    // See the Counter component for an example of how to use the Authorize attribute with roles
            //    //options.ProviderOptions.DefaultScopes.Add("roles");
            //    //options.UserOptions.RoleClaim = "role";

            //}).AddAccountClaimsPrincipalFactory<
            //    CustomRemoteAuthenticationState,
            //    CustomRemoteUserAccount,
            //    CustomAccountClaimsPrincipalFactory>();


            return builder;
        }
    }
}
