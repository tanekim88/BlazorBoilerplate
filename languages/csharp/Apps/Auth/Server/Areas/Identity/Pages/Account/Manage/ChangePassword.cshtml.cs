

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class ChangePasswordModel : PageModel
    {
        private readonly ILogger<ChangePasswordModel> _logger;
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public ChangePasswordModel(
            UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager,
            ILogger<ChangePasswordModel> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [BindProperty] public InputModel Input { get; set; }

        [TempData] public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            var hasPassword = await _userManager.HasPasswordAsync(user: user);
            if (!hasPassword) return RedirectToPage(pageName: "./SetPassword");

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid) return Page();

            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            var changePasswordResult =
                await _userManager.ChangePasswordAsync(user: user, currentPassword: Input.OldPassword,
                    newPassword: Input.NewPassword);
            if (!changePasswordResult.Succeeded)
            {
                foreach (var error in changePasswordResult.Errors)
                    ModelState.AddModelError(key: string.Empty, errorMessage: error.Description);
                return Page();
            }

            await _signInManager.RefreshSignInAsync(user: user);
            _logger.LogInformation(message: "User changed their password successfully.");
            StatusMessage = "Your password has been changed.";

            return RedirectToPage();
        }

        public class InputModel
        {
            [Required]
            [DataType(dataType: DataType.Password)]
            [Display(Name = "Current password")]
            public string OldPassword { get; set; }

            [Required]
            [StringLength(maximumLength: 100,
                ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.",
                MinimumLength = 6)]
            [DataType(dataType: DataType.Password)]
            [Display(Name = "New password")]
            public string NewPassword { get; set; }

            [DataType(dataType: DataType.Password)]
            [Display(Name = "Confirm new password")]
            [Compare(otherProperty: "NewPassword",
                ErrorMessage = "The new password and confirmation password do not match.")]
            public string ConfirmPassword { get; set; }
        }
    }
}