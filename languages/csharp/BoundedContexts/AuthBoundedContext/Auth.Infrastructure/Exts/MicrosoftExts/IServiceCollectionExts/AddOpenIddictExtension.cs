

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.OpenIdDict;
using Microsoft.Extensions.DependencyInjection;
using static OpenIddict.Abstractions.OpenIddictConstants;



namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddOpenIddictExtension
    {
        public static IServiceCollection AddCustomOpenIddict(this IServiceCollection services)
        {
            services.AddOpenIddict()

                // Register the OpenIddict core components.
                .AddCore(configuration: options =>
                {
                    // Configure OpenIddict to use the Entity Framework Core stores and models.
                    // Note: call ReplaceDefaultEntities() to replace the default OpenIddict entities.
                    options.UseEntityFrameworkCore()
                        .UseDbContext<AuthDbContext>()
                        .ReplaceDefaultEntities<CustomOpenIddictApplication, CustomOpenIddictAuthorization, CustomOpenIddictScope,
                            CustomOpenIddictToken, int>();
                })

                // Register the OpenIddict server components.
                .AddServer(configuration: options =>
                {
                    options.SetAuthorizationEndpointUris("/connect/authorize")
                               .SetLogoutEndpointUris("/connect/logout")
                               .SetIntrospectionEndpointUris("/connect/introspect")
                               .SetTokenEndpointUris("/connect/token")
                               .SetUserinfoEndpointUris("/connect/userinfo")
                               .SetVerificationEndpointUris("/connect/verify");

                    // Mark the "email", "profile" and "roles" scopes as supported scopes.
                    options.RegisterScopes(Scopes.Email, Scopes.Profile, Scopes.Roles, Scopes.Address, Scopes.Phone, Scopes.OfflineAccess);

                    // Note: the sample uses the code and refresh token flows but you can enable
                    // the other flows if you need to support implicit, password or client credentials.
                    options.AllowAuthorizationCodeFlow()
                        .AllowRefreshTokenFlow()
                        .RequireProofKeyForCodeExchange();

                    // Register the signing and encryption credentials.
                    options.AddDevelopmentEncryptionCertificate()
                        .AddDevelopmentSigningCertificate();

                    // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
                      options.UseAspNetCore()
                           .EnableAuthorizationEndpointPassthrough()
                           .EnableLogoutEndpointPassthrough()
                           .EnableTokenEndpointPassthrough()
                           .EnableUserinfoEndpointPassthrough()
                           .EnableStatusCodePagesIntegration();


                    //options.IgnoreEndpointPermissions();
                    //options.IgnoreGrantTypePermissions();
                    //options.IgnoreScopePermissions();
                })

                // Register the OpenIddict validation components.
                .AddValidation(configuration: options =>
                {
                    // Import the configuration from the local OpenIddict server instance.
                    options.UseLocalServer();

                    // Register the ASP.NET Core host.
                    options.UseAspNetCore();
                });

            return services;
        }
    }
}