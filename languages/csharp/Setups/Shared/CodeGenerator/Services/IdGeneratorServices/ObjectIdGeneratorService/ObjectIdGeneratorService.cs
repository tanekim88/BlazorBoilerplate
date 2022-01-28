/*%runIf: 
Services.Exists(service => service.Groups[0].Name == "IdGenerator" && service.Name == "ObjectIdGenerator")
*/

//%t:begin Intro


//%t:end Intro

//%s:begin Header
using SharedCore.Domain.Attributes.ServiceAttributes;
using SharedLibrary.Application.StringEnums.ServiceLifetimeStringEnums;
using System;
using System.Runtime.Serialization;
//%s:end Header


//%t:begin Header
//%t:end Header


namespace CodeGenerator.Shared.Services.IdGeneratorServices
{
    //%s:begin Attributes
    [ServiceLifetime(name: ServiceLifetimeStringEnum.Singleton)]
    //%s:end Attributes
    public class ObjectIdGeneratorService :
        /*%s:begin BaseClass*/ /*%s:end BaseClass*/
        IObjectIdGeneratorService
    {
        private static readonly string l = "";

        //%s:begin Body
        private readonly ObjectIDGenerator _gen = new();
        //%s:begin Properties
        //%s:end Properties


        public string GetId(object obj)
        {
            if (obj.GetType().IsValueType) throw new Exception(message: "VVV");

            lock (l)
            {
                return _gen.GetId(obj: obj, firstTime: out var firstTime).ToString();
            }
        }

        //%s:end Body
    }
}