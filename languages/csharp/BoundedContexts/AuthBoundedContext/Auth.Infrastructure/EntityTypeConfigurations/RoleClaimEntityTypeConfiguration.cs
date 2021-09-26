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
    public class RoleClaimEntityTypeConfiguration : EntityTypeConfigurationBase<RoleClaim, RoleClaimId>, IEntityTypeConfiguration<RoleClaim>
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<RoleClaim> builder)
        {
            base.Configure(builder);
            /*%s:begin Body*/
            // Primary key 
            builder.HasKey(keyExpression: rc => rc.Id);
            // Maps to the AspNetRoleClaims table
            builder.ToTable(name: "AspNetRoleClaims");
            builder.HasOne(navigationExpression: pt => pt.Role).WithMany(navigationExpression: t => t.RoleClaims).HasForeignKey(foreignKeyExpression: pt => pt.RoleId);
        /*%s:end Body*/
        }
    }
}