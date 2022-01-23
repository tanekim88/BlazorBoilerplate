using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace Auth.Infrastructure.Impls.DuendeImpls.IdentityServerImpls.ServicesImpls.IProfileServiceImpls
{
    public class CustomProfileService : IProfileService
    {
        public virtual async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            //var transaction = context.RequestedResources.ParsedScopes.FirstOrDefault(x => x.ParsedName == "transaction");
            //if (transaction?.ParsedParameter != null)
            //{
            //    context.IssuedClaims.Add(new Claim("transaction_id", transaction.ParsedParameter));
            //}
            // add actor claim if needed
            if (context.Subject.GetAuthenticationMethod() == OidcConstants.GrantTypes.TokenExchange)
            {
                var act = context.Subject.FindFirst(JwtClaimTypes.Actor);
                if (act != null)
                {
                    context.IssuedClaims.Add(act);
                }
            }


            var requestedClaimTypes = context.RequestedClaimTypes;
            var user = context.Subject;

            // your implementation to retrieve the requested information
            //var claims = GetRequestedClaims(user, requestedClaimsTypes);
            //context.IssuedClaims.AddRange(claims);
        }

        public virtual Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
            return Task.CompletedTask;
        }
    }
}
