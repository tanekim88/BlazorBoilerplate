/*%s:begin Header*/
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
/*%s:end Header*/
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Infrastructure.EntityTypeConfigurations
{
    public class User_RoleEntityTypeConfiguration : EntityTypeConfigurationBase<User_Role, User_RoleId>, IEntityTypeConfiguration<User_Role>
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<User_Role> builder)
        {
            base.Configure(builder);
            /*%s:begin Body*/

            // Primary key
            //builder.HasKey(keyExpression: r => new
            //{
            //    r.UserId, r.RoleId
            //});

            // Maps to the AspNetUserRoles table
            builder.ToTable(name: "AspNetUserRoles");
            builder.HasOne(navigationExpression: r => r.User).WithMany(navigationExpression: u => u.User_Roles).HasForeignKey(foreignKeyExpression: u => u.UserId);
            builder.HasOne(navigationExpression: r => r.Role).WithMany(navigationExpression: u => u.Role_Users).HasForeignKey(foreignKeyExpression: u => u.RoleId);
        /*%s:end Body*/
        }
    }
}