using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using System.Text.Json.Serialization;

namespace SharedAuth.Infrastructure.Auth.RemoteUserAccounts
{
    public class CustomRemoteUserAccount: RemoteUserAccount
    {
        [JsonPropertyName("amr")]
        public string[] AuthenticationMethod { get; set; }
    }
}
