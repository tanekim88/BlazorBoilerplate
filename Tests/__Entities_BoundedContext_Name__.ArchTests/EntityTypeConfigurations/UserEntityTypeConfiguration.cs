/*%s:begin Header*/

using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

/*%s:end Header*/
using Core.Infrastructure;

namespace Auth.Infrastructure.EntityTypeConfigurations
{
    public class UserEntityTypeConfiguration : EntityTypeConfigurationBase<User, UserId>, IEntityTypeConfiguration<User>
    {
        /*%s:begin Properties*/
        //private ApplicationDbContextBase _applicationDbContext;
        //public ModelConfigurationForUser(/*%s:begin:ConstructorParameters*/ApplicationDbContextBase applicationDbContext/*%s:end:ConstructorParameters*/)
        //{
        //    _applicationDbContext = applicationDbContext;
        //}
        /*%s:end Properties*/
        public void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);
            /*%s:begin Body*/
            //Func<StoreOptions> GetStoreOptions = () =>
            //               _applicationDbContext.GetService<IDbContextOptions>()
            //               .Extensions.OfType<CoreOptionsExtension>()
            //               .FirstOrDefault().ApplicationServiceProvider
            //               .GetService<IOptions<IdentityOptions>>()
            //               .Value.Stores;
            //var storeOptions = GetStoreOptions();
            //var maxKeyLength = storeOptions?.MaxLengthForKeys ?? 0;
            //var encryptPersonalData = storeOptions?.ProtectPersonalData ?? false;
            // Primary key
            builder.HasKey(keyExpression: u => u.Id);
            // Indexes for "normalized" username and email, to allow efficient lookups
            builder.HasIndex(indexExpression: u => u.NormalizedUserName).HasDatabaseName(name: "UserNameIndex").IsUnique();
            builder.HasIndex(indexExpression: u => u.NormalizedEmail).HasDatabaseName(name: "EmailIndex");
            // Maps to the AspNetUsers table
            builder.ToTable(name: "AspNetUsers");
            // A concurrency token for use with the optimistic concurrency checking
            builder.Property(propertyExpression: u => u.ConcurrencyStamp).IsConcurrencyToken();
            // Limit the size of columns to use efficient database types
            builder.Property(propertyExpression: u => u.UserName).HasMaxLength(maxLength: 256);
            builder.Property(propertyExpression: u => u.NormalizedUserName).HasMaxLength(maxLength: 256);
            builder.Property(propertyExpression: u => u.Email).HasMaxLength(maxLength: 256);
            builder.Property(propertyExpression: u => u.NormalizedEmail).HasMaxLength(maxLength: 256);
            // The relationships between User and other entity types
            // Note that these relationships are configured with no navigation properties
            // Each User can have many UserClaims
            builder.HasMany<UserClaim>().WithOne().HasForeignKey(foreignKeyExpression: uc => uc.UserId).IsRequired();
            // Each User can have many UserLogins
            builder.HasMany<UserLogin>().WithOne().HasForeignKey(foreignKeyExpression: ul => ul.UserId).IsRequired();
            // Each User can have many UserTokens
            builder.HasMany<UserToken>().WithOne().HasForeignKey(foreignKeyExpression: ut => ut.UserId).IsRequired();
            // Each User can have many entries in the UserRole join table
            builder.HasMany<User_Role>().WithOne().HasForeignKey(foreignKeyExpression: ur => ur.UserId).IsRequired();
        ////////////////////////////////////////////////////////////
        /// Custom
         ////////////////////////////////////////////////////////////
        /*%s:end Body*/
        }
    }
}