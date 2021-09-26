

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
    public class ConfirmEmailChangeModel : PageModel
    {
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public ConfirmEmailChangeModel(UserManager<UserModel> userManager, SignInManager<UserModel> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [TempData] public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGetAsync(string userId, string email, string code)
        {
            if (userId == null || email == null || code == null) return RedirectToPage(pageName: "/Index");

            var user = await _userManager.FindByIdAsync(userId: userId);
            if (user == null) return NotFound(value: $"Unable to load user with ID '{userId}'.");

            code = Encoding.UTF8.GetString(bytes: WebEncoders.Base64UrlDecode(input: code));
            var result = await _userManager.ChangeEmailAsync(user: user, newEmail: email, token: code);
            if (!result.Succeeded)
            {
                StatusMessage = "Error changing email.";
                return Page();
            }

            // In our UI email and user name are one and the same, so when we update the email
            // we need to update the user name.
            var setUserNameResult = await _userManager.SetUserNameAsync(user: user, userName: email);
            if (!setUserNameResult.Succeeded)
            {
                StatusMessage = "Error changing user name.";
                return Page();
            }

            await _signInManager.RefreshSignInAsync(user: user);
            StatusMessage = "Thank you for confirming your email change.";
            return Page();
        }
    }
}