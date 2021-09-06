

using System;
using System.IO;
using System.Threading.Tasks;
using SharedAuth.Application.Dtos.AuthDtos;
using SolidApp.Client.Components.ValidationComponents;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.Extensions.Logging;



namespace SolidApp.Client.Pages.AccountPages
{
    public class RegisterPageBase : ComponentBase
    {
        public CustomValidator customValidator;
        public EditContext editContext;


        public bool formDisabled;
        public RegisterDto registerInput;
        [Inject] protected NavigationManager NavigationManager { get; set; }

        [Inject] protected ILogger<RegisterPageBase> Logger { get; set; }
        //protected IEnumerable<AuthenticationScheme> externalLogins = new List<AuthenticationScheme>();

        protected override async Task OnInitializedAsync()
        {
            //externalLogins = await IdentityService.GetExternalAuthenicationSchemes();

            registerInput = new RegisterDto
            {
                ReturnUrl = Path.Combine(path1: NavigationManager.BaseUri, path2: "account/email-confirmed")
            };

            editContext = new EditContext(model: registerInput);
            editContext.OnFieldChanged += HandleFieldChanged;
        }

        private void HandleFieldChanged(object sender, FieldChangedEventArgs e)
        {
            formDisabled = !editContext.Validate();
            //StateHasChanged();
        }

        public void Dispose()
        {
            editContext.OnFieldChanged -= HandleFieldChanged;
        }

        public async Task OnSubmit(EditContext editContext)
        {
            customValidator.ClearErrors();

            try
            {
                var isValid = editContext.Validate();

                if (isValid)
                    Console.WriteLine(value: editContext);

                //var response = await IdentityService.Register(new RegisterInput { Payload = (RegisterInput)editContext.Model });
                //var httpResponse = response.HttpResult;
                //var errors = await httpResponse.Content
                //    .ReadFromJsonAsync<Dictionary<string, List<string>>>();

                //if (httpResponse.StatusCode == HttpStatusCode.BadRequest &&
                //    errors.Count() > 0)
                //{
                //    customValidator.DisplayErrors(errors);
                //}
                //else if (!httpResponse.IsSuccessStatusCode)
                //{
                //    throw new HttpRequestException(
                //        $"Validation failed. Status Code: {httpResponse.StatusCode}");
                //}
                //else
                //{
                //    NavigationManager.NavigateTo("account/RegisterConfirmation");
                //    // formDisabled = true;
                //    // messageStyles = "color:green";
                //    // message = "The form has been processed.";
                //}
            }
            catch (AccessTokenNotAvailableException ex)
            {
                ex.Redirect();
            }
            catch (Exception ex)
            {
                Logger.LogError(message: "Form processing error: {Message}", ex.Message);
                // formDisabled = true;
                // messageStyles = "color:red";
                // message = "There was an error processing the form.";
            }
        }
    }
}