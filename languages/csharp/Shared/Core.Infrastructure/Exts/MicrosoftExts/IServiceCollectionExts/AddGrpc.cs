using Microsoft.Extensions.DependencyInjection;

namespace Core.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddGrpcExtension
    {
        public static IServiceCollection AddCustomGrpc(this IServiceCollection services)
        {
            services.AddGrpcReflection();
            services.AddGrpc();

            return services;
        }
    }
}