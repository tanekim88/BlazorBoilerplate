using CodeGenerator.Interfaces.CodeGeneratorInterfaces;
using CodeGenerator.Models;
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
