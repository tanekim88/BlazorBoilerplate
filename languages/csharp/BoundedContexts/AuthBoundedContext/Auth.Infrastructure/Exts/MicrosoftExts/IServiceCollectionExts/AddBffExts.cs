using Duende.Bff.Yarp;
using Duende.IdentityServer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Auth.Infrastructure.Exts.MicrosoftExts.IServiceCollectionExts
{
    public static class AddBffExtensions
    {
        public static IServiceCollection AddCustomBff(
            this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.Configure<IdentityOptions>(configureOptions: options =>
            {
                options.ClaimsIdentity.UserNameClaimType = Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = Claims.Role;
            });

            //services.AddCustomAntiforgery();
            services.AddCustomAuthDbContextPool(configuration);
            services.AddCustomAuthDbContext(configuration);
            services.AddCustomIdentity();
            //services.AddCustomOpenIddictDbContextPool(configuration: configuration);
            //services.AddCustomOpenIddictDbContext(configuration: configuration);
            //services.AddCustomOpenIddict();


            //services.AddCustomAuthentication(configuration);




            var bffBuild = services.AddBff(options =>
            {
                //options.EnforceBffMiddleware = true;
                ////options.LicenseKey = "";

                //// Session Management
                //options.ManagementBasePath = "/bff";
                ////Flag that specifies if the sid claim needs to be present in the logout request as query string parameter. Used to prevent cross site request forgery.Defaults to true.
                //options.RequireLogoutSessionId = true;
                ////Specifies if the user�s refresh token is automatically revoked at logout time.Defaults to true.
                //options.RevokeRefreshTokenOnLogout = true;
                ////Specifies if during backchannel logout all matching user sessions are logged out. If true, all sessions for the subject will be revoked.If false, just the specific session will be revoked.Defaults to false.
                //options.BackchannelLogoutAllUserSessions = false;

                //options.AntiForgeryHeaderName = "X-CSRF";
                //options.AntiForgeryHeaderValue = "1";
            })
            .AddRemoteApis();

            //services.AddTransient<ILoginService, DefaultLoginService>();
            //services.AddTransient<ILogoutService, DefaultLogoutService>();
            //services.AddTransient<IUserService, DefaultUserService>();
            //services.AddTransient<IBackchannelLogoutService, DefaultBackchannelLogoutService>();
            //IBffEndpointService
            //services.AddHttpClient(AccessTokenManagementDefaults.BackChannelHttpClientName, configureClient =>
            //{
            //});

            if (environment.IsDevelopment())
            {
                bffBuild.AddServerSideSessions();
            }
            else
            {
                bffBuild.AddServerSideSessions();
                //bffBuild.AddEntityFrameworkServerSideSessions(options =>
                //{
                //    options.UseSqlServer(cn);
                //});
            }

    //        var builder = services.AddReverseProxy()
    //            .AddTransforms<AccessTokenTransformProvider>()
    //            .LoadFromMemory(
    //new[]
    //{
    //            new RouteConfig()
    //            {
    //                RouteId = "todos",
    //                ClusterId = "cluster1",

    //                Match = new RouteMatch
    //                {
    //                    Path = "/todos/{**catch-all}"
    //                }
    //            }.WithAccessToken(TokenType.User),
    //},
    //new[]
    //{
    //            new ClusterConfig
    //            {
    //                ClusterId = "cluster1",

    //                Destinations = new Dictionary<string, DestinationConfig>(StringComparer.OrdinalIgnoreCase)
    //                {
    //                    { "destination1", new DestinationConfig() { Address = "https://api.mycompany.com/todos" } },
    //                }
    //            }
    //});
            //"ReverseProxy": {
            //    "Routes": {
            //      "todos": {
            //        "ClusterId": "cluster1",
            //        "Match": {
            //          "Path": "/todos/{**catch-all}",
            //        },
            //        "Metadata": { 
            //            "Duende.Bff.Yarp.TokenType": "User"
            //        }
            //      }
            //    },
            //    "Clusters": {
            //      "cluster1": {
            //        "Destinations": {
            //          "destination1": {
            //            "Address": "https://api.mycompany.com/todos"
            //          }
            //        }
            //      }
            //    }
            //}

            services.AddUserAccessTokenHttpClient("IdentityServer", configureClient: client =>
            {
                client.BaseAddress = new Uri("https://localhost:5001/");
            });
            //services.AddHttpClient<MyTypedApiClient>(client =>
            //{
            //    client.BaseAddress = new Uri("https://remoteServer/");
            //})
            // .AddUserAccessTokenHandler();

            var authSection = configuration.GetSection(key: "Auth");
            services.AddAuthentication(configureOptions: options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = IdentityServerConstants.ProtocolTypes.OpenIdConnect;
                options.DefaultSignOutScheme = IdentityServerConstants.ProtocolTypes.OpenIdConnect;
            })
             .AddCookie(authenticationScheme: CookieAuthenticationDefaults.AuthenticationScheme, options =>
             {
                 // set session lifetime
                 options.ExpireTimeSpan = TimeSpan.FromHours(8);
                 // sliding or absolute
                 options.SlidingExpiration = false;
                 options.Cookie.Name = "__Host-BlazorApp";
                 options.Cookie.SameSite = SameSiteMode.Strict;
             })
             .AddOpenIdConnect(authenticationScheme: IdentityServerConstants.ProtocolTypes.OpenIdConnect,
                 displayName: "OpenIdDict Server", configureOptions: options =>
                 {
                     //options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                     //options.SignOutScheme = IdentityServerConstants.SignoutScheme;
                     options.SaveTokens = true;

                     //options.Authority = "https://identity.taneware.com";
                     options.Authority = authSection["Authority"];
                     //options.Authority = "https://localhost:47254";
                     //options.Authority = "https://localhost:44388";

                     options.RequireHttpsMetadata = true;

                     options.ClientId = authSection["ClientId"];
                     options.ClientSecret = authSection["ClientSecret"];
                     options.ResponseType = "code";

                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         NameClaimType = "name",
                         RoleClaimType = "role"
                     };



                     // request scopes + refresh tokens


                     //options.ResponseMode = "form_post";

                     //options.CallbackPath = "/authentication/login-callback";
                     //options.SaveTokens = true;
                     //options.GetClaimsFromUserInfoEndpoint = true;
                     //options.UseTokenLifetime = false;

                     // query response type is compatible with strict SameSite mode
                     options.ResponseMode = "query";

                     // get claims without mappings
                     options.MapInboundClaims = false;
                     options.GetClaimsFromUserInfoEndpoint = true;

                     // save tokens into authentication session
                     // to enable automatic token management
                     options.SaveTokens = true;

                     options.Scope.Clear();
                     options.Scope.Add(IdentityServerConstants.StandardScopes.OpenId);
                     //options.Scope.Add(IdentityServerConstants.StandardScopes.Phone);
                     //options.Scope.Add(IdentityServerConstants.StandardScopes.Email);
                     //options.Scope.Add(IdentityServerConstants.StandardScopes.Address);
                     //options.Scope.Add(IdentityServerConstants.StandardScopes.Profile);

                     //// and refresh token
                     //options.Scope.Add(IdentityServerConstants.StandardScopes.OfflineAccess);


                     //options.ClaimActions.MapJsonKey(claimType: JwtClaimTypes.WebSite, jsonKey: "website");
                     //options.ClaimActions.MapJsonKey(claimType: JwtClaimTypes.Gender, jsonKey: "gender");
                     //options.ClaimActions.MapJsonKey(claimType: JwtClaimTypes.BirthDate, jsonKey: "birthdate");

                     //options.SaveTokens = true;

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
                 options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

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
                 options.Authority = authSection["Authority"];
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


            return services;
        }
    }
}