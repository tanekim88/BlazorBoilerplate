

using System;
using System.Threading.Tasks;
using SharedAuth.Application.Dtos.AuthDtos;
using BlazorApp.Client.Components.ValidationComponents;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.Extensions.Logging;



namespace BlazorApp.Client.Pages.AccountPages
{
    public class LoginPageBase : ComponentBase
    {
        public CustomValidator customValidator;
        private EditContext editContext;


        private bool formDisabled;
        protected LoginDto loginInput;

        [Inject] protected NavigationManager NavigationManager { get; set; }
        [Inject] protected ILogger<LoginPageBase> Logger { get; set; }

        protected override void OnInitialized()
        {
            loginInput = new LoginDto
            {
                ReturnUrl = NavigationManager.BaseUri
            };
            editContext = new EditContext(model: loginInput);
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
                //Console.WriteLine(editContext);
                //var response = await IdentityService.Login(new LoginInput { Payload = editContext.Model });
                //var httpResult = response.HttpResult;
                //var errors = await httpResult.Content
                //    .ReadFromJsonAsync<Dictionary<string, List<string>>>();

                //if (httpResult.StatusCode == HttpStatusCode.BadRequest &&
                //    errors.Count() > 0)
                //{
                //    customValidator.DisplayErrors(errors);
                //}
                //else if (!httpResult.IsSuccessStatusCode)
                //{
                //    throw new HttpRequestException(
                //        $"Validation failed. Status Code: {httpResult.StatusCode}");
                //}
                //else
                //{
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