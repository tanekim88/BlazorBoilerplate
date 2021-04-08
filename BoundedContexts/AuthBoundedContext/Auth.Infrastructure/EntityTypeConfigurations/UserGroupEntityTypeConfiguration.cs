/*%s:begin Header*/
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
/*%s:end Header*/
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Infrastructure.EntityTypeConfigurations
{
    public class UserGroupEntityTypeConfiguration : EntityTypeConfigurationBase<UserGroup, UserGroupId>, IEntityTypeConfiguration<UserGroup>
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<UserGroup> builder)
        {
            base.Configure(builder);
        /*%s:begin Body*/
        /*%s:end Body*/
        }
    }
}