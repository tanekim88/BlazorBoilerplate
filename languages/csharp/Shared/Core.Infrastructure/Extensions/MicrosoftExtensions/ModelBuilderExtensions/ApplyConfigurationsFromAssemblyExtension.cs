

using System.Collections.Generic;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.ModelBuilderExtensions
{
    public static class ApplyConfigurationsFromAssemblyExtension
    {
        public static ModelBuilder ApplyCustomConfigurationsFromAssembly(this ModelBuilder builder, Assembly assembly)
        {
            builder.ApplyConfigurationsFromAssembly(assembly: assembly, (t) =>
            {
                if (!t.Name.EndsWith("Gen_"))
                {
                    return true;
                }

                return false;
            });

            return builder;
        }
    }
}