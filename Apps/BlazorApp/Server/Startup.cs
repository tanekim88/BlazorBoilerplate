

using Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Core.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.IServiceCollectionExtensions;
using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace BlazorApp.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
             services.AddCustomServer(configuration: Configuration, environment: Environment);
            services.AddCustomClientAuthServer(configuration: Configuration, environment: Environment);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCustomServerExtensions(configuration: Configuration, env: env);
        }
    }
}