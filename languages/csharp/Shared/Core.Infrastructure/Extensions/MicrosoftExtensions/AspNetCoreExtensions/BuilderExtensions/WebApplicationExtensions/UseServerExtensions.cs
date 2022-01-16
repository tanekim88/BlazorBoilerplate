

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using SharedCore.Application.Services.__Entities_Groups_00_Name__Services;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;

namespace Core.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.BuilderExtensions.WebApplicationExtensions
{
    public static class UseServerExtensions
    {
        public static IApplicationBuilder UseCustomServerExtensions(this WebApplication app,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            app.UseResponseCompression();

            app.UseCustomSecurityHeaders(env.IsDevelopment(), configuration["Auth:Authority"]);
            //X - Content - Type - Options: nosniff
            //Strict - Transport - Security: max - age = 31536000; includeSubDomains - only applied to HTTPS responses
            //X - Frame - Options: Deny - only applied to text / html responses
            //X - XSS - Protection: 1; mode = block - only applied to text / html responses
            //Referrer - Policy: strict - origin - when - cross - origin - only applied to text / html responses
            //Content - Security - Policy: object-src 'none'; form - action 'self'; frame - ancestors 'none' - only applied to text / html responses

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                    //options.RoutePrefix = string.Empty;
                });

                app.UseDeveloperExceptionPage(options: new DeveloperExceptionPageOptions
                {
                    SourceCodeLineCount = 10
                });


                app.UseMigrationsEndPoint();
                app.UseWebAssemblyDebugging();
            }
            else
            {
                app.UseExceptionHandler(errorHandlingPath: "/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/Apps-hsts.
                app.UseHsts();
            }

            app.UseCors(policyName: "CorsPolicy");

            //app.UseHttpsRedirection();

            app.UseBlazorFrameworkFiles();
            app.UseStaticFiles();

            app.UseSerilogRequestLogging();

            app.UseRouting();


            app.UseAuthentication();

            app.UseAuthorization();

            app.UseWebSockets();

            // must be added after UseRouting and before UseEndpoints 
            app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true });

            if (env.IsDevelopment())
            {
                app.MapGrpcReflectionService().EnableGrpcWeb();
            }

            app.MapGrpcService<GreeterService>().EnableGrpcWeb();
            //app.MapGraphQL();
            app.MapRazorPages();
            app.MapControllers();
            //app.MapHub<ChatHub>("/chathub");
            app.MapFallbackToFile(filePath: "index.html");

            app.UseSwagger();
            app.UseCustomSwaggerUIExtension();

            return app;
        }
    }
}