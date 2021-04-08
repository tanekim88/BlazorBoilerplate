//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Serializer" && service.Name == "XmlSerializer")

//%t:begin Intro


//%t:end Intro

//%s:begin Header
//%s:end Header



using Library.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces;
using SharedLibrary.Infrastructure.Services.SerializerServices;



namespace Library.Infrastructure.Services.SerializerServices
{
    public /*%s:begin Partial*/ /*%s:end Partial*/ class XmlSerializerService
        : /*%s:begin BaseClass*/SharedLibrary.Infrastructure.Services.SerializerServices.SharedXmlSerializerService /*%s:end BaseClass*/,
            IXmlSerializerService
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/


        //%s:begin Body
        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}