using System.Threading.Tasks;



namespace SharedLibrary.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces
{
    public interface ISharedTemplateService
    {

        public record ParseTemplateOutput
        {
            public bool Success { get; init; }
            public string OutputContent { get; set; }
        }

        Task<ParseTemplateOutput> ParseTemplate<TArgs>(string inputContent, TArgs data);


    }
}