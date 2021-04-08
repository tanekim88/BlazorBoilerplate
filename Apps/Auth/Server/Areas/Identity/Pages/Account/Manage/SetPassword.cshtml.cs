

using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SharedCore.Application.Models;
using SharedAuth.Application.Models.EntityModels;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class SetPasswordModel : PageModel
    {
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public SetPasswordModel(
            UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [BindProperty] public InputModel Input { get; set; }

        [TempData] public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            var hasPassword = await _userManager.HasPasswordAsync(user: user);

            if (hasPassword) return RedirectToPage(pageName: "./ChangePassword");

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid) return Page();

            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            var addPasswordResult = await _userManager.AddPasswordAsync(user: user, password: Input.NewPassword);
            if (!addPasswordResult.Succeeded)
            {
                foreach (var error in addPasswordResult.Errors)
                    ModelState.AddModelError(key: string.Empty, errorMessage: error.Description);
                return Page();
            }

            await _signInManager.RefreshSignInAsync(user: user);
            StatusMessage = "Your password has been set.";

            return RedirectToPage();
        }

        public class InputModel
        {
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