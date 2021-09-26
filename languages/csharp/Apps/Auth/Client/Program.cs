

using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args: args);
            builder.RootComponents.Add<App>(selector: "#app");

            builder.Services.AddHttpClient(name: "Auth.ServerAPI",
                    configureClient: client =>
                        client.BaseAddress = new Uri(uriString: builder.HostEnvironment.BaseAddress))
                .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

            // Supply HttpClient instances that include access tokens when making requests to the server project
            builder.Services.AddScoped(implementationFactory: sp =>
                sp.GetRequiredService<IHttpClientFactory>().CreateClient(name: "Auth.ServerAPI"));

            builder.Services.AddApiAuthorization();

            await builder.Build().RunAsync();
        }
    }
}