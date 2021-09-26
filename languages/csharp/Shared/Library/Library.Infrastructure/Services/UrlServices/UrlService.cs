//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Url" && service.Name == "Url")

//%t:begin Intro


//%t:end Intro

//%s:begin Header



using Library.Application.Interfaces.ServiceInterfaces.UrlServiceInterfaces;
using SharedLibrary.Infrastructure.Services.UrlSharedServices;
using Microsoft.Extensions.Configuration;



//%s:end Header


namespace Library.Infrastructure.Services.UrlServices
{
    public /*%s:begin Partial*/ /*%s:end Partial*/ class UrlService
        : /*%s:begin BaseClass*/SharedLibrary.Infrastructure.Services.UrlSharedServices.SharedUrlService /*%s:end BaseClass*/
            ,
            IUrlService
    {
        /*%s:end Properties*/

        public UrlService(
            /*%s:begin ConstructorParameters*/
            IConfiguration configuration
            /*%s:end ConstructorParameters*/
        ) : base( /*%s:begin BaseArguments*/configuration: configuration /*%s:end BaseArguments*/)
        {
            /*%s:begin ConstructorBody*/
            Configuration = (IConfigurationRoot) configuration;
            /*%s:end ConstructorBody*/
        }

        /*%s:begin Properties*/
        public IConfigurationRoot Configuration { get; }


        //%s:begin Body
        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}