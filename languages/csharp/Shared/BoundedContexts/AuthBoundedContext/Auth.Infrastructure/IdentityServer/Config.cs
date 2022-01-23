using Duende.IdentityServer.Models;
using System.Collections.Generic;


namespace Auth.Infrastructure.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("scope1"),
                new ApiScope("scope2"),
            };

        // API resources to enable introspection (if needed)
        public static IEnumerable<ApiResource> ApiResources =>
            new ApiResource[]
            {
                new ApiResource("api1")
                {
                    Scopes =
                    {
                        "scope1"
                    },
                    ApiSecrets =
                    {
                        //new Secret("secret".Sha256())
                        new Secret("secret")
                    }
                },
                new ApiResource("api2")
                {
                    Scopes =
                    {
                        "scope2"
                    },
                    ApiSecrets =
                    {
                        //new Secret("secret".Sha256())
                        new Secret("secret")
                    }
                }
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                // m2m client credentials flow client
                new Client
                {
                    ClientId = "angular-app-code",
                    //ClientSecrets = { new Secret("secret".Sha256()) },
                    ClientSecrets = { new Secret("secret") },

                    AllowedGrantTypes = GrantTypes.Code,

                    RedirectUris = {
                        "https://localhost:4200/signin-oidc" ,
                    },
                    FrontChannelLogoutUri = "https://localhost:4200/signout-oidc",
                    PostLogoutRedirectUris = {
                        "https://localhost:4200",
                    },

                    AllowOfflineAccess = true,
                    AllowedScopes = { "openid", "profile", "email", "offline_access", "scope2" }
                },

                // interactive client using code flow + pkce
                new Client
                {
                    ClientId = "blazor-app-code",
                    //ClientSecrets = { new Secret("secret".Sha256()) },
                    ClientSecrets = { new Secret("secret") },

                    AllowedGrantTypes = GrantTypes.Code,

                    RedirectUris = {
                        "https://localhost:4001/signin-oidc" ,
                    },
                    FrontChannelLogoutUri = "https://localhost:4001/signout-oidc",
                    PostLogoutRedirectUris = {
                        "https://localhost:4001/signout-callback-oidc"
                    },

                    AllowOfflineAccess = true,
                    AllowedScopes = { "openid","address","phone", "profile", "email", "offline_access", "scope2" }
                },
            };
    }
}
