

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class LoginWithRecoveryCodeModel : PageModel
    {
        private readonly ILogger<LoginWithRecoveryCodeModel> _logger;
        private readonly SignInManager<UserModel> _signInManager;

        public LoginWithRecoveryCodeModel(SignInManager<UserModel> signInManager, ILogger<LoginWithRecoveryCodeModel> logger)
        {
            _signInManager = signInManager;
            _logger = logger;
        }

        [BindProperty] public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public async Task<IActionResult> OnGetAsync(string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
                throw new InvalidOperationException(message: "Unable to load two-factor authentication user.");

            ReturnUrl = returnUrl;

            return Page();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            if (!ModelState.IsValid) return Page();

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
                throw new InvalidOperationException(message: "Unable to load two-factor authentication user.");

            var recoveryCode = Input.RecoveryCode.Replace(oldValue: " ", newValue: string.Empty);

            var result = await _signInManager.TwoFactorRecoveryCodeSignInAsync(recoveryCode: recoveryCode);

            if (result.Succeeded)
            {
                _logger.LogInformation(message: "User with ID '{UserId}' logged in with a recovery code.", user.Id);
                return LocalRedirect(localUrl: returnUrl ?? Url.Content(contentPath: "~/"));
            }

            if (result.IsLockedOut)
            {
                _logger.LogWarning(message: "User with ID '{UserId}' account locked out.", user.Id);
                return RedirectToPage(pageName: "./Lockout");
            }

            _logger.LogWarning(message: "Invalid recovery code entered for user with ID '{UserId}' ", user.Id);
            ModelState.AddModelError(key: string.Empty, errorMessage: "Invalid recovery code entered.");
            return Page();
        }

        public class InputModel
        {
            [BindProperty]
            [Required]
            [DataType(dataType: DataType.Text)]
            [Display(Name = "Recovery Code")]
            public string RecoveryCode { get; set; }
        }
    }
}