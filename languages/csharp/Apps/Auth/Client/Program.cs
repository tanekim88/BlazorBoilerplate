

using Auth.Client;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using SharedAuth.Infrastructure.Exts.MicrosoftExts.AspNetCoreExts.BuilderExts.WebApplicationExts;
using SharedCore.Infrastructure.Exts.MicrosoftExts.AspNetCoreExts.BuilderExts.WebApplicationExts;

var builder = WebAssemblyHostBuilder.CreateDefault(args: args);
builder.RootComponents.Add<App>(selector: "#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

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




//await builder.Build().RunAsync();
