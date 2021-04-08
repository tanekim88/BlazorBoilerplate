

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
    public class ForgotPasswordModel : PageModel
    {
        private readonly IEmailSender _emailSender;
        private readonly UserManager<UserModel> _userManager;

        public ForgotPasswordModel(UserManager<UserModel> userManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [BindProperty] public InputModel Input { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(email: Input.Email);
                if (user == null || !await _userManager.IsEmailConfirmedAsync(user: user))
                    // Don't reveal that the user does not exist or is not confirmed
                    return RedirectToPage(pageName: "./ForgotPasswordConfirmation");

                // For more information on how to enable account confirmation and password reset please 
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user: user);
                code = WebEncoders.Base64UrlEncode(input: Encoding.UTF8.GetBytes(s: code));
                var callbackUrl = Url.Page(
                    pageName: "/Account/ResetPassword",
                    pageHandler: null,
                    values: new {area = "Identity", code, email = Input.Email},
                    protocol: Request.Scheme);

                await _emailSender.SendEmailAsync(
                    email: Input.Email,
                    subject: "Reset Password",
                    htmlMessage:
                    $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(value: callbackUrl)}'>clicking here</a>.");

                return RedirectToPage(pageName: "./ForgotPasswordConfirmation");
            }

            return Page();
        }

        public class InputModel
        {
            [Required] [EmailAddress] public string Email { get; set; }
        }
    }
}