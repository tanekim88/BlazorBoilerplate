

using Microsoft.EntityFrameworkCore;
using SharedCore.Domain.Interfaces.ModelInterfaces;



namespace Core.Infrastructure.Exts.MicrosoftExtensions.ModelBuilderExtensions
{
    public static class SetNoActionsForUpdatedByOptionalAndCreatedByOptionalExtension
    {
        public static ModelBuilder SetNoActionsForUpdatedByOptionalAndCreatedByOptional<User>(this ModelBuilder builder)
        {
            foreach (var entity in builder.Model.GetEntityTypes())
            {
                var entityBuilder = builder.Entity(type: entity.ClrType);
                if (typeof(IUpdatedByOptional<User>).IsAssignableFrom(c: entity.ClrType))
                    entityBuilder.HasOne(navigationName: nameof(IUpdatedByOptional<User>.UpdatedBy)).WithMany()
                        .OnDelete(deleteBehavior: DeleteBehavior.NoAction);

                if (typeof(ICreatedByOptional<User>).IsAssignableFrom(c: entity.ClrType))
                    entityBuilder.HasOne(navigationName: nameof(ICreatedByOptional<User>.CreatedBy)).WithMany()
                        .OnDelete(deleteBehavior: DeleteBehavior.NoAction);
            }

            return builder;
        }
    }
}