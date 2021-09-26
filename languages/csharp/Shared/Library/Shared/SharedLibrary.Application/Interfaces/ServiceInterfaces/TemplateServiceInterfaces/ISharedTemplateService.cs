

using System.Collections.Generic;
using System.Threading.Tasks;



namespace SharedLibrary.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces
{
    public interface ISharedTemplateService
    {
        GetRequiredAssemblyPathsOutput GetRequiredAssemblyPaths();

        GetUsedNamepacesOutput GetUsedNamepaces();

        Task<ParseTemplateOutput> ParseTemplate(string inputFile, string inputContent, string outputFile,
            bool preserveInputOnSucess = true, bool preserveOutputOnSucess = true);

        public record GetRequiredAssemblyPathsOutput
        {
            public List<string> Payload { get; set; }
        }

        public record GetUsedNamepacesOutput
        {
            public List<string> Payload { get; set; }
        }

        public record ParseTemplateOutput
        {
            public bool Success { get; init; }
            public string OutputContent { get; set; }
        }
    }
}