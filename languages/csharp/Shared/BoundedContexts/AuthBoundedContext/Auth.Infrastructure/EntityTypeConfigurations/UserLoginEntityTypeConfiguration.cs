/*%s:begin Header*/
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
/*%s:end Header*/
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Infrastructure.EntityTypeConfigurations
{
    public class UserLoginEntityTypeConfiguration : EntityTypeConfigurationBase<UserLogin, UserLoginId>, IEntityTypeConfiguration<UserLogin>
    {
        /*%s:begin Properties*/
        private static readonly int maxKeyLength = 128;
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<UserLogin> builder)
        {
            base.Configure(builder);
            /*%s:begin Body*/
            // Composite primary key consisting of the LoginProvider and the key to use
            // with that provider

            //builder.HasKey(keyExpression: l => new
            //{
            //    l.LoginProvider,
            //    l.ProviderKey
            //});

            if (maxKeyLength > 0)
            {
                // Limit the size of the composite key columns due to common DB restrictions
                builder.Property(propertyExpression: l => l.LoginProvider).HasMaxLength(maxLength: 128);
                builder.Property(propertyExpression: l => l.ProviderKey).HasMaxLength(maxLength: 128);
            }

            // Maps to the AspNetUserLogins table
            builder.ToTable(name: "AspNetUserLogins");

            builder.HasOne(navigationExpression: l => l.User).WithMany(navigationExpression: u => u.UserLogins).HasForeignKey(foreignKeyExpression: u => u.UserId);
        /*%s:end Body*/
        }
    }
}