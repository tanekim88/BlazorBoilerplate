

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using SharedAuth.Application.Models.EntityModels;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ResendEmailConfirmationModel : PageModel
    {
        private readonly IEmailSender _emailSender;
        private readonly UserManager<UserModel> _userManager;

        public ResendEmailConfirmationModel(UserManager<UserModel> userManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [BindProperty] public InputModel Input { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid) return Page();

            var user = await _userManager.FindByEmailAsync(email: Input.Email);
            if (user == null)
            {
                ModelState.AddModelError(key: string.Empty,
                    errorMessage: "Verification email sent. Please check your email.");
                return Page();
            }

            var userId = await _userManager.GetUserIdAsync(user: user);
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user: user);
            code = WebEncoders.Base64UrlEncode(input: Encoding.UTF8.GetBytes(s: code));
            var callbackUrl = Url.Page(
                pageName: "/Account/ConfirmEmail",
                pageHandler: null,
                values: new {userId, code},
                protocol: Request.Scheme);
            await _emailSender.SendEmailAsync(
                email: Input.Email,
                subject: "Confirm your email",
                htmlMessage:
                $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(value: callbackUrl)}'>clicking here</a>.");

            ModelState.AddModelError(key: string.Empty,
                errorMessage: "Verification email sent. Please check your email.");
            return Page();
        }

        public class InputModel
        {
            [Required] [EmailAddress] public string Email { get; set; }
        }
    }
}