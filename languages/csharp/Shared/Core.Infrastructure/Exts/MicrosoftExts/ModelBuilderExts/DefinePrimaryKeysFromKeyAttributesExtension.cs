

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;



namespace Core.Infrastructure.Exts.MicrosoftExtensions.ModelBuilderExtensions
{
    public static class DefinePrimaryKeysFromKeyAttributesExtension
    {
        public static ModelBuilder DefinePrimaryKeysFromKeyAttributes(this ModelBuilder builder)
        {
            // get all composite keys (entity decorated by more than 1 [Key] attribute
            foreach (var entity in builder.Model.GetEntityTypes()
                .Where(predicate: t =>
                    t.ClrType.GetProperties()
                        .Count(predicate: p =>
                            p.CustomAttributes.Any(predicate: a => a.AttributeType == typeof(KeyAttribute))) > 1))
            {
                // get the keys in the appropriate order
                var orderedKeys = entity.ClrType
                    .GetProperties()
                    .Where(predicate: p =>
                        p.CustomAttributes.Any(predicate: a => a.AttributeType == typeof(KeyAttribute)))
                    .OrderBy(keySelector: p =>
                        p.CustomAttributes.Single(predicate: x => x.AttributeType == typeof(ColumnAttribute))?
                            .NamedArguments?.Single(predicate: y => y.MemberName == nameof(ColumnAttribute.Order))
                            .TypedValue.Value ?? 0)
                    .Select(selector: x => x.Name)
                    .ToArray();

                // apply the keys to the model builder
                builder.Entity(type: entity.ClrType).HasKey(propertyNames: orderedKeys);
            }

            return builder;
        }
    }
}