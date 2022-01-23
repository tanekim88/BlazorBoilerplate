using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

namespace SharedAuth.Infrastructure.Auth.RemoteAuthenticationStates
{
    public class CustomRemoteAuthenticationState : RemoteAuthenticationState
    {
        public string Id { get; set; }
    }
}
