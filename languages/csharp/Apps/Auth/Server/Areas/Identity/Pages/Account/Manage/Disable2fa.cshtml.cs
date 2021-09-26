

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class Disable2faModel : PageModel
    {
        private readonly ILogger<Disable2faModel> _logger;
        private readonly UserManager<UserModel> _userManager;

        public Disable2faModel(
            UserManager<UserModel> userManager,
            ILogger<Disable2faModel> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [TempData] public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGet()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            if (!await _userManager.GetTwoFactorEnabledAsync(user: user))
                throw new InvalidOperationException(
                    message:
                    $"Cannot disable 2FA for user with ID '{_userManager.GetUserId(principal: User)}' as it's not currently enabled.");

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            var disable2faResult = await _userManager.SetTwoFactorEnabledAsync(user: user, enabled: false);
            if (!disable2faResult.Succeeded)
                throw new InvalidOperationException(
                    message:
                    $"Unexpected error occurred disabling 2FA for user with ID '{_userManager.GetUserId(principal: User)}'.");

            _logger.LogInformation(message: "User with ID '{UserId}' has disabled 2fa.",
                _userManager.GetUserId(principal: User));
            StatusMessage = "2fa has been disabled. You can reenable 2fa when you setup an authenticator app";
            return RedirectToPage(pageName: "./TwoFactorAuthentication");
        }
    }
}