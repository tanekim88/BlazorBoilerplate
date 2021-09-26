/*%runIf: 
Data.Services.Exists(service => service.Groups[0].Name == "IdGenerator" && service.Name == "ObjectIdGenerator")
*/

namespace SetupLibrary.Infrastructure.Shared.Services.IdGeneratorServices
{
    public interface IObjectIdGeneratorService
    {
    }
}