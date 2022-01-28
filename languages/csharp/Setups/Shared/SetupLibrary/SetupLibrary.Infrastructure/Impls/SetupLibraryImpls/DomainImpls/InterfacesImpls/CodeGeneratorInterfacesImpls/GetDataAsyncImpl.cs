using SetupLibrary.Application.Models;
using SetupLibrary.Domain.Interfaces.CodeGeneratorInterfaces;
using System.Threading.Tasks;

namespace SetupLibrary.Infrastructure.Impls.SetupLibraryImpls.DomainImpls.InterfacesImpls.CodeGeneratorInterfacesImpls
{
    public class GetDataAsyncImpl : IGetDataAsync<TemplateData>
    {
        public Task<TemplateData> GetDataAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
