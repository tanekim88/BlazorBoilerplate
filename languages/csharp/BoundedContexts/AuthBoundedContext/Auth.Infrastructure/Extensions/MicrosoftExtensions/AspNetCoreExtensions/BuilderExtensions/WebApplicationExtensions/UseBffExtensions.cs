

using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Duende.Bff;
using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.BuilderExtensions.WebApplicationExtensions
{
    public static class UseBffExtensions
    {
        public static IApplicationBuilder UseCustomBff(this WebApplication app,
            IConfiguration configuration, IWebHostEnvironment env)
        {
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
                app.InitializeCustomDatabaseForIdentityServer();

                app.UseExceptionHandler(errorHandlingPath: "/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/Apps-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseBlazorFrameworkFiles();
            app.UseStaticFiles();

            app.UseSerilogRequestLogging();

            //var localizationOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>().Value;

            app.UseRequestLocalization();
            app.UseRequestLocalizationCookies();

            app.UseRouting();

            app.UseCors(policyName: "CorsPolicy");

            app.UseAuthentication();
   
            app.UseBff();
            app.UseAuthorization();


            app.MapBffManagementEndpoints();
            app.MapRazorPages();

            // local APIs
            app.MapControllers()
                .RequireAuthorization()
                .AsBffApiEndpoint();

            // remote API
            //app.MapRemoteBffApiEndpoint("/identity-server", "https://localhost:5001")
            //     .RequireAccessToken(TokenType.User);


            //app.MapBffReverseProxy();

            // which is equivalent to
            //endpoints.MapReverseProxy()
            //    .AsBffApiEndpoint();

            // simple endpoint
            //app.MapPost("/foo", context => { ... })
            //    .RequireAuthorization()
            //    .AsBffApiEndpoint();

            app.MapFallbackToFile("index.html");

            return app;
        }
    }
}