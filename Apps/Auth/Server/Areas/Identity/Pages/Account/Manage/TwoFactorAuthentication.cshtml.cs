

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class TwoFactorAuthenticationModel : PageModel
    {
        private const string AuthenicatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}";
        private readonly ILogger<TwoFactorAuthenticationModel> _logger;
        private readonly SignInManager<UserModel> _signInManager;

        private readonly UserManager<UserModel> _userManager;

        public TwoFactorAuthenticationModel(
            UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager,
            ILogger<TwoFactorAuthenticationModel> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        public bool HasAuthenticator { get; set; }

        public int RecoveryCodesLeft { get; set; }

        [BindProperty] public bool Is2faEnabled { get; set; }

        public bool IsMachineRemembered { get; set; }

        [TempData] public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGet()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            HasAuthenticator = await _userManager.GetAuthenticatorKeyAsync(user: user) != null;
            Is2faEnabled = await _userManager.GetTwoFactorEnabledAsync(user: user);
            IsMachineRemembered = await _signInManager.IsTwoFactorClientRememberedAsync(user: user);
            RecoveryCodesLeft = await _userManager.CountRecoveryCodesAsync(user: user);

            return Page();
        }

        public async Task<IActionResult> OnPost()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            await _signInManager.ForgetTwoFactorClientAsync();
            StatusMessage =
                "The current browser has been forgotten. When you login again from this browser you will be prompted for your 2fa code.";
            return RedirectToPage();
        }
    }
}