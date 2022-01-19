

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.OpenIdDict.TokenProviders;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SharedAuth.Application.Models.EntityModels;



namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddIdentityExtension
    {
        public static IServiceCollection AddCustomIdentity(this IServiceCollection services)
        {
            services.AddTransient<CustomEmailConfirmationTokenProvider<UserModel>>();

            services.AddIdentity<UserModel, RoleModel>(setupAction: config =>
                {
                    config.SignIn.RequireConfirmedEmail = true;
                    config.SignIn.RequireConfirmedAccount = true;
                    //config.Tokens.ProviderMap.Add("CustomEmailConfirmation",
                    //    new TokenProviderDescriptor(
                    //        typeof(CustomEmailConfirmationTokenProvider<User>)));
                    //config.Tokens.EmailConfirmationTokenProvider = "CustomEmailConfirmation";
                })
                .AddEntityFrameworkStores<AuthDbContext>()
                .AddDefaultTokenProviders();

            return services;
        }
    }
}