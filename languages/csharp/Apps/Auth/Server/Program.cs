using Auth.Infrastructure.Exts.MicrosoftExts.AspNetCoreExts.BuilderExts.WebApplicationExts;
using Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts;
using Core.Infrastructure.Exts.MicrosoftExts.IConfigurationBuilderExts;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System;
using Mapster;
TypeAdapterConfig.GlobalSettings.Default.MapToConstructor(true);
var builder = WebApplication.CreateBuilder(args);
builder.Host.ConfigureAppConfiguration(configureDelegate: (hostingContext, config) =>
        {
            var env = hostingContext.HostingEnvironment;

            config.AddServerAppSettings(env);
        })
        //.UseUrls("https://localhost:5001", "http://localhost:5000")
        .UseSerilog();

AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

builder.Services.AddCustomAuthServer(configuration: builder.Configuration, environment: builder.Environment);
//builder.Services.AddHostedService<Worker>();

var app = builder.Build();
app.UseCustomAuthServerExtensions(configuration: builder.Configuration, builder.Environment);

//JsonSerializerOptions options = new JsonSerializerOptions()
//{
//    PropertyNameCaseInsensitive = true,
//    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
//};

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


