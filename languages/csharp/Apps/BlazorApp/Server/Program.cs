using Auth.Infrastructure.Exts.MicrosoftExts.AspNetCoreExts.BuilderExts.WebApplicationExts;
using Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts;
using Core.Infrastructure.Exts.MicrosoftExts.IConfigurationBuilderExts;
using Core.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts;
using Serilog;

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
builder.Services.AddCustomBff(configuration: builder.Configuration, environment: builder.Environment);

var app = builder.Build();

//app.UseCustomServerExtensions(configuration: builder.Configuration, builder.Environment);
app.UseCustomBff(builder.Configuration,builder.Environment);
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

