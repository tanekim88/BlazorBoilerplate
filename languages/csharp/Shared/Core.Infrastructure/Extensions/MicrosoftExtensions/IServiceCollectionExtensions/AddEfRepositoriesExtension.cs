

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SharedCore.Domain.Attributes.ServiceAttributes;
using System;
using System.Linq;
using System.Reflection;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddEfRepositoriesExtension
    {
        public static IServiceCollection AddCustomEfRepositories<TDbContext>(this IServiceCollection services, params Assembly[] assemblies) where TDbContext : DbContext
        {

            var types = assemblies.SelectMany(assembly => assembly.GetTypes());
            var repositoryInterfaces = types.Where(type => type.Name.EndsWith("Repository") && type.IsInterface);
            var repositories = types.Where(type => type.Name.Contains("Repository") && !type.IsInterface);

            var dic = repositoryInterfaces.ToDictionary(repositoryInterface => repositoryInterface,
                repositoryInterface =>
                {
                    var repository = repositories.FirstOrDefault(repository => repository.Name.StartsWith(repositoryInterface.Name.Substring(1)));
                    var toReturn = repository.MakeGenericType(new Type[] {typeof(TDbContext) });
                    return toReturn;
                });
            foreach (var pair in dic)
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


            return services;
        }
    }
}