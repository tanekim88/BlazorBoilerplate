

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class LoginModel : PageModel
    {
        private readonly ILogger<LoginModel> _logger;
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public LoginModel(SignInManager<UserModel> signInManager,
            ILogger<LoginModel> logger,
            UserManager<UserModel> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [BindProperty] public InputModel Input { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public string ReturnUrl { get; set; }

        [TempData] public string ErrorMessage { get; set; }

        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!string.IsNullOrEmpty(value: ErrorMessage))
                ModelState.AddModelError(key: string.Empty, errorMessage: ErrorMessage);

            returnUrl ??= Url.Content("~/");


            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(scheme: IdentityConstants.ExternalScheme);

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content(contentPath: "~/");

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result =
                    await _signInManager.PasswordSignInAsync(userName: Input.Email, password: Input.Password,
                        isPersistent: Input.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation(message: "User logged in.");
                    return LocalRedirect(localUrl: returnUrl);
                }

                if (result.RequiresTwoFactor)
                    return RedirectToPage(pageName: "./LoginWith2fa",
                        routeValues: new {ReturnUrl = returnUrl, Input.RememberMe});
                if (result.IsLockedOut)
                {
                    _logger.LogWarning(message: "User account locked out.");
                    return RedirectToPage(pageName: "./Lockout");
                }

                ModelState.AddModelError(key: string.Empty, errorMessage: "Invalid login attempt.");
                return Page();
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }

        public class InputModel
        {
            [Required] [EmailAddress] public string Email { get; set; }

            [Required]
            [DataType(dataType: DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "Remember me?")] public bool RememberMe { get; set; }
        }
    }
}