

using IdentityModel;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddIdentityServerAuthenticationExtension
    {
        public static IServiceCollection AddCustomIdentityServerAuthentication(this IServiceCollection services,
            IConfiguration configuration)
        {
            //JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            var authSection = configuration.GetSection(key: "Auth");
            services.AddAuthentication(configureOptions: options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = IdentityServerConstants.ProtocolTypes.OpenIdConnect;
                })
                .AddCookie(authenticationScheme: CookieAuthenticationDefaults.AuthenticationScheme)
                .AddOpenIdConnect(authenticationScheme: IdentityServerConstants.ProtocolTypes.OpenIdConnect,
                    displayName: "OpenIdDict Server", configureOptions: options =>
                    {
                        options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                        //options.Authority = "https://identity.taneware.com";
                        options.Authority = authSection["Authority"];
                        //options.Authority = "https://localhost:47254";
                        //options.Authority = "https://localhost:44388";

                        options.RequireHttpsMetadata = true;

                        options.ClientId = authSection["ClientId"];
                        options.ClientSecret = authSection["ClientSecret"];
                        options.ResponseType = "code";
                        //options.ResponseMode = "form_post";

                        //options.CallbackPath = "/authentication/login-callback";
                        options.SaveTokens = true;
                        options.GetClaimsFromUserInfoEndpoint = true;
                        options.UseTokenLifetime = false;

                        //options.Scope.Add(IdentityServerConstants.StandardScopes.OpenId);
                        //options.Scope.Add(IdentityServerConstants.StandardScopes.Profile);
                        //options.Scope.Add(IdentityServerConstants.StandardScopes.OfflineAccess);
                        //options.Scope.Add(IdentityServerConstants.StandardScopes.Phone);
                        //options.Scope.Add(IdentityServerConstants.StandardScopes.Email);
                        //options.Scope.Add(IdentityServerConstants.StandardScopes.Address);
                        //options.Scope.Add("shared");
                        //options.Scope.Add("read");

                        options.ClaimActions.MapJsonKey(claimType: JwtClaimTypes.WebSite, jsonKey: "website");
                        options.ClaimActions.MapJsonKey(claimType: JwtClaimTypes.Gender, jsonKey: "gender");
                        options.ClaimActions.MapJsonKey(claimType: JwtClaimTypes.BirthDate, jsonKey: "birthdate");

                        options.SaveTokens = true;

                        //options.Events.OnRedirectToIdentityProvider = context =>
                        //{
                        //    if (context.ProtocolMessage.RequestType == OpenIdConnectRequestType.Authentication)
                        //    {
                        //        // generate code_verifier
                        //        var codeVerifier = CryptoRandom.CreateUniqueId(32);

                        //        // store codeVerifier for later use
                        //        context.Properties.Items.Add("code_verifier", codeVerifier);

                        //        // create code_challenge
                        //        string codeChallenge;
                        //        using (var sha256 = SHA256.Create())
                        //        {
                        //            var challengeBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(codeVerifier));
                        //            codeChallenge = Base64Url.Encode(challengeBytes);
                        //        }

                        //        // add code_challenge and code_challenge_method to request
                        //        context.ProtocolMessage.Parameters.Add("code_challenge", codeChallenge);
                        //        context.ProtocolMessage.Parameters.Add("code_challenge_method", "S256");
                        //    }

                        //    return Task.CompletedTask;
                        //};
                        //options.Events.OnAuthorizationCodeReceived = context =>
                        //{
                        //    // only when authorization code is being swapped for tokens
                        //    if (context.TokenEndpointRequest?.GrantType == OpenIdConnectGrantTypes.AuthorizationCode)
                        //    {
                        //        // get stored code_verifier
                        //        if (context.Properties.Items.TryGetValue("code_verifier", out var codeVerifier))
                        //        {
                        //            // add code_verifier to token request
                        //            context.TokenEndpointRequest.Parameters.Add("code_verifier", codeVerifier);
                        //        }
                        //    }

                        //    return Task.CompletedTask;
                        //};

                        //options.Events.OnAccessDenied = context =>
                        //    {
                        //        context.HandleResponse();
                        //        context.Response.Redirect("/");
                        //        return Task.CompletedTask;
                        //    };
                    })
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