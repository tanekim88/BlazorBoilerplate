

using Auth.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.IServiceCollectionExtensions;
using Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

namespace Auth.Server
{
    public class Startup
    {
        private readonly JsonSerializerOptions options = new JsonSerializerOptions()
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };


        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Environment = environment;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }
        public string ConnectionString { get; set; }

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            ConfigureServices(services: services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            ConfigureServices(services: services);
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCustomAuthServer(configuration: Configuration, environment: Environment);
            services.AddHostedService<Worker>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCustomAuthServerExtensions(configuration: Configuration, env: env);
        }
    }
}