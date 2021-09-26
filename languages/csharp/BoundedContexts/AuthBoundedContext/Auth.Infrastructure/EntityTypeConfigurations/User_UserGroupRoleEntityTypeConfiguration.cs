/*%s:begin Header*/
/*%s:end Header*/
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Infrastructure.EntityTypeConfigurations
{
    public class User_UserGroupRoleEntityTypeConfiguration : EntityTypeConfigurationBase<User_UserGroupRole, User_UserGroupRoleId>, IEntityTypeConfiguration<User_UserGroupRole>
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<User_UserGroupRole> builder)
        {
            base.Configure(builder);
        /*%s:begin Body*/
        /*%s:end Body*/
        }
    }
}