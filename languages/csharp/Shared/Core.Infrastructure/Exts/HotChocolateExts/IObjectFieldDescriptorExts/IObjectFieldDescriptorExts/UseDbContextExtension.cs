

using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.HotChocolateExts.IObjectFieldDescriptorExts
{
    public static class UseDbContextExtension
    {
        public static IObjectFieldDescriptor UseDbContext<TDbContext>(
            this IObjectFieldDescriptor descriptor)
            where TDbContext : DbContext
        {
            return descriptor.UseScopedService(
                create: s => { return s.GetRequiredService<IDbContextFactory<TDbContext>>().CreateDbContext(); },
                disposeAsync: (s, c) => { return c.DisposeAsync(); });
        }
    }
}