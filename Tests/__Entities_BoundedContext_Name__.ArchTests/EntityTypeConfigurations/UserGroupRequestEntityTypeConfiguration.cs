/*%s:begin Header*/

using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

/*%s:end Header*/
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.EntityTypeConfigurations
{
    public class UserGroupRequestEntityTypeConfiguration : EntityTypeConfigurationBase<UserGroupRequest, UserGroupRequestId>, IEntityTypeConfiguration<UserGroupRequest>
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<UserGroupRequest> builder)
        {
            base.Configure(builder);
        /*%s:begin Body*/
        /*%s:end Body*/
        }
    }
}