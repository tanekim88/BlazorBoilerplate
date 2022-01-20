

using System.Collections.Generic;
using System.Threading.Tasks;



namespace SharedLibrary.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces
{
    public interface ISharedTemplateService
    {
        //GetRequiredAssemblyPathsOutput GetRequiredAssemblyPaths();

        //GetUsedNamepacesOutput GetUsedNamepaces();

        Task<ParseTemplateOutput> ParseTemplate<TArgs>(string inputContent, string outputFile, TArgs args);

        //public record GetRequiredAssemblyPathsOutput
        //{
        //    public List<string> Payload { get; set; }
        //}

        //public record GetUsedNamepacesOutput
        //{
        //    public List<string> Payload { get; set; }
        //}

        public record ParseTemplateOutput
        {
            public bool Success { get; init; }
            public string OutputContent { get; set; }
        }
    }
}