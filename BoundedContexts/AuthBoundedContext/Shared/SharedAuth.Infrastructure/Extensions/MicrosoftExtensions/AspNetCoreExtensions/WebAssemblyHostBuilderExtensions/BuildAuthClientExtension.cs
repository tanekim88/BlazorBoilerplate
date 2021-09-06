using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SharedAuth.Infrastructure.Auth.AccountClaimsPrincipalFactories;

namespace SharedAuth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.WebAssemblyHostBuilderExtensions
{
    public static class BuildAuthClientExtension
    {
        public static WebAssemblyHostBuilder BuildAuthClient(this WebAssemblyHostBuilder builder)
        {

            var services = builder.Services;
;

            //builder.services.AddApiAuthorization();
            //In order to authenticate to IS4:
            services.AddOidcAuthentication(options =>
            {

                builder.Configuration.Bind("Oidc", options.ProviderOptions);
                // Note: response_mode=fragment is the best option for a SPA. Unfortunately, the Solid WASM
                // authentication stack is impacted by a bug that prevents it from correctly extracting
                // authorization error responses (e.g error=access_denied responses) from the URL fragment.
                // For more information about this bug, visit https://github.com/dotnet/aspnetcore/issues/28344.
                //
                options.ProviderOptions.ResponseMode = "query";

                // options.AuthenticationPaths.RemoteRegisterPath = "https://localhost:5001/Identity/Account/Register";
                options.AuthenticationPaths.RemoteRegisterPath = "Account/Register";
                options.AuthenticationPaths.RemoteProfilePath = "Account/Manage";

                //options.AuthenticationPaths.LogInPath = "authorization/login";
                //options.AuthenticationPaths.LogInCallbackPath = "authorization/login-callback";
                //options.AuthenticationPaths.LogInFailedPath = "authorization/login-failed";
                //options.AuthenticationPaths.LogOutPath = "authorization/logout";
                //options.AuthenticationPaths.LogOutCallbackPath = "authorization/logout-callback";
                //options.AuthenticationPaths.LogOutFailedPath = "authorization/logout-failed";
                //options.AuthenticationPaths.LogOutSucceededPath = "authorization/logged-out";
                //options.AuthenticationPaths.ProfilePath = "authorization/profile";
                //options.AuthenticationPaths.RegisterPath = "authorization/register";


            }).AddAccountClaimsPrincipalFactory<CustomUserFactory>();

            services.AddAuthorizationCore();

            return builder;
        }
    }
}
