using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;

namespace Core.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions
{
    public static class BuildDbContextOptionsExtension
    {
        public static DbContextOptionsBuilder BuildCustomDbContextOptions(this DbContextOptionsBuilder options, 
            IConfiguration configuration,
            string migrationsAssembly)
        {
            options.ReplaceService<IValueConverterSelector, StronglyTypedIdValueConverterSelector<int>>()
            .UseSqlServer(
                connectionString: configuration.GetConnectionString(name: "DefaultConnection"),
                sqlServerOptionsAction: sql =>
                {
                    sql.MigrationsAssembly(assemblyName: migrationsAssembly);
                    sql.UseNetTopologySuite();
                });
            //.UseLazyLoadingProxies(); 

            return options;
        }
    }
}
