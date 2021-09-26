//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Assembly" && service.Name == "Assembly")

//%t:begin Intro


//%t:end Intro

//%s:begin Header
//%s:end Header



using Library.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces;
using SharedLibrary.Infrastructure.Services.AssemblyServices;



namespace Library.Infrastructure.Services.AssemblyServices
{
    public
        /*%s:begin Partial*/ /*%s:end Partial*/
        class AssemblyService
        : /*%s:begin BaseClass*/ SharedLibrary.Infrastructure.Services.AssemblyServices.SharedAssemblyService /*%s:end BaseClass*/
            ,
            IAssemblyService
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/


        //%s:begin Body
        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}