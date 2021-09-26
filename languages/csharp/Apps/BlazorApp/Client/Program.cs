

using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using SharedAuth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.WebAssemblyHostBuilderExtensions;
using SharedCore.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.WebAssemblyHostBuilderExtensions;
using System.Threading.Tasks;

namespace BlazorApp.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args: args);
            builder.RootComponents.Add<App>("#app");
            builder.BuildClient();
            builder.BuildAuthClient();


            //builder.RootComponents.Add<App>(selector: "#app");

            //builder.Services.AddHttpClient(name: "BlazorApp.ServerAPI",
            //        configureClient: client =>
            //            client.BaseAddress = new Uri(uriString: builder.HostEnvironment.BaseAddress))
            //    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

            //// Supply HttpClient instances that include access tokens when making requests to the server project
            //builder.Services.AddScoped(implementationFactory: sp =>
            //    sp.GetRequiredService<IHttpClientFactory>().CreateClient(name: "BlazorApp.ServerAPI"));

            //builder.Services.AddApiAuthorization();

            await builder.Build().RunAsync();
        }
    }
}