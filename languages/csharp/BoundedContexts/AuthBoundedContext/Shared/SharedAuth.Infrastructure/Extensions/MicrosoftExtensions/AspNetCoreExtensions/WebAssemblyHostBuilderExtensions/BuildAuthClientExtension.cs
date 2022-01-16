using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using SharedAuth.Infrastructure.Auth.AccountClaimsPrincipalFactories;
using SharedAuth.Infrastructure.Service;
using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace SharedAuth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.WebAssemblyHostBuilderExtensions
{
    public static class BuildAuthClientExtension
    {
        public static WebAssemblyHostBuilder BuildAuthClient(this WebAssemblyHostBuilder builder)
        {

            var services = builder.Services;
            services.AddAuthorizationCore();


            services.AddScoped<AuthenticationStateProvider, HostAuthenticationStateProvider>();
            services.TryAddScoped(sp => (HostAuthenticationStateProvider)sp.GetRequiredService<AuthenticationStateProvider>());
            services.AddHttpClient("default", client =>
            {
                client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            });

            services.AddHttpClient("authorizedClient", client =>
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }).AddHttpMessageHandler<AuthorizedHandler>();
            services.AddTransient(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("default"));


            //builder.services.AddApiAuthorization();
            //In order to authenticate to IS4:
            //services.AddOidcAuthentication(options =>
            //{
            //    builder.Configuration.Bind("Oidc", options.ProviderOptions);
            //    // Note: response_mode=fragment is the best option for a SPA. Unfortunately, the BlazorWeb WASM
            //    // authentication stack is impacted by a bug that prevents it from correctly extracting
            //    // authorization error responses (e.g error=access_denied responses) from the URL fragment.
            //    // For more information about this bug, visit https://github.com/dotnet/aspnetcore/issues/28344.
            //    //
            //    options.ProviderOptions.ResponseMode = "query";
            //    //options.ProviderOptions.DefaultScopes.Add("email");
            //    // options.AuthenticationPaths.RemoteRegisterPath = "https://localhost:5001/Identity/Account/Register";
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


            //}).AddAccountClaimsPrincipalFactory<CustomUserFactory>();

    
            return builder;
        }
    }
}
