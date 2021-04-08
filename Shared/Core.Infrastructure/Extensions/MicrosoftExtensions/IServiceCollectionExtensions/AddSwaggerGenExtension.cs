

using System.Linq;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddSwaggerGenExtension
    {
        public static IServiceCollection AddCustomSwaggerGen(this IServiceCollection services)
        {
            services.AddSwaggerGen(setupAction: c =>
            {
                c.SwaggerDoc(name: "v1", info: new OpenApiInfo {Title = "OData Api", Version = "v1"});
            });


            services.AddMvcCore(setupAction: options =>
            {
                foreach (var outputFormatter in options.OutputFormatters.OfType<ODataOutputFormatter>()
                    .Where(predicate: _ => _.SupportedMediaTypes.Count == 0))
                    outputFormatter.SupportedMediaTypes.Add(
                        item: new MediaTypeHeaderValue(mediaType: "application/prs.odatatestxx-odata"));

                foreach (var inputFormatter in options.OutputFormatters.OfType<ODataInputFormatter>()
                    .Where(predicate: _ => _.SupportedMediaTypes.Count == 0))
                    inputFormatter.SupportedMediaTypes.Add(
                        item: new MediaTypeHeaderValue(mediaType: "application/prs.odatatestxx-odata"));
            }).AddViewLocalization();

            return services;
        }
    }
}