

using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;



namespace Core.Infrastructure.Exts.MicrosoftExts.ModelBuilderExts
{
    public static class AddCommonPropertiesExtension
    {
        public static ModelBuilder AddCommonProperties(this ModelBuilder builder)
        {
            IEnumerable<IMutableEntityType> entities = builder.Model.GetEntityTypes();

            foreach (IMutableEntityType entity in entities)
            {
                EntityTypeBuilder entityTypeBuilder = builder.Entity(type: entity.ClrType);

                entityTypeBuilder.Property(propertyName: "Timestamp").IsRowVersion();
            }

            return builder;
        }
    }
}