

using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;



namespace Core.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddLocalizationExtension
    {
        public static IServiceCollection AddCustomLocalization(this IServiceCollection services)
        {
            services.AddLocalization(setupAction: options => { options.ResourcesPath = "Localizations/Resources"; });
            services.AddScoped<RequestLocalizationCookiesMiddleware>();
            // services.AddPortableObjectLocalization();
            services.Configure<RequestLocalizationOptions>(configureOptions: options =>
            {
                var supportedCultures = new[]
                {
                    new CultureInfo(name: "af"),
                    new CultureInfo(name: "sq"),
                    new CultureInfo(name: "ar"),
                    new CultureInfo(name: "hy"),
                    new CultureInfo(name: "az"),
                    new CultureInfo(name: "eu"),
                    new CultureInfo(name: "be"),
                    new CultureInfo(name: "bn"),
                    new CultureInfo(name: "bg"),
                    new CultureInfo(name: "ca"),
                    new CultureInfo(name: "zh-CN"),
                    new CultureInfo(name: "zh-TW"),
                    new CultureInfo(name: "hr"),
                    new CultureInfo(name: "cs"),
                    new CultureInfo(name: "da"),
                    new CultureInfo(name: "nl"),
                    new CultureInfo(name: "en"),
                    new CultureInfo(name: "eo"),
                    new CultureInfo(name: "et"),
                    new CultureInfo(name: "tl"),
                    new CultureInfo(name: "fi"),
                    new CultureInfo(name: "fr"),
                    new CultureInfo(name: "gl"),
                    new CultureInfo(name: "ka"),
                    new CultureInfo(name: "de"),
                    new CultureInfo(name: "el"),
                    new CultureInfo(name: "gu"),
                    new CultureInfo(name: "ht"),
                    new CultureInfo(name: "iw"),
                    new CultureInfo(name: "hi"),
                    new CultureInfo(name: "hu"),
                    new CultureInfo(name: "is"),
                    new CultureInfo(name: "id"),
                    new CultureInfo(name: "ga"),
                    new CultureInfo(name: "it"),
                    new CultureInfo(name: "ja"),
                    new CultureInfo(name: "kn"),
                    new CultureInfo(name: "km"),
                    new CultureInfo(name: "ko"),
                    new CultureInfo(name: "lo"),
                    new CultureInfo(name: "la"),
                    new CultureInfo(name: "lv"),
                    new CultureInfo(name: "lt"),
                    new CultureInfo(name: "mk"),
                    new CultureInfo(name: "ms"),
                    new CultureInfo(name: "mt"),
                    new CultureInfo(name: "no"),
                    new CultureInfo(name: "fa"),
                    new CultureInfo(name: "pl"),
                    new CultureInfo(name: "pt"),
                    new CultureInfo(name: "ro"),
                    new CultureInfo(name: "ru"),
                    new CultureInfo(name: "sr"),
                    new CultureInfo(name: "sk"),
                    new CultureInfo(name: "sl"),
                    new CultureInfo(name: "es"),
                    new CultureInfo(name: "sw"),
                    new CultureInfo(name: "sv"),
                    new CultureInfo(name: "ta"),
                    new CultureInfo(name: "te"),
                    new CultureInfo(name: "th"),
                    new CultureInfo(name: "tr"),
                    new CultureInfo(name: "uk"),
                    new CultureInfo(name: "ur"),
                    new CultureInfo(name: "vi"),
                    new CultureInfo(name: "cy"),
                    new CultureInfo(name: "yi")
                };
                options.DefaultRequestCulture = new RequestCulture(culture: "en-US");
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;

                options.ApplyCurrentCultureToResponseHeaders = true;

       

                //options.AddInitialRequestCultureProvider(new CustomRequestCultureProvider(async context =>
                //{
                    
                //    // My custom request culture logic
                //    return new ProviderCultureResult("en");
                //}));
            });
            return services;
        }
    }

    public static class RequestLocalizationCookiesMiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestLocalizationCookies(this IApplicationBuilder app)
        {
            app.UseMiddleware<RequestLocalizationCookiesMiddleware>();
            return app;
        }
    }

    public class RequestLocalizationCookiesMiddleware : IMiddleware
    {
        public CookieRequestCultureProvider Provider { get; }

        public RequestLocalizationCookiesMiddleware(IOptions<RequestLocalizationOptions> requestLocalizationOptions)
        {
            Provider =
                requestLocalizationOptions
                    .Value
                    .RequestCultureProviders
                    .Where(x => x is CookieRequestCultureProvider)
                    .Cast<CookieRequestCultureProvider>()
                    .FirstOrDefault();
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (Provider != null)
            {
                var feature = context.Features.Get<IRequestCultureFeature>();

                if (feature != null)
                {
                    // remember culture across request
                    context.Response
                        .Cookies
                        .Append(
                            Provider.CookieName,
                            CookieRequestCultureProvider.MakeCookieValue(feature.RequestCulture)
                        );
                }
            }

            await next(context);
        }
    }
}