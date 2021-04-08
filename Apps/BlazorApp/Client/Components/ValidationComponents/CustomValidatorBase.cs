

using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;



namespace BlazorApp.Client.Components.ValidationComponents
{
    public class CustomValidatorBase : ComponentBase
    {
        private ValidationMessageStore messageStore;

        [CascadingParameter] private EditContext CurrentEditContext { get; set; }

        protected override void OnInitialized()
        {
            if (CurrentEditContext == null)
                throw new InvalidOperationException(
                    message: $"{nameof(CustomValidator)} requires a cascading " +
                             $"parameter of type {nameof(EditContext)}. " +
                             $"For example, you can use {nameof(CustomValidator)} " +
                             $"inside an {nameof(EditForm)}.");

            messageStore = new ValidationMessageStore(editContext: CurrentEditContext);

            CurrentEditContext.OnValidationRequested += (s, e) =>
                messageStore.Clear();
            CurrentEditContext.OnFieldChanged += (s, e) =>
                messageStore.Clear(fieldIdentifier: e.FieldIdentifier);
        }

        public void DisplayErrors(Dictionary<string, List<string>> errors)
        {
            foreach (var err in errors)
                messageStore.Add(fieldIdentifier: CurrentEditContext.Field(fieldName: err.Key), messages: err.Value);

            CurrentEditContext.NotifyValidationStateChanged();
        }

        public void ClearErrors()
        {
            messageStore.Clear();
            CurrentEditContext.NotifyValidationStateChanged();
        }
    }
}