//%s:begin Header



using System;
using SharedPresentation.Application.Interfaces.MatherialThemeServiceInterfaces;



//%s:end Header


namespace Presentation.Infrastructure.Shared.Services.MaterialServices
{
    //%s:begin Attributes
    //%s:end Attributes
    public class MaterialThemeSharedUiService :
        /*%s:begin BaseClass*/ /*%s:end BaseClass*/
        IMaterialThemeSharedUiService
    {
        //%s:end Properties


        //%s:begin Properties
        public string CurrentTheme { get; set; } = "default-theme";

        //%s:begin Body


        public event Action OnThemeChange;

        public void SetTheme(string value)
        {
            CurrentTheme = value;
            NotifyStateChanged();
        }

        private void NotifyStateChanged()
        {
            OnThemeChange?.Invoke();
        }

        //%s:end Body
    }
}