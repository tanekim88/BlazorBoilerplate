

using Microsoft.Extensions.Configuration;



namespace SharedLibrary.Application.Interfaces.ServiceInterfaces.UrlServiceInterfaces
{
    public interface ISharedUrlService
    {
        IConfigurationRoot Configuration { get; }

        string GetUrlForSolidApp();
        string GetUrlForIdentityServer();
        string GetUrlFromProjectName(string projectName);
    }
}