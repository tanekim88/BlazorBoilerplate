//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Regex" && service.Name == "Regex")

//%t:begin Intro


//%t:end Intro

//%s:begin Header
//%s:end Header



using Library.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces;



namespace Library.Infrastructure.Services.RegexServices
{
    public /*%s:begin Partial*/ /*%s:end Partial*/ class RegexService
        : /*%s:begin BaseClass*/ /*%s:end BaseClass*/
            IRegexService
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/


        //%s:begin Body
        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}