

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ExternalLoginModel : PageModel
    {
        private readonly IEmailSender _emailSender;
        private readonly ILogger<ExternalLoginModel> _logger;
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public ExternalLoginModel(
            SignInManager<UserModel> signInManager,
            UserManager<UserModel> userManager,
            ILogger<ExternalLoginModel> logger,
            IEmailSender emailSender)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _emailSender = emailSender;
        }

        [BindProperty] public InputModel Input { get; set; }

        public string ProviderDisplayName { get; set; }

        public string ReturnUrl { get; set; }

        [TempData] public string ErrorMessage { get; set; }

        public IActionResult OnGetAsync()
        {
            return RedirectToPage(pageName: "./Login");
        }

        public IActionResult OnPost(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Page(pageName: "./ExternalLogin", pageHandler: "Callback", values: new {returnUrl});
            var properties =
                _signInManager.ConfigureExternalAuthenticationProperties(provider: provider, redirectUrl: redirectUrl);
            return new ChallengeResult(authenticationScheme: provider, properties: properties);
        }

        public async Task<IActionResult> OnGetCallbackAsync(string returnUrl = null, string remoteError = null)
        {
            returnUrl = returnUrl ?? Url.Content(contentPath: "~/");
            if (remoteError != null)
            {
                ErrorMessage = $"Error from external provider: {remoteError}";
                return RedirectToPage(pageName: "./Login", routeValues: new {ReturnUrl = returnUrl});
            }

            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                ErrorMessage = "Error loading external login information.";
                return RedirectToPage(pageName: "./Login", routeValues: new {ReturnUrl = returnUrl});
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result =
                await _signInManager.ExternalLoginSignInAsync(loginProvider: info.LoginProvider,
                    providerKey: info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                _logger.LogInformation(message: "{Name} logged in with {LoginProvider} provider.",
                    info.Principal.Identity.Name,
                    info.LoginProvider);
                return LocalRedirect(localUrl: returnUrl);
            }

            if (result.IsLockedOut) return RedirectToPage(pageName: "./Lockout");

            // If the user does not have an account, then ask the user to create an account.
            ReturnUrl = returnUrl;
            ProviderDisplayName = info.ProviderDisplayName;
            if (info.Principal.HasClaim(match: c => c.Type == ClaimTypes.Email))
                Input = new InputModel
                {
                    Email = info.Principal.FindFirstValue(claimType: ClaimTypes.Email)
                };
            return Page();
        }

        public async Task<IActionResult> OnPostConfirmationAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content(contentPath: "~/");
            // Get the information about the user from the external login provider
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                ErrorMessage = "Error loading external login information during confirmation.";
                return RedirectToPage(pageName: "./Login", routeValues: new {ReturnUrl = returnUrl});
            }

            if (ModelState.IsValid)
            {
                var user = new UserModel {UserName = Input.Email, Email = Input.Email};

                var result = await _userManager.CreateAsync(user: user);
                if (result.Succeeded)
                {
                    result = await _userManager.AddLoginAsync(user: user, login: info);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation(message: "User created an account using {Name} provider.",
                            info.LoginProvider);

                        var userId = await _userManager.GetUserIdAsync(user: user);
                        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user: user);
                        code = WebEncoders.Base64UrlEncode(input: Encoding.UTF8.GetBytes(s: code));
                        var callbackUrl = Url.Page(
                            pageName: "/Account/ConfirmEmail",
                            pageHandler: null,
                            values: new {area = "Identity", userId, code},
                            protocol: Request.Scheme);

                        await _emailSender.SendEmailAsync(email: Input.Email, subject: "Confirm your email",
                            htmlMessage:
                            $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(value: callbackUrl)}'>clicking here</a>.");

                        // If account confirmation is required, we need to show the link if we don't have a real email sender
                        if (_userManager.Options.SignIn.RequireConfirmedAccount)
                            return RedirectToPage(pageName: "./RegisterConfirmation", routeValues: new {Input.Email});

                        await _signInManager.SignInAsync(user: user, isPersistent: false,
                            authenticationMethod: info.LoginProvider);

                        return LocalRedirect(localUrl: returnUrl);
                    }
                }

                foreach (var error in result.Errors)
                    ModelState.AddModelError(key: string.Empty, errorMessage: error.Description);
            }

            ProviderDisplayName = info.ProviderDisplayName;
            ReturnUrl = returnUrl;
            return Page();
        }

        public class InputModel
        {
            [Required] [EmailAddress] public string Email { get; set; }
        }
    }
}