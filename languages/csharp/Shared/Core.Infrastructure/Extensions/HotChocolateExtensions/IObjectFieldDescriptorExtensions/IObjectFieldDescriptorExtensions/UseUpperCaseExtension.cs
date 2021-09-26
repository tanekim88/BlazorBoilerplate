

using HotChocolate.Types;



namespace Core.Infrastructure.Extensions.HotChocolateExtensions.IObjectFieldDescriptorExtensions
{
    public static class ObjectFieldUseUpperCaseExtensions
    {
        public static IObjectFieldDescriptor UseUpperCase(this IObjectFieldDescriptor descriptor)
        {
            return descriptor.Use(middleware: next => async context =>
            {
                await next(context: context);

                if (context.Result is string s) context.Result = s.ToUpperInvariant();
            });
        }
    }
}