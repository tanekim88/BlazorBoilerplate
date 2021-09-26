

using System;



namespace SharedPresentation.Application.Interfaces.MatherialThemeServiceInterfaces
{
    public interface IMaterialThemeSharedUiService
    {
        string CurrentTheme { get; set; }

        event Action OnThemeChange;
        
        void SetTheme(string value);
    }
}