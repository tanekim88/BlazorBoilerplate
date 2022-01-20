/*%S:begin Header*/
/*%S:end Header*/

using Auth.Domain.Entities.__Entities_Groups_00_Name__Entities;
using Auth.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
using Mapster;
using SharedAuth.Application.Models.EntityModels.__Entities_Groups_00_Name__Models;
using SharedCore.Domain.Bases.MapperBases;

namespace Auth.Application.__Entities_Groups_00_Name__Mappers.ModelToEntityMappers
{
    public class __Entities_Name__ModelToEntityMapper_AuthGen_
    {
        public static void Configure()
        {
            TypeAdapterConfig<__Entities_Name__Model, __Entities_Name___AuthGen_>
                 .NewConfig()
                     .Map(dest => dest.Id,
                    src => src.Id == 0 ? new __Entities_Name__Id_AuthGen_(null) :
                    new __Entities_Name__Id_AuthGen_(src.Id));
        }
    }
}