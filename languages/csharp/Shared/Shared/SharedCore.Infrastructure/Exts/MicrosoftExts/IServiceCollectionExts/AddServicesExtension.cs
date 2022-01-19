using Microsoft.Extensions.DependencyInjection;
using SharedCore.Domain.Attributes.ServiceAttributes;
using System.Linq;
using System.Reflection;

namespace SharedCore.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddServicesExtension
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services, params Assembly[] assemblies)
        {


            foreach (var assembly in assemblies)
            {
                var assemblyType = assembly.GetName().Name.Split('.').Last() + "Service";

                var domainTypes = assembly.GetTypes().Where(type => type.Name.EndsWith(assemblyType));
                var domainInterfaces = domainTypes.Where(domainType => domainType.IsInterface);
                var domainServices = domainTypes.Where(domainType => !domainType.IsInterface);
                var domainDic = domainInterfaces.ToDictionary(domainInterface => domainInterface,
                    domainInterface => domainServices.FirstOrDefault(domainService => "I" + domainService.Name == domainInterface.Name));
                foreach (var pair in domainDic)
                {
                    if (pair.Value is not null)
                    {
                        var implementation = pair.Value;
                        var serviceLifetimeAttribute = (ServiceLifetimeAttribute)implementation.GetCustomAttribute(typeof(ServiceLifetimeAttribute));
                        var lifetime = serviceLifetimeAttribute?.Name;
                        switch (lifetime)
                        {
                            case "Transient":
                                services.AddTransient(pair.Key, pair.Value);
                                break;
                            case "Scoped":
                                services.AddScoped(pair.Key, pair.Value);
                                break;
                            default:
                                services.AddSingleton(pair.Key, pair.Value);
                                break;
                        }
                    }
                }
            }


            return services;
        }
    }
}