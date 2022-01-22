

using Scriban;
using Scriban.Parsing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public async Task<EvaluateExpressionOutput<TReturn>> Evaluate<Targs ,TReturn>(
            string code,
            Targs data
        )
        {            
            var lexerOptions = new LexerOptions() { Mode = ScriptMode.ScriptOnly };
            // Notice that code is not enclosed by `{{` and `}}`
            var template = Template.Parse(code, lexerOptions: lexerOptions);
            // Renders it with the specified parameter
            var result = template.Evaluate(data);
            // Prints 11
            var converted = (TReturn) Convert.ChangeType(value: result, conversionType: typeof(TReturn));
            
            return new EvaluateExpressionOutput<TReturn> {Payload = converted};
        }
    }
}