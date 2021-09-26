

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;



namespace Auth.Server.Areas.Identity.Pages.Account.Manage
{
    public class DownloadPersonalDataModel : PageModel
    {
        private readonly ILogger<DownloadPersonalDataModel> _logger;
        private readonly UserManager<UserModel> _userManager;

        public DownloadPersonalDataModel(
            UserManager<UserModel> userManager,
            ILogger<DownloadPersonalDataModel> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(principal: User);
            if (user == null)
                return NotFound(value: $"Unable to load user with ID '{_userManager.GetUserId(principal: User)}'.");

            _logger.LogInformation(message: "User with ID '{UserId}' asked for their personal data.",
                _userManager.GetUserId(principal: User));

            // Only include personal data for download
            var personalData = new Dictionary<string, string>();
            var personalDataProps = typeof(UserModel).GetProperties().Where(
                predicate: prop => Attribute.IsDefined(element: prop, attributeType: typeof(PersonalDataAttribute)));
            foreach (var p in personalDataProps)
                personalData.Add(key: p.Name, value: p.GetValue(obj: user)?.ToString() ?? "null");

            var logins = await _userManager.GetLoginsAsync(user: user);
            foreach (var l in logins)
                personalData.Add(key: $"{l.LoginProvider} external login provider key", value: l.ProviderKey);

            Response.Headers.Add(key: "Content-Disposition", value: "attachment; filename=PersonalData.json");
            return new FileContentResult(fileContents: JsonSerializer.SerializeToUtf8Bytes(value: personalData),
                contentType: "application/json");
        }
    }
}