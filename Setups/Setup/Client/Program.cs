

using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;



namespace Setup.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args: args);
            builder.RootComponents.Add<App>(selector: "#app");

            builder.Services.AddScoped(
                implementationFactory: sp => new HttpClient
                    {BaseAddress = new Uri(uriString: builder.HostEnvironment.BaseAddress)});

            await builder.Build().RunAsync();
        }
    }
}