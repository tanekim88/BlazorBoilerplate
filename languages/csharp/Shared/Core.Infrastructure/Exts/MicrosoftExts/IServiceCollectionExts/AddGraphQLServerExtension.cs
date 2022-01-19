

using System.Reflection;
using Core.Infrastructure.Graphql.Models;
using HotChocolate.Types.Descriptors;
using Microsoft.Extensions.DependencyInjection;



namespace Core.Infrastructure.Exts.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddGraphQLServerExtension
    {
        public static IServiceCollection AddCustomGraphQLServer(this IServiceCollection services)
        {
            var currentAssembly = Assembly.GetExecutingAssembly();
            var types = currentAssembly.GetTypes();

            services.AddSingleton<ITypeInspector, CustomGraphqlTypeInspector>();

            //services.AddGraphQLServer()
            //      .AddCustomQueries()
            //      .AddCustomMutations()
            //      .AddCustomSubscriptions()
            //      .AddCustomTypes()
            //      .AddFiltering()
            //      .AddSorting()
            //      .AddProjections()
            //      .AddCustomDataLoaders()
            //      .EnableRelaySupport()
            //          //// Since we are using subscriptions, we need to register a pub/sub system.
            //          //// for our demo we are using a in-memory pub/sub system.
            //          .AddInMemorySubscriptions()

            //          //// Last we add support for persisted queries. 
            //          //// The first line adds the persisted query storage, 
            //          //// the second one the persisted query processing pipeline.
            //          .AddFileSystemQueryStorage("./persisted_queries")
            //          .UsePersistedQueryPipeline()
            //          ;


            return services;
        }
    }
}