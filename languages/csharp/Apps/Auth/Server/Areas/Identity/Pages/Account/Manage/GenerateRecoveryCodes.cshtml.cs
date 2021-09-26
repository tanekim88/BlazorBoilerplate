

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.Linq;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class GenerateRecoveryCodesModel : PageModel
    {
        private readonly ILogger<GenerateRecoveryCodesModel> _logger;
        private readonly UserManager<UserModel> _userManager;

        public GenerateRecoveryCodesModel(
            UserManager<UserModel> userManager,
            ILogger<GenerateRecoveryCodesModel> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [TempData] public string[] RecoveryCodes { get; set; }

        [TempData] public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            var isTwoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user: user);
            if (!isTwoFactorEnabled)
            {
                var userId = await _userManager.GetUserIdAsync(user: user);
                throw new InvalidOperationException(
                    message:
                    $"Cannot generate recovery codes for user with ID '{userId}' because they do not have 2FA enabled.");
            }

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            var isTwoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user: user);
            var userId = await _userManager.GetUserIdAsync(user: user);
            if (!isTwoFactorEnabled)
                throw new InvalidOperationException(
                    message:
                    $"Cannot generate recovery codes for user with ID '{userId}' as they do not have 2FA enabled.");

            var recoveryCodes = await _userManager.GenerateNewTwoFactorRecoveryCodesAsync(user: user, number: 10);
            RecoveryCodes = recoveryCodes.ToArray();

            _logger.LogInformation(message: "User with ID '{UserId}' has generated new 2FA recovery codes.", userId);
            StatusMessage = "You have generated new recovery codes.";
            return RedirectToPage(pageName: "./ShowRecoveryCodes");
        }
    }
}