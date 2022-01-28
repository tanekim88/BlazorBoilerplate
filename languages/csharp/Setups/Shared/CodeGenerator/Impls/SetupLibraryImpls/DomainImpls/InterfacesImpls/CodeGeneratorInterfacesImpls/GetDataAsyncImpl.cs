using CodeGenerator.Models;
using CodeGenerator.Interfaces.CodeGeneratorInterfaces;
using System.Threading.Tasks;

namespace CodeGenerator.Impls.SetupLibraryImpls.DomainImpls.InterfacesImpls.CodeGeneratorInterfacesImpls
{
    public class GetDataAsyncImpl : IGetDataAsync<TemplateData>
    {
        public Task<TemplateData> GetDataAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
