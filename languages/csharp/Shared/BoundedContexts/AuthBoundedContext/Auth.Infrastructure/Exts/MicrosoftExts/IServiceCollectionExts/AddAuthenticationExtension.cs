

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenIddict.Server.AspNetCore;



namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddAuthenticationExtension
    {
        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services,
            IConfiguration configuration)
        {
            //JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            var authSection = configuration.GetSection(key: "Auth");
            services.AddAuthentication(configureOptions: options =>
                {
                    options.DefaultScheme = OpenIddict.Validation.AspNetCore.OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
                    //options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    //options.DefaultChallengeScheme = OpenIddictServerAspNetCoreDefaults.AuthenticationScheme;
                })
                .AddCookie(authenticationScheme: CookieAuthenticationDefaults.AuthenticationScheme)
                .AddGoogle(configureOptions: options =>
                {
                    options.ClientId = authSection[key: "Google:ClientId"];
                    options.ClientSecret = authSection[key: "Google:ClientSecret"];
                })
                .AddFacebook(configureOptions: facebookOptions =>
                {
                    facebookOptions.AppId = authSection[key: "Facebook:AppId"];
                    facebookOptions.AppSecret = authSection[key: "Facebook:AppSecret"];
                }).AddMicrosoftAccount(configureOptions: microsoftOptions =>
                {
                    microsoftOptions.ClientId = authSection[key: "Microsoft:ClientId"];
                    microsoftOptions.ClientSecret = authSection[key: "Microsoft:ClientSecret"];
                }).AddTwitter(configureOptions: twitterOptions =>
                {
                    twitterOptions.ConsumerKey = authSection[key: "Twitter:ConsumerAPIKey"];
                    twitterOptions.ConsumerSecret = authSection[key: "Twitter:ConsumerSecret"];
                })
                .AddJwtBearer(authenticationScheme: JwtBearerDefaults.AuthenticationScheme, configureOptions: options =>
                {
                    //options.Authority = "https://identity.taneware.com";
                    options.Authority = "https://localhost:5001";
                    //options.Authority = "https://localhost:47254";
                    //options.Authority = "https://localhost:44388";
                    options.RequireHttpsMetadata = false;
                    //options.Scope.Add(IdentityServerConstants.StandardScopes.OpenId);
                    //options.Scope.Add(IdentityServerConstants.StandardScopes.Profile);
                    //options.Scope.Add(IdentityServerConstants.StandardScopes.OfflineAccess);
                    //options.Scope.Add(IdentityServerConstants.StandardScopes.Phone);
                    //options.Scope.Add(IdentityServerConstants.StandardScopes.Email);
                    //options.Scope.Add(IdentityServerConstants.StandardScopes.Address);
                    //options.Scope.Add("shared");
                    //options.Scope.Add("read");
                });
            //  .AddIdentityServerJwt();

            return services;
        }
    }
}