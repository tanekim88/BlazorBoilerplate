/*%runIf: 
Data.Services.Exists(service => service.Groups[0].Name == "Eval" && service.Name == "Eval")
*/

//%t:begin Intro


//%t:end Intro

//%s:begin Header
//%s:end Header

//%t:begin Header
//%t:end Header



using SharedLibrary.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces;



namespace SharedLibrary.Infrastructure.Services.EvalSharedServices
{
    //%s:begin Attributes
    //%s:end Attributes
    public class SharedEvalService :
        /*%s:begin BaseClass*/ /*%s:end BaseClass*/
        ISharedEvalService
    {
        //%s:begin Properties
        //%s:end Properties


        public EvalOutput<T> Eval<T>(string expression)
        {
            return new() {Payload = default};
        }

        //%s:begin Body

        public record EvalOutput<T>
        {
            public T Payload { get; init; }
        }

        //%s:end Body
    }
}