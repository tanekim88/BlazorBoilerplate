using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Auth.Infrastructure.Impls.MicrosoftImpls.AspNetCoreImpls.IdentityImpls.UserClaimsPrincipalFactoryImpls
{
    public class CustomUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<UserModel, RoleModel>
    {
        public CustomUserClaimsPrincipalFactory(
            UserManager<UserModel> userManager,
            RoleManager<RoleModel> roleManager,
            IOptions<IdentityOptions> optionsAccessor) : base(userManager, roleManager, optionsAccessor)
        {
        }

        public async Task<ClaimsPrincipal> CreateAsync(UserModel user)
        {
            var principal = await base.CreateAsync(user);

            //((ClaimsIdentity)principal.Identity).AddClaims(new[] {
            //    new Claim(ClaimTypes.GivenName, user.FirstName),
            //    new Claim(ClaimTypes.Surname, user.LastName),
            //});

            return principal;
        }
    }
}
