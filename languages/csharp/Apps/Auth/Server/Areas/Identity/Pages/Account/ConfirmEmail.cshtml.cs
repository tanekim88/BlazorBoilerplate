

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using SharedAuth.Application.Models.EntityModels;
using System.Text;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ConfirmEmailModel : PageModel
    {
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;


        public ConfirmEmailModel(
            UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [BindProperty] public string? ReturnUrl { get; set; }

        [TempData] public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGetAsync(string userId, string code, string? returnUrl = null)
        {
            if (userId == null || code == null) return RedirectToPage(pageName: "/Index");

            var user = await _userManager.FindByIdAsync(userId: userId);

            if (user == null) return NotFound(value: $"Unable to load user with ID '{userId}'.");

            code = Encoding.UTF8.GetString(bytes: WebEncoders.Base64UrlDecode(input: code));
            var result = await _userManager.ConfirmEmailAsync(user: user, token: code);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user: user, isPersistent: false);
                ReturnUrl = returnUrl;
                StatusMessage = "Thank you for confirming your email.";
            }
            else
            {
                StatusMessage = "Error confirming your email.";
            }

            return Page();
        }
    }
}