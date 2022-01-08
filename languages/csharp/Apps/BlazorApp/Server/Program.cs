using Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Core.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.IApplicationBuilderExtensions;
using Core.Infrastructure.Extensions.MicrosoftExtensions.IConfigurationBuilderExtensions;
using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System;

var builder = WebApplication.CreateBuilder(args);
builder.Host.ConfigureAppConfiguration(configureDelegate: (hostingContext, config) =>
{
    var env = hostingContext.HostingEnvironment;

    config.AddServerAppSettings(env);
})
//   .UseUrls("https://localhost:4001", "http://localhost:4000")
.UseSerilog();

AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

builder.Services.AddCustomServer(configuration:builder. Configuration, environment: builder.Environment);
builder.Services.AddCustomClientAuthServer(configuration: builder.Configuration, environment: builder.Environment);

var app = builder.Build();

app.UseCustomServerExtensions(configuration: builder.Configuration, builder.Environment);

using (var scope = app.Services.CreateScope())
{
    try
    {
        Log.Information(messageTemplate: "Starting web host");
        app.Run();
    }
    catch (Exception ex)
    {
        Log.Fatal(exception: ex, messageTemplate: "Host terminated unexpectedly");
    }
    finally
    {
        Log.CloseAndFlush();
    }
}

