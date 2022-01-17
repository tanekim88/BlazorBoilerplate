using System.Text.Json;

namespace BlazorApp.Client.States
{
    public class AppState
    {
        public int CounterValue { get; set; }

        public string GetStateForLocalStorage()
        {
            return JsonSerializer.Serialize(this);
        }

        public void SetStateFromLocalStorage(string locallyStoredState)
        {
            var deserializedState =
                JsonSerializer.Deserialize<AppState>(locallyStoredState);

            CounterValue = deserializedState.CounterValue;
        }
    }
}
