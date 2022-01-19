

using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddRazorPagesExtension
    {
        public static IServiceCollection AddCustomRazorPages(this IServiceCollection services)
        {
            services.AddRazorPages(configure: options =>
            {
                options.Conventions.Add(
                    item: new PageRouteTransformerConvention(
                        parameterTransformer: new SlugifyParameterTransformer()));
            }).AddViewLocalization();
            return services;
        }

        public class SlugifyParameterTransformer : IOutboundParameterTransformer
        {
            public string TransformOutbound(object value)
            {
                // Slugify value
                return value == null
                    ? null
                    : Regex.Replace(input: value.ToString(), pattern: "([a-z])([A-Z])", replacement: "$1-$2").ToLower();
            }
        }
    }
}