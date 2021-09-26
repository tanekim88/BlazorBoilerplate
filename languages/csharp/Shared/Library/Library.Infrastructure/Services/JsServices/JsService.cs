/*%s:begin Header*/



using System.Collections.Generic;
using System.Threading.Tasks;
using Jint;
using Library.Application.Interfaces.ServiceInterfaces.JsServiceInterfaces;



/*%s:end Header*/

namespace Library.Infrastructure.Services.JsServices
{
    public class JsService : IJsService
    {
        public async Task<ExecuteOutput<T>> ExecuteAsync<T>(string code, Dictionary<string, object> parameters)
        {
            var engine = new Engine();

            if (parameters != null)
                foreach (var kv in parameters)
                    engine = engine.SetValue(name: kv.Key, obj: kv.Value);

            var result = engine.Execute(source: code).GetCompletionValue().ToObject();

            return new ExecuteOutput<T> {Result = (T) result};
        }
        /*%s:begin Body*/


        public record ExecuteOutput<T>
        {
            public T Result { get; set; }
        }

        /*%s:end Body*/
    }
}