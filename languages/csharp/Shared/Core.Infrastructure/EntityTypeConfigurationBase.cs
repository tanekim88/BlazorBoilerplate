/*%S:begin Header*/

using AutoMapper.Internal;
using Core.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading;

/*%S:end Header*/

namespace Core.Infrastructure
{
    public class EntityTypeConfigurationBase<TEntity, TId>
        where TEntity : Entity<TId>
        where TId : TypedIdValueBase<TId>
    {
        public static ValueConverter<TId, int> Converter { get; set; } = new ValueConverter<TId, int>
          (v => v.Id, v => (TId)Activator.CreateInstance(typeof(TId), new[] { v
         }), new ConverterMappingHints(valueGeneratorFactory: (p, t) => new TemporaryTypedIdValueGenerator<TId>()));


        /*%S:begin Properties*/
        /*%S:end Properties*/
        public void Configure(EntityTypeBuilder<TEntity> builder)
        {
            var hasDeclaredKey = typeof(TEntity).GetProperties(BindingFlags.DeclaredOnly).FirstOrDefault(property => property.GetCustomAttribute<KeyAttribute>() is not null) is not null;

            if (!hasDeclaredKey)
            {
                builder.HasKey(p => p.Id);
            }
            else
            {
                builder.HasAlternateKey(p => p.Id);
            }

            var properties = typeof(TEntity).GetProperties();

            builder
                .Property(property => property.Id)
                .HasConversion(Converter)
                .ValueGeneratedOnAdd()
                .IsRequired();

            var domainAssemblyName = typeof(TEntity).Assembly.GetName().Name;
            var baseName = domainAssemblyName.Substring(0, domainAssemblyName.Length - "Domain".Length);
            var assembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(assembly =>
            {
                return assembly.GetName().Name == baseName + "Infrastructure";
            });

            var types = assembly.GetTypes().Where(type =>
            {
                var implementsGenericInterface = type.ImplementsGenericInterface(typeof(IEntityTypeConfiguration<>));
                return implementsGenericInterface;
            }).ToList();

            foreach (var property in properties)
            {
                if (property.Name.EndsWith("Id") && property.Name != "Id")
                {

                    var propEntityName = property.PropertyType.Name.Substring(0, property.PropertyType.Name.Length - "Id".Length);

                    var entityTypeConfigurationType = types.FirstOrDefault(type => type.Name == propEntityName + "EntityTypeConfiguration");

                    if (entityTypeConfigurationType is not null)
                    {
                        var propConverter = entityTypeConfigurationType.BaseType.GetProperty("Converter", BindingFlags.Static | BindingFlags.Public);

                        var propValue = (ValueConverter)propConverter.GetValue(entityTypeConfigurationType);


                        builder
                            .Property(property.PropertyType, property.Name)
                            .HasConversion(propValue);
                    }
                }

            }

            builder.Property(e => e.Id).IsRequired();

            /*%S:begin Body*/
            /*%S:end Body*/
        }
    }

    public class TemporaryTypedIdValueGenerator<TTypedId> : TemporaryNumberValueGenerator<TTypedId>
    {
        private int current = 0 + 1000;

        public override TTypedId Next(EntityEntry entry)
        {
            return (TTypedId)Activator.CreateInstance(typeof(TTypedId), Interlocked.Increment(ref current));
        }
    }
}