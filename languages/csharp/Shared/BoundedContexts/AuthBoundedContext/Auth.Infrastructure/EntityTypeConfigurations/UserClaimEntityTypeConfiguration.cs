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
    public class UserClaimEntityTypeConfiguration : EntityTypeConfigurationBase<UserClaim, UserClaimId>, IEntityTypeConfiguration<UserClaim>
    {
        /*%s:begin Properties*/
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<UserClaim> builder)
        {
            base.Configure(builder);
            /*%s:begin Body*/
            // Primary key
            builder.HasKey(keyExpression: uc => uc.Id);
            // Maps to the AspNetUserClaims table
            builder.ToTable(name: "AspNetUserClaims");
            //Already defind in userconfig
            //builder.HasOne(navigationExpression: pt => pt.User).WithMany(navigationExpression: t => t.UserClaims).HasForeignKey(foreignKeyExpression: pt => pt.UserId);
        /*%s:end Body*/
        }
    }
}