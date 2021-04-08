

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using OpenIddict.Server.AspNetCore;
using SharedAuth.Application.Models.EntityModels;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account
{
    [IgnoreAntiforgeryToken]
    [AllowAnonymous]
    public class LogoutModel : PageModel
    {
        private readonly ILogger<LogoutModel> _logger;
        private readonly SignInManager<UserModel> _signInManager;

        public LogoutModel(SignInManager<UserModel> signInManager, ILogger<LogoutModel> logger)
        {
            _signInManager = signInManager;
            _logger = logger;
        }

        public async Task<IActionResult> OnGetAsync()
        {
            await _signInManager.SignOutAsync();

            // Returning a SignOutResult will ask OpenIddict to redirect the user agent
            // to the post_logout_redirect_uri specified by the client application or to
            // the RedirectUri specified in the authentication properties if none was set.
            return SignOut(
                authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                properties: new AuthenticationProperties
                {
                    RedirectUri = "/"
                });
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            //    return SignOut(
            //        authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
            //        properties: new AuthenticationProperties
            //        {
            //            RedirectUri = "/"
            //        });
            await _signInManager.SignOutAsync();
            _logger.LogInformation(message: "User logged out.");
            if (returnUrl != null)
                return LocalRedirect(localUrl: returnUrl);
            return RedirectToPage();
        }
    }
}