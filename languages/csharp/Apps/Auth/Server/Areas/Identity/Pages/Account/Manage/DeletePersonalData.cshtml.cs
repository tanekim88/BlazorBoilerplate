

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class DeletePersonalDataModel : PageModel
    {
        private readonly ILogger<DeletePersonalDataModel> _logger;
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public DeletePersonalDataModel(
            UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager,
            ILogger<DeletePersonalDataModel> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [BindProperty] public InputModel Input { get; set; }

        public bool RequirePassword { get; set; }

        public async Task<IActionResult> OnGet()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            RequirePassword = await _userManager.HasPasswordAsync(user: user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            RequirePassword = await _userManager.HasPasswordAsync(user: user);
            if (RequirePassword)
                if (!await _userManager.CheckPasswordAsync(user: user, password: Input.Password))
                {
                    ModelState.AddModelError(key: string.Empty, errorMessage: "Incorrect password.");
                    return Page();
                }

            var result = await _userManager.DeleteAsync(user: user);
            var userId = await _userManager.GetUserIdAsync(user: user);
            if (!result.Succeeded)
                throw new InvalidOperationException(
                    message: $"Unexpected error occurred deleting user with ID '{userId}'.");

            await _signInManager.SignOutAsync();

            _logger.LogInformation(message: "User with ID '{UserId}' deleted themselves.", userId);

            return Redirect(url: "~/");
        }

        public class InputModel
        {
            [Required]
            [DataType(dataType: DataType.Password)]
            public string Password { get; set; }
        }
    }
}