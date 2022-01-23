//%s:begin Usings
//%s:end Usings
using Shop.Domain;
using Core.Infrastructure.DbContexts;
using Core.Infrastructure.Exts.MicrosoftExtensions.ModelBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Shop.Infrastructure.DbContexts
{
    public class ShopDbContext : ApplicationDbContext
    {
        public ShopDbContext(DbContextOptions options): base(options: options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.DefinePrimaryKeysFromKeyAttributes();
            modelBuilder.ApplyCustomConfigurationsFromAssembly(assembly: GetType().Assembly);
            //%s:begin UserAudit
            //modelBuilder.SetNoActionsForUpdatedByOptionalAndCreatedByOptional<User>();
            //%s:end UserAudit
            var types = typeof(ShopInfrastructureConfig).Assembly.GetTypes().Where(type => type.Namespace is not null && type.Namespace.Contains(".ValueObjects"));
            foreach (var idType in types)
            {
                modelBuilder.Entity(idType).HasNoKey();
            }
        }
    }
}