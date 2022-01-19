

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using SharedCore.Application.Models;
using SharedAuth.Application.Models.EntityModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System;
using System.Threading;

namespace Auth.Server.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private readonly IEmailSender _emailSender;
        private readonly UserManager<UserModel> _userManager;
        private readonly IUserStore<UserModel> _userStore;
        private readonly IUserEmailStore<UserModel> _emailStore;
        private readonly ILogger<RegisterModel> _logger;
        private readonly SignInManager<UserModel> _signInManager;

        public RegisterModel(
            UserManager<UserModel> userManager,
            IUserStore<UserModel> userStore,
            SignInManager<UserModel> signInManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
        }

        [BindProperty] public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public async Task OnGetAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
                var user = CreateUser();
                //user.GlobalId = Guid.NewGuid().ToString();
                await _userStore.SetUserNameAsync(user, Input.Email, CancellationToken.None);
                await _emailStore.SetEmailAsync(user, Input.Email, CancellationToken.None);

                var result = await _userManager.CreateAsync(user: user, password: Input.Password);
                if (result.Succeeded)
                {

                    var userId = await _userManager.GetUserIdAsync(user);
                    _logger.LogInformation(message: "User created a new account with password.");
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user: user);
                    code = WebEncoders.Base64UrlEncode(input: Encoding.UTF8.GetBytes(s: code));

                    //string? callbackUrl = null;
                    //if (returnUrl.StartsWith("http"))
                    //{
                    //    var uriBuilder = new UriBuilder(returnUrl);
                    //    var parameters = HttpUtility.ParseQueryString(string.Empty);
                    //    parameters["userId"] = user.Id.ToString();
                    //    parameters["code"] = code;
                    //    uriBuilder.Query = parameters.ToString();
                    //    callbackUrl = uriBuilder.Uri.ToString();
                    //}
                    //else
                    //{
                    //    callbackUrl = Url.Page(
                    //        "/Account/ConfirmEmail",
                    //        pageHandler: null,
                    //        values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                    //        protocol: Request.Scheme);
                    //}


                    //if (!System.Text.RegularExpressions.Regex.IsMatch(returnUrl, @"^https?:"))
                    //{
                    //    var host = new Uri(Request.Scheme + "://" + Request.Host);
                    //    returnUrl = new Uri(host, returnUrl).ToString();
                    //}

                    var callbackUrl = Url.Page(
                        pageName: "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { area = "Identity", userId = userId, code, returnUrl },
                        protocol: Request.Scheme);

                    await _emailSender.SendEmailAsync(email: Input.Email, subject: "Confirm your email",
                        htmlMessage:
                        $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(value: callbackUrl)}'>clicking here</a>.");

                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        return RedirectToPage("RegisterConfirmation", new { email = Input.Email, returnUrl = returnUrl });
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return LocalRedirect(returnUrl);
                    }
                }

                foreach (var error in result.Errors)
                    ModelState.AddModelError(key: string.Empty, errorMessage: error.Description);
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [StringLength(maximumLength: 100,
                ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.",
                MinimumLength = 6)]
            [DataType(dataType: DataType.Password)]
            [Display(Name = "Password")]
            public string Password { get; set; }

            [DataType(dataType: DataType.Password)]
            [Display(Name = "Confirm password")]
            [Compare(otherProperty: "Password", ErrorMessage = "The password and confirmation password do not match.")]
            public string ConfirmPassword { get; set; }
        }

        private UserModel CreateUser()
        {
            try
            {
                return Activator.CreateInstance<UserModel>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(UserModel)}'. " +
                    $"Ensure that '{nameof(UserModel)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        private IUserEmailStore<UserModel> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<UserModel>)_userStore;
        }
    }
}