﻿

using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
using Core.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.ModelBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Reflection;



namespace Auth.Infrastructure.DbContexts
{
    public class AuthDbContext : ApplicationDbContext
    {
        public AuthDbContext(DbContextOptions options) : base(options: options)
        {
        }

        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleClaim> RoleClaims { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<User_Role> User_Roles { get; set; }
        public DbSet<User_UserGroup> User_UserGroups { get; set; }
        public DbSet<User_UserGroupRole> User_UserGroupRoles { get; set; }
        public DbSet<UserClaim> UserClaims { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<UserGroupRequest> UserGroupRequests { get; set; }
        public DbSet<UserGroupRole> UserGroupRoles { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.DefinePrimaryKeysFromKeyAttributes();
            modelBuilder.ApplyConfigurationsFromAssembly(assembly: GetType().Assembly);
            modelBuilder.SetNoActionsForUpdatedByOptionalAndCreatedByOptional<User>();

            var types = typeof(__Entities_Name__Id_AuthGen_).Assembly.GetTypes().Where(type => type.Namespace is not null && type.Namespace.Contains(".ValueObjects"));
            foreach (var idType in types)
            {
                modelBuilder.Entity(idType).HasNoKey();
            }
        }


    }
}