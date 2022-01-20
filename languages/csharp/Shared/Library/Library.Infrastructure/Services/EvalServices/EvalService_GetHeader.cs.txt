

using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public async Task<GetHeaderOutput> GetHeader(
            string templateId,
            StringBuilder builder
        )
        {
            var assemblyPaths = _templateService.GetRequiredAssemblyPaths().Payload.Select(selector: p =>
            {
                return @$"<#@ assembly name=""{p}"" #>";
            });

            var namespaces = _templateService.GetUsedNamepaces().Payload.Select(selector: p =>
            {
                return @$"<#@ import namespace=""{p}"" #>";
            });

            if (!string.IsNullOrEmpty(value: templateId)) builder.Append(value: $@"<# //{templateId} #>");

            builder.Append(value: @$"
<#@ template debug=""true"" hostspecific=""true"" language=""C#"" #>
<#@ output encoding=""utf-8""#>
{string.Join(separator: "\n", values: assemblyPaths)}
{string.Join(separator: "\n", values: namespaces)}

<# // System.Diagnostics.Debugger.Launch(); #>
<# var Cache = new System.Collections.Concurrent.ConcurrentDictionary<string, object>(); #>
");

            return new GetHeaderOutput
            {
                Builder = builder
            };
        }
    }
}