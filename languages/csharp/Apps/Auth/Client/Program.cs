

using Auth.Client;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using SharedAuth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.WebAssemblyHostBuilderExtensions;
using SharedCore.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.WebAssemblyHostBuilderExtensions;
using System;
using System.Net.Http;



var builder = WebAssemblyHostBuilder.CreateDefault(args: args);
builder.RootComponents.Add<App>(selector: "#app");

builder.Services.AddHttpClient(name: "Auth.ServerAPI",
        configureClient: client =>
            client.BaseAddress = new Uri(uriString: builder.HostEnvironment.BaseAddress))
    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

// Supply HttpClient instances that include access tokens when making requests to the server project
builder.Services.AddScoped(implementationFactory: sp =>
    sp.GetRequiredService<IHttpClientFactory>().CreateClient(name: "Auth.ServerAPI"));

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
