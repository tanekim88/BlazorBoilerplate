//%S:begin Usings
//%S:end Usings
//<# var entities = Data.Entities.Where(entity => entity.BoundedContext.Name == "__Entities_BoundedContext_Name__" && !entity.ShouldNotGenerate); #>
using __Entities_BoundedContext_Name__.Domain;
//<# if(entities.Count() > 0) { #>
using __Entities_BoundedContext_Name__.Domain.Entities.__Entities_Groups_00_Name__Entities;
//<# } #>
using Core.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.ModelBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;

//<# foreach(var entity in entities) { #>
//<# foreach(var usedNamespace in entity.UsedNamespaces) { #>
//%u using <#= usedNamespace #>;
//<# } #>
//<# } #>


namespace __Entities_BoundedContext_Name__.Infrastructure.DbContexts
{
    public class __Entities_BoundedContext_Name__DbContext_Gen_ : ApplicationDbContext
    {
        //%d:begin
        public DbSet<__Entities_Name___Gen_> __Entities_NamePluralCase__ { get; set; }
        //%d:end

        //<# foreach(var entity in entities) { #>
        //%u public DbSet<<#=entity.Name#>> <#= entity.Name.Pluralize() #> { get; set; }
        //<# } #>

        public __Entities_BoundedContext_Name__DbContext_Gen_(DbContextOptions options) : base(options: options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.DefinePrimaryKeysFromKeyAttributes();
            modelBuilder.ApplyConfigurationsFromAssembly(assembly: GetType().Assembly);
            //%S:begin UserAudit
            //modelBuilder.SetNoActionsForUpdatedByOptionalAndCreatedByOptional<User>();
            //%S:end UserAudit

            var types = typeof(__Entities_BoundedContext_Name__DomainConfig).Assembly.GetTypes().Where(type =>
                type.Namespace is not null && type.Namespace.Contains(".ValueObjects"));

            foreach (var idType in types)
            {
                modelBuilder.Entity(idType).HasNoKey();
            }
        }
    }
}