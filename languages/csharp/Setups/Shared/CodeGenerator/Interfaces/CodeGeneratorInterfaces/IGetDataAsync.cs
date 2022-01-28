using System.Threading.Tasks;

namespace CodeGenerator.Interfaces.CodeGeneratorInterfaces
{
    public interface IGetDataAsync<TData>
    {
        Task<TData> GetDataAsync();

    }
}
