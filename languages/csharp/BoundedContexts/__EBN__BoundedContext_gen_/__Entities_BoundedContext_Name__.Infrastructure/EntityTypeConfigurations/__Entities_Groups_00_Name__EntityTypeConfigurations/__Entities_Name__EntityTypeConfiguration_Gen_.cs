
//%runIf: !Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.BoundedContext.Name == "__Entities_BoundedContext_Name__").ShouldNotGenerate/*%S:begin Header*/
/*%S:end Header*/


using __Entities_BoundedContext_Name__.Domain.Entities.__Entities_Groups_00_Name__Entities;
using __Entities_BoundedContext_Name__.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace __Entities_BoundedContext_Name__.Infrastructure.EntityTypeConfigurations.__Entities_Groups_00_Name__EntityTypeConfigurations
{
    public class __Entities_Name__EntityTypeConfiguration_Gen_ :
        EntityTypeConfigurationBase<__Entities_Name___Gen_, __Entities_Name__Id_Gen_>
        ,IEntityTypeConfiguration<__Entities_Name___Gen_>
    {

        /*%S:begin Properties*/
        /*%S:end Properties*/
        public void Configure(EntityTypeBuilder<__Entities_Name___Gen_> builder)
        {
            base.Configure(builder);

            /*%S:begin Body*/
            /*%S:end Body*/
        }
    }

}