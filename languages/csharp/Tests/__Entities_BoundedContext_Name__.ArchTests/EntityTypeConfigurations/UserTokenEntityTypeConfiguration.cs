/*%s:begin Header*/
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
/*%s:end Header*/
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Infrastructure.EntityTypeConfigurations
{
    public class UserTokenEntityTypeConfiguration : EntityTypeConfigurationBase<UserToken, UserTokenId>, IEntityTypeConfiguration<UserToken>
    {
        /*%s:begin Properties*/
        private static readonly int maxKeyLength = 128;
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<UserToken> builder)
        {
            base.Configure(builder);
            /*%s:begin Body*/
            // Composite primary key consisting of the UserId, LoginProvider and Name
            builder.HasKey(keyExpression: t => new
            {
            t.UserId, t.LoginProvider, t.Name
            });
            // Limit the size of the composite key columns due to common DB restrictions
            if (maxKeyLength > 0)
            {
                builder.Property(propertyExpression: t => t.LoginProvider).HasMaxLength(maxLength: maxKeyLength);
                builder.Property(propertyExpression: t => t.Name).HasMaxLength(maxLength: maxKeyLength);
            }

            // Maps to the AspNetUserTokens table
            builder.ToTable(name: "AspNetUserTokens");
            builder.HasOne(navigationExpression: t => t.User).WithMany(navigationExpression: u => u.UserTokens).HasForeignKey(foreignKeyExpression: u => u.UserId);
        /*%s:end Body*/
        }
    }
}