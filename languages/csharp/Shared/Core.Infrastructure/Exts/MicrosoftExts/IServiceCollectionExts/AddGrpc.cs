using Microsoft.Extensions.DependencyInjection;

namespace Core.Infrastructure.Exts.MicrosoftExtensions.IServiceCollectionExtensions
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