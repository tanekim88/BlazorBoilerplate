

using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;



namespace BlazorApp.Client.Components.ChatGroupComponents
{
    public partial class ChatRoom
    {
        private readonly List<string> messages = new();
        private HubConnection hubConnection;
        private string messageInput;
        private string userInput;

        public bool IsConnected => true;
        // hubConnection.State == HubConnectionState.Connected;

        public async ValueTask DisposeAsync()
        {
            await hubConnection.DisposeAsync();
        }

        protected override async Task OnInitializedAsync()
        {
            hubConnection = new HubConnectionBuilder()
                .WithUrl(url: NavigationManager.ToAbsoluteUri(relativeUri: "/chathub"))
                .Build();

            hubConnection.On<string, string>(methodName: "ReceiveMessage", handler: (user, message) =>
            {
                var encodedMsg = $"{user}: {message}";
                messages.Add(item: encodedMsg);
                StateHasChanged();
            });

            await hubConnection.StartAsync();
        }

        private Task Send()
        {
            return hubConnection.SendAsync(methodName: "SendMessage", arg1: userInput, arg2: messageInput);
        }
    }
}