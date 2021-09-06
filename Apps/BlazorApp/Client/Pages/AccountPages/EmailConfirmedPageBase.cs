

using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;



namespace SolidApp.Client.Pages.AccountPages
{
    public class EmailConfirmedPageBase : ComponentBase
    {
        [Inject] private NavigationManager NavigationManager { get; set; }

        protected void OnInitialized()
        {
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;

            Task.Delay(millisecondsDelay: 3000)
                .ContinueWith(continuationFunction: async t => { NavigationManager.NavigateTo(uri: ""); },
                    cancellationToken: cancellationToken);
        }
    }
}