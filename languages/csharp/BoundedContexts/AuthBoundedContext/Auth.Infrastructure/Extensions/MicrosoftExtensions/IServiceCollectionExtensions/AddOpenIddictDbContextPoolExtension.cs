﻿

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.OpenIdDict;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddOpenIddictDbContextPoolExtension
    {
        private static readonly string migrationsAssembly = typeof(AuthDbContext).Assembly.FullName;

        public static IServiceCollection AddCustomOpenIddictDbContextPool(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddPooledDbContextFactory<AuthDbContext>(optionsAction: options =>
            {
                options
                .ReplaceService<IValueConverterSelector, StronglyTypedIdValueConverterSelector>()
                .UseSqlServer(
                    connectionString: configuration.GetConnectionString(name: "DefaultConnection"),
                    sqlServerOptionsAction: sql =>
                    {
                        sql.MigrationsAssembly(assemblyName: migrationsAssembly);
                        sql.UseNetTopologySuite();
                    }).UseLazyLoadingProxies();

                options
                    .UseOpenIddict<CustomOpenIdApplication, CustomOpenIdAuthorization, CustomOpenIdScope,
                        CustomOpenIdToken, int>();
            });

            return services;
        }
    }
}