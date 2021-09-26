

using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;



namespace Core.Infrastructure.Extensions.ModelBuilderExtensions.EntityFrameworkCoreExtensions.DbContextExtensions
{
    public static class SetExtension
    {
        public static IQueryable<object> Set(this DbContext _context, Type t)
        {
            return (IQueryable<object>) _context.GetType().GetMethod(name: "Set").MakeGenericMethod(t)
                .Invoke(obj: _context, parameters: null);
        }
    }
}