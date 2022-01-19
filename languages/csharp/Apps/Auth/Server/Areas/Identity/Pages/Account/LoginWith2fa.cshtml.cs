

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
    public class LoginWith2faModel : PageModel
    {
        private readonly ILogger<LoginWith2faModel> _logger;
        private readonly UserManager<UserModel> _userManager;
        private readonly SignInManager<UserModel> _signInManager;

        public LoginWith2faModel(
            SignInManager<UserModel> signInManager,
                      UserManager<UserModel> userManager,
            ILogger<LoginWith2faModel> logger)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
        }

        [BindProperty] public InputModel Input { get; set; }

        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }

        public async Task<IActionResult> OnGetAsync(bool rememberMe, string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

            if (user == null)
                throw new InvalidOperationException(message: "Unable to load two-factor authentication user.");

            ReturnUrl = returnUrl;
            RememberMe = rememberMe;

            return Page();
        }

        public async Task<IActionResult> OnPostAsync(bool rememberMe, string returnUrl = null)
        {
            if (!ModelState.IsValid) return Page();

            returnUrl = returnUrl ?? Url.Content(contentPath: "~/");

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
                throw new InvalidOperationException(message: "Unable to load two-factor authentication user.");

            var authenticatorCode = Input.TwoFactorCode.Replace(oldValue: " ", newValue: string.Empty)
                .Replace(oldValue: "-", newValue: string.Empty);

            var result =
                await _signInManager.TwoFactorAuthenticatorSignInAsync(code: authenticatorCode,
                    isPersistent: rememberMe,
                    rememberClient: Input.RememberMachine);

            var userId = await _userManager.GetUserIdAsync(user);


            if (result.Succeeded)
            {
                _logger.LogInformation(message: "User with ID '{UserId}' logged in with 2fa.", userId);
                return LocalRedirect(localUrl: returnUrl);
            }

            if (result.IsLockedOut)
            {
                _logger.LogWarning(message: "User with ID '{UserId}' account locked out.", userId);
                return RedirectToPage(pageName: "./Lockout");
            }

            _logger.LogWarning(message: "Invalid authenticator code entered for user with ID '{UserId}'.", userId);
            ModelState.AddModelError(key: string.Empty, errorMessage: "Invalid authenticator code.");
            return Page();
        }

        public class InputModel
        {
            [Required]
            [StringLength(maximumLength: 7,
                ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.",
                MinimumLength = 6)]
            [DataType(dataType: DataType.Text)]
            [Display(Name = "Authenticator code")]
            public string TwoFactorCode { get; set; }

            [Display(Name = "Remember this machine")]
            public bool RememberMachine { get; set; }
        }
    }
}