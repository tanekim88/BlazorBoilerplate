/*%runIf: 
Data.Services.Exists(service => service.Groups[0].Name == "IdGenerator" && service.Name == "ObjectIdGenerator")
*/

namespace CodeGenerator.Shared.Services.IdGeneratorServices
{
    public interface IObjectIdGeneratorService
    {
    }
}