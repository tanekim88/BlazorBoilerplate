

using System;
using System.Globalization;
using System.Threading;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Exceptions;
using Serilog.Sinks.SystemConsole.Themes;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class ConfigureSerilogExtension
    {
        public static IServiceCollection ConfigureCustomSerilog(this IServiceCollection services,
            IWebHostEnvironment env, string logFileName)
        {
            LoggingLevelSwitch levelSwitch = new();

            levelSwitch.MinimumLevel = LogEventLevel.Information;
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                //  .ReadFrom.AppSettings()
                .MinimumLevel.ControlledBy(levelSwitch: levelSwitch)
                .MinimumLevel.Override(source: "Microsoft", minimumLevel: LogEventLevel.Warning)
                .MinimumLevel.Override(source: "System", minimumLevel: LogEventLevel.Error)
                .MinimumLevel.Override(source: "Microsoft.AspNetCore.Authentication", minimumLevel: LogEventLevel.Error)
                .Enrich.With(new CustomEnricher())
                .Enrich.WithThreadId()
                .Enrich.WithMachineName()
                .Enrich.WithEnvironmentUserName()
                .Enrich.FromLogContext()
                .Enrich.WithProcessId()
                .Enrich.WithExceptionDetails()
                .Enrich.WithProperty(name: "Version", value: "1.0.0")
                //.Filter.ByExcluding(Matching.WithProperty<int>("Count", p=>p <10))
                //.WriteTo.Logger(lc => lc.Filter.ByIncludingOnly(Matching.WithProperty<int>("count", p=>p>1 )).WriteTo.File("a.txt"))
                //.WriteTo.Providers(Providers)
                // .Destructure.ByTransforming<HttpRequest>(
                //r => new { RawUrl = r.Path, Method = r.Method })
                // .WriteTo.Console(formatProvider: new CultureInfo("en-AU")) //Console1
                // .WriteTo.Console(formatProvider: new CustomDateFormatter("dd-MMM-yyyy", new CultureInfo("en-AU")))  //Console2
                .WriteTo.File(
                    path: $@"{env.ContentRootPath}\Logs\{logFileName}.txt",
                    fileSizeLimitBytes: 1_000_000,
                    rollOnFileSizeLimit: true,
                    shared: true,
                    flushToDiskInterval: TimeSpan.FromSeconds(value: 1),
                    rollingInterval: RollingInterval.Day,
                    outputTemplate:
                    "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}{NewLine}{Properties:j}"
                )
                //  .WriteTo.Console(
                //     new RenderedCompactJsonFormatter(),
                //          restrictedToMinimumLevel: LogEventLevel.Debug
                //  )
                .WriteTo.Console(
                    theme: AnsiConsoleTheme.Literate, applyThemeToRedirectedOutput: true
                    // new JsonFormatter(),
                    //      restrictedToMinimumLevel: LogEventLevel.Debug
                )
                .WriteTo.Seq(serverUrl: "http://localhost:5341")
                .CreateLogger();

            return services;
        }
    }

    internal class CustomEnricher : ILogEventEnricher
    {
        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
        {
            logEvent.AddPropertyIfAbsent(property: propertyFactory.CreateProperty(
                name: "CustomId", value: Thread.CurrentThread.ManagedThreadId));
        }
    }

    internal class CustomDateFormatter : IFormatProvider
    {
        private readonly IFormatProvider basedOn;
        private readonly string shortDatePattern;

        public CustomDateFormatter(string shortDatePattern, IFormatProvider basedOn)
        {
            this.shortDatePattern = shortDatePattern;
            this.basedOn = basedOn;
        }

        public object GetFormat(Type formatType)
        {
            if (formatType == typeof(DateTimeFormatInfo))
            {
                var basedOnFormatInfo = (DateTimeFormatInfo) basedOn.GetFormat(formatType: formatType);
                var dateFormatInfo = (DateTimeFormatInfo) basedOnFormatInfo.Clone();
                dateFormatInfo.ShortDatePattern = shortDatePattern;
                return dateFormatInfo;
            }

            return basedOn.GetFormat(formatType: formatType);
        }
    }
}