

using System;
using System.Threading.Tasks;
using Material.Blazor;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.JSInterop;
using SharedPresentation.Application.Interfaces.MatherialThemeServiceInterfaces;



namespace BlazorApp.Client.Shared.Layouts
{
    public class MainLayoutBase : LayoutComponentBase, IDisposable
    {

        private int _tabIndex = 0;
        public int TabIndex
        {
            get => _tabIndex;
            set
            {
                if (value != _tabIndex)
                {
                    _tabIndex = value;

                }
            }
        }

        public bool StackIcons { get; set; } = false;

        public string[] TabLabels { get; set; } = { "cat", "dog", "horse-head", "dove", "hippo", "kiwi-bird", "dragon" };

        [Inject] public IMaterialThemeSharedUiService MaterialThemeSharedUiService { get; set; }
        //[Inject] private IMBAnimatedNavigationManager AnimatedNavigationService { get; set; }
        [Inject] private IJSRuntime JsRuntime { get; set; }
        [Inject] private NavigationManager Navigation { get; set; }
        [Inject] private SignOutSessionStateManager SignOutManager { get; set; }



        public bool IsActive(string href, NavLinkMatch navLinkMatch = NavLinkMatch.Prefix)
        {
            var relativePath = Navigation.ToBaseRelativePath(Navigation.Uri).ToLower();
            return navLinkMatch == NavLinkMatch.All ? relativePath == href.ToLower() : relativePath.StartsWith(href.ToLower());
        }
        public string GetTabIndActive(string href, NavLinkMatch navLinkMatch = NavLinkMatch.Prefix) => IsActive(href, navLinkMatch) ? "mdc-tab-indicator--active" : "";

        public MBDrawer Drawer { get; set; }

        public MBMenu Menu { get; set; }

        public void Dispose()
        {
            MaterialThemeSharedUiService.OnThemeChange -= StateHasChanged;
        }
        //[CascadingParameter] public CascadingThemeState CascadingThemeState { get; set;}

        public async Task BeginSignOut(MouseEventArgs args)
        {
            await SignOutManager.SetSignOutState();
            Navigation.NavigateTo(uri: "authentication/logout");
        }

        protected override Task OnInitializedAsync()
        {
            MaterialThemeSharedUiService.OnThemeChange += StateHasChanged;
            Navigation.LocationChanged += (s, e) => StateHasChanged();
            return base.OnInitializedAsync();
        }


        public async Task OpenMenuAsync()
        {
            await Menu.ToggleAsync();
        }

        protected async Task ThemeSetterAsync(string theme)
        {
            //CascadingThemeState.SetTheme(theme);
        }


        public void ListItemClickHandler(string NavigationReference)
        {
            Drawer.NotifyNavigation();
            //AnimatedNavigationService.NavigateTo(uri: NavigationReference);
        }

        public void SideBarToggle()
        {
            Drawer.Toggle();
        }
    }
}