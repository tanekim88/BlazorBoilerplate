

using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.BuilderExtensions
{
    public static class UseAuthServerExtensions
    {
        public static IApplicationBuilder UseCustomAuthServerExtensions(this WebApplication app,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            app.InitializeCustomDatabaseForIdentityServer();

            if (env.IsDevelopment())
            {
                //app.UseLiveReload();

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



            //app.MapRazorPages();
            //app.MapControllers();
            //app.MapFallbackToFile(filePath: "index.html");

            app.MapBffManagementEndpoints();
            app.MapRazorPages();

            app.MapControllers()
                .RequireAuthorization()
                .AsBffApiEndpoint();

            app.MapFallbackToFile("index.html");

            return app;
        }
    }
}