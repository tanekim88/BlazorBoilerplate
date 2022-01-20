

using System.Linq;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public GetTypeFromClassNameOutput GetTypeFromClassName(string className)
        {
            var splitted = className.Split(separator: Separator);
            var assemblyName = splitted[1];
            var fullName = splitted[2];
            var assembly = _assemblyService.GetAssemblyByProjectName(projectName: assemblyName).Payload;
            var toReturn = assembly.GetTypes().Where(predicate: t => t.FullName == fullName).FirstOrDefault();

            return new GetTypeFromClassNameOutput {Type = toReturn};
        }
    }
}