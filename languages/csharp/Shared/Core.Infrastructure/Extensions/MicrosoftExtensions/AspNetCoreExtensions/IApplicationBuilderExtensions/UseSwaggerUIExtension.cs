

using Microsoft.AspNetCore.Builder;

namespace Core.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.IApplicationBuilderExtensions
{
    public static class UseSwaggerUIExtension
    {
        public static IApplicationBuilder UseCustomSwaggerUIExtension(this IApplicationBuilder app)
        {       
            app.UseSwagger();
            app.UseSwaggerUI(setupAction: c =>
            {
                c.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "My API v1");
            });

            return app;
        }
    }
}