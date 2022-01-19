

using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddSignalRExtension
    {
        public static IServiceCollection AddCustomSignalR(this IServiceCollection services)
        {
            services.AddSignalR();
            services.AddResponseCompression(configureOptions: opts =>
            {
                opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
                    second: new[] {"application/octet-stream"});
            });

            return services;
        }
    }
}