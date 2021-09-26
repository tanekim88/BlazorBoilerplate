

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SharedAuth.Application.Models.EntityModels;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class IndexModel : PageModel
    {
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public IndexModel(
            UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public string Username { get; set; }

        [TempData] public string StatusMessage { get; set; }

        [BindProperty] public InputModel Input { get; set; }

        private async Task LoadAsync(UserModel user)
        {
            var userName = await _userManager.GetUserNameAsync(user: user);
            var phoneNumber = await _userManager.GetPhoneNumberAsync(user: user);

            Username = userName;

            Input = new InputModel
            {
                PhoneNumber = phoneNumber
            };
        }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            await LoadAsync(user: user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            if (!ModelState.IsValid)
            {
                await LoadAsync(user: user);
                return Page();
            }

            var phoneNumber = await _userManager.GetPhoneNumberAsync(user: user);
            if (Input.PhoneNumber != phoneNumber)
            {
                var setPhoneResult = await _userManager.SetPhoneNumberAsync(user: user, phoneNumber: Input.PhoneNumber);
                if (!setPhoneResult.Succeeded)
                {
                    StatusMessage = "Unexpected error when trying to set phone number.";
                    return RedirectToPage();
                }
            }

            await _signInManager.RefreshSignInAsync(user: user);
            StatusMessage = "Your profile has been updated";
            return RedirectToPage();
        }


        public async Task<IActionResult> OnPostCloseStatusMessage()
        {
            StatusMessage = null;
            return RedirectToPage();
        }

        public class InputModel
        {
            [Phone]
            [Display(Name = "Phone number")]
            public string PhoneNumber { get; set; }
        }
    }
}