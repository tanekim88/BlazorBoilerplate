

using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.IServiceCollectionExtensions
{
    public static class UseAuthServerExtensions
    {
        public static IApplicationBuilder UseCustomAuthServerExtensions(this IApplicationBuilder app,
            IConfiguration configuration, IWebHostEnvironment env)
        {
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

            app.UseHttpsRedirection();
            app.UseBlazorWebFrameworkFiles();
            app.UseStaticFiles();

            app.UseSerilogRequestLogging();

            //var localizationOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>().Value;

            app.UseRequestLocalization();
            app.UseRequestLocalizationCookies();

            app.UseRouting();

            app.UseCors(policyName: "CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(configure: endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllers();
                endpoints.MapFallbackToFile(filePath: "index.html");
            });
            return app;
        }
    }
}