using Auth.Domain;
using Auth.Domain.Entities;
using Core.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.ModelBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Auth.Infrastructure.DbContexts
{
    public class AuthDbContext : ApplicationDbContext
    {
        public DbSet<RoleClaim> RoleClaims { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<UserClaim> UserClaims { get; set; }

        public DbSet<UserGroup> UserGroups { get; set; }

        public DbSet<UserGroupRequest> UserGroupRequests { get; set; }

        public DbSet<UserGroupRole> UserGroupRoles { get; set; }

        public DbSet<UserLogin> UserLogins { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserToken> UserTokens { get; set; }

        public DbSet<User_Role> User_Roles { get; set; }

        public DbSet<User_UserGroup> User_UserGroups { get; set; }

        public DbSet<User_UserGroupRole> User_UserGroupRoles { get; set; }

        public AuthDbContext(DbContextOptions options) : base(options: options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.DefinePrimaryKeysFromKeyAttributes();
            modelBuilder.ApplyCustomConfigurationsFromAssembly(assembly: GetType().Assembly);
            modelBuilder.SetNoActionsForUpdatedByOptionalAndCreatedByOptional<User>();
            var types = typeof(AuthDomainConfig).Assembly.GetTypes()
                .Where(type => type.Namespace is not null && type.Namespace.Contains(".ValueObjects") && !type.Name.EndsWith("Gen_"));
            
            foreach (var idType in types)
            {
                modelBuilder.Entity(idType).HasNoKey();
            }
        }
    }
}