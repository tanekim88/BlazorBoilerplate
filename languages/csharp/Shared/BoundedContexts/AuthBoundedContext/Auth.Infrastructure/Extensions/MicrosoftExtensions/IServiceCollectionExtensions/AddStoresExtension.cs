
using Auth.Domain.ValueObjects.Ids;
using Auth.Infrastructure.Modules.IdentityServerModule.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SharedAuth.Application.Models.EntityModels;


namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddStoresExtension
    {
        public static IServiceCollection AddCustomStores(this IServiceCollection services)
        {
            services.AddTransient<IUserStore<UserModel>, CustomUserStore>();
            services.AddTransient<IRoleStore<IdentityRole<RoleId>>, CustomRoleStore>();
            return services;
        }
    }
}