﻿

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using SharedCore.Application.Services.__Entities_Groups_00_Name__Services;

namespace Core.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.IServiceCollectionExtensions
{
    public static class UseServerExtensions
    {
        public static IApplicationBuilder UseCustomServerExtensions(this IApplicationBuilder app,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            app.UseResponseCompression();

            if (env.IsDevelopment())
            {
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

            app.UseSolidFrameworkFiles();
            app.UseStaticFiles();

            app.UseSerilogRequestLogging();

            app.UseRouting();


            app.UseAuthentication();

            app.UseAuthorization();

            app.UseWebSockets();

            // must be added after UseRouting and before UseEndpoints 
            app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true});

            app.UseEndpoints(configure: endpoints =>
            {
                if (env.IsDevelopment()) {
                    endpoints.MapGrpcReflectionService().EnableGrpcWeb();
                }

                endpoints.MapGrpcService<GreeterService>().EnableGrpcWeb();
                //endpoints.MapGraphQL();
                endpoints.MapRazorPages();
                endpoints.MapControllers();
                //endpoints.MapHub<ChatHub>("/chathub");
                endpoints.MapFallbackToFile(filePath: "index.html");
            });

            app.UseSwagger();
            app.UseSwaggerUI(setupAction: c =>
            {
                c.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "My API v1");
            });

            return app;
        }
    }
}