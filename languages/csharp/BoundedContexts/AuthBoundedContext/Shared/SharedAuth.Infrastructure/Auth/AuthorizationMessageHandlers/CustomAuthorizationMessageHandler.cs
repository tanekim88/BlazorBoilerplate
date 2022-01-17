using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

namespace SharedAuth.Infrastructure.Auth.AuthorizationMessageHandlers
{
    public class CustomAuthorizationMessageHandler : AuthorizationMessageHandler
    {
        public CustomAuthorizationMessageHandler(IAccessTokenProvider provider, NavigationManager navigation)
            : base(provider, navigation)
        {
            ConfigureHandler(
                   authorizedUrls: new[] { "https://localhost:4001" },
                   scopes: new[] { "email" });
        }
    }
}
