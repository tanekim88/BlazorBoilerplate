

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class ExternalLoginsModel : PageModel
    {
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public ExternalLoginsModel(
            UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IList<UserLoginInfo> CurrentLogins { get; set; }

        public IList<AuthenticationScheme> OtherLogins { get; set; }

        public bool ShowRemoveButton { get; set; }

        [TempData] public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null) return NotFound(value: "Unable to load user with ID 'user.Id'.");

            CurrentLogins = await _userManager.GetLoginsAsync(user: user);
            OtherLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync())
                .Where(predicate: auth => CurrentLogins.All(predicate: ul => auth.Name != ul.LoginProvider))
                .ToList();
            ShowRemoveButton = user.PasswordHash != null || CurrentLogins.Count > 1;
            return Page();
        }

        public async Task<IActionResult> OnPostRemoveLoginAsync(string loginProvider, string providerKey)
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null) return NotFound(value: "Unable to load user with ID 'user.Id'.");

            var result =
                await _userManager.RemoveLoginAsync(user: user, loginProvider: loginProvider, providerKey: providerKey);
            if (!result.Succeeded)
            {
                StatusMessage = "The external login was not removed.";
                return RedirectToPage();
            }

            await _signInManager.RefreshSignInAsync(user: user);
            StatusMessage = "The external login was removed.";
            return RedirectToPage();
        }

        public async Task<IActionResult> OnPostLinkLoginAsync(string provider)
        {
            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(scheme: IdentityConstants.ExternalScheme);

            // Request a redirect to the external login provider to link a login for the current user
            var redirectUrl = Url.Page(pageName: "./ExternalLogins", pageHandler: "LinkLoginCallback");
            var properties =
                _signInManager.ConfigureExternalAuthenticationProperties(provider: provider, redirectUrl: redirectUrl,
                    userId: _userManager.GetUserId(principal: User));
            return new ChallengeResult(authenticationScheme: provider, properties: properties);
        }

        public async Task<IActionResult> OnGetLinkLoginCallbackAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null) return NotFound(value: "Unable to load user with ID 'user.Id'.");

            var info = await _signInManager.GetExternalLoginInfoAsync(expectedXsrf: user.UserName);
            if (info == null)
                throw new InvalidOperationException(
                    message: $"Unexpected error occurred loading external login info for user with ID '{user.Id}'.");

            var result = await _userManager.AddLoginAsync(user: user, login: info);
            if (!result.Succeeded)
            {
                StatusMessage =
                    "The external login was not added. External logins can only be associated with one account.";
                return RedirectToPage();
            }

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(scheme: IdentityConstants.ExternalScheme);

            StatusMessage = "The external login was added.";
            return RedirectToPage();
        }
    }
}