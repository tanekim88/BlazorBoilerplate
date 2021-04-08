

using Microsoft.Extensions.Configuration;



namespace SharedLibrary.Application.Interfaces.ServiceInterfaces.UrlServiceInterfaces
{
    public interface ISharedUrlService
    {
        IConfigurationRoot Configuration { get; }

        string GetUrlForBlazorApp();
        string GetUrlForIdentityServer();
        string GetUrlFromProjectName(string projectName);
    }
}