

using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddCorsExtension
    {
        public static IServiceCollection AddCustomCors(this IServiceCollection services)
        {
            services.AddCors(setupAction: options =>
            {
                options.AddPolicy(name: "CorsPolicy",
                    configurePolicy: builder => { 
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                        .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
                        ;
                    });
            });

            return services;
        }
    }
}