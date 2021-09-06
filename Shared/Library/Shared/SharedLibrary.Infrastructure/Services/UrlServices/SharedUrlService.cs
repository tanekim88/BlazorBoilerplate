/*%runIf: 
Data.Services.Exists(service => service.Groups[0].Name == "Url" && service.Name == "Url")
*/

//%t:begin Intro


//%t:end Intro

//%s:begin Header



using SharedLibrary.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces;
using Microsoft.Extensions.Configuration;



//%s:end Header

//%t:begin Header
//%t:end Header


namespace SharedLibrary.Infrastructure.Services.UrlSharedServices
{
    //%s:begin Attributes
    //%s:end Attributes
    public class SharedUrlService :
        /*%s:begin BaseClass*/ /*%s:end BaseClass*/
        ISharedEvalService
    {
        //%s:end Properties

        public SharedUrlService(
            /*%s:begin ConstructorParameters*/ IConfiguration configuration /*%s:end ConstructorParameters*/
        )
        {
            /*%s:begin ConstructorBody*/
            Configuration = (IConfigurationRoot) configuration;
            /*%s:end ConstructorBody*/
        }

        //%s:begin Properties
        public IConfigurationRoot Configuration { get; }

        //%s:begin Body
        public string GetUrlFromProjectName(string projectName)
        {
            return Configuration[key: $"Projects:{projectName}:Url"];
        }


        public string GetUrlForIdentityServer()
        {
            return GetUrlFromProjectName(projectName: "IdentityServer");
        }

        public string GetUrlForSolidApp()
        {
            return GetUrlFromProjectName(projectName: "SolidApp");
        }

        //%s:end Body
    }
}