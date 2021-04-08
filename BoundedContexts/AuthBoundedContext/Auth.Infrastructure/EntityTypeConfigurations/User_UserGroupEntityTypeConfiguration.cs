/*%s:begin Header*/
/*%s:end Header*/
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Infrastructure.EntityTypeConfigurations
{
    public class User_UserGroupEntityTypeConfiguration : EntityTypeConfigurationBase<User_UserGroup, User_UserGroupId>, IEntityTypeConfiguration<User_UserGroup>
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<User_UserGroup> builder)
        {
            base.Configure(builder);
        /*%s:begin Body*/
        /*%s:end Body*/
        }
    }
}