//%s:begin Usings
//%s:end Usings
using Email.Domain;
using Core.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.ModelBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Email.Infrastructure.DbContexts
{
    public class EmailDbContext : ApplicationDbContext
    {
        public EmailDbContext(DbContextOptions options): base(options: options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.DefinePrimaryKeysFromKeyAttributes();
            modelBuilder.ApplyConfigurationsFromAssembly(assembly: GetType().Assembly);
            //%s:begin UserAudit
            //modelBuilder.SetNoActionsForUpdatedByOptionalAndCreatedByOptional<User>();
            //%s:end UserAudit
            var types = typeof(EmailInfrastructureConfig).Assembly.GetTypes().Where(type => type.Namespace is not null && type.Namespace.Contains(".ValueObjects"));
            foreach (var idType in types)
            {
                modelBuilder.Entity(idType).HasNoKey();
            }
        }
    }
}