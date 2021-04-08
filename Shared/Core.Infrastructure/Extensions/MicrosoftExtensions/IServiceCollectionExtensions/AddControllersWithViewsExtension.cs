

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Text.RegularExpressions;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddControllersWithViewsExtension
    {
        public static IServiceCollection AddCustomControllersWithViews(this IServiceCollection services)
        {
            services.AddControllersWithViews(configure: options =>
            {
                options.Conventions.Add(
                    actionModelConvention: new RouteTokenTransformerConvention(
                        parameterTransformer: new SlugifyParameterTransformer()));

                options.InputFormatters.Insert(index: 0, item: GetJsonPatchInputFormatter());
            }).AddViewLocalization().AddDapr();

            return services;
        }

        private static NewtonsoftJsonPatchInputFormatter GetJsonPatchInputFormatter()
        {
            var builder = new ServiceCollection()
                .AddLogging()
                .AddMvc()
                .AddViewLocalization()
                .AddNewtonsoftJson()
                .Services.BuildServiceProvider();

            return builder
                .GetRequiredService<IOptions<MvcOptions>>()
                .Value
                .InputFormatters
                .OfType<NewtonsoftJsonPatchInputFormatter>()
                .First();
        }

        public class SlugifyParameterTransformer : IOutboundParameterTransformer
        {
            public string TransformOutbound(object value)
            {
                return value == null
                    ? null
                    : Regex.Replace(input: value.ToString(), pattern: "([a-z])([A-Z])", replacement: "$1-$2").ToLower();
            }
        }
    }
}