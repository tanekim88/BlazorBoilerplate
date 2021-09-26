

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SharedAuth.Application.Models.EntityModels;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterConfirmationModel : PageModel
    {
        private readonly IEmailSender _sender;
        private readonly UserManager<UserModel> _userManager;

        public RegisterConfirmationModel(UserManager<UserModel> userManager, IEmailSender sender)
        {
            _userManager = userManager;
            _sender = sender;
        }

        public string Email { get; set; }

        public bool DisplayConfirmAccountLink { get; set; }

        public string EmailConfirmationUrl { get; set; }

        public async Task<IActionResult> OnGetAsync(string email, string returnUrl = null)
        {
            if (email == null) return RedirectToPage(pageName: "/Index");

            var user = await _userManager.FindByEmailAsync(email: email);
            if (user == null) return NotFound(value: $"Unable to load user with email '{email}'.");

            Email = email;

            return Page();
        }
    }
}