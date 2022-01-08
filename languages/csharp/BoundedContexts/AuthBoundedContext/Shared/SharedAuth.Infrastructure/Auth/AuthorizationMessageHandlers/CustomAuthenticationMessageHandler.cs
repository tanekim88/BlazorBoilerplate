using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

namespace SharedAuth.Infrastructure.Auth.AuthorizationMessageHandlers
{
    public class CustomAuthenticationMessageHandler : AuthorizationMessageHandler
    {
        public CustomAuthenticationMessageHandler(IAccessTokenProvider provider, NavigationManager navigation) 
            : base(provider, navigation)
        {

        }
    }
}
