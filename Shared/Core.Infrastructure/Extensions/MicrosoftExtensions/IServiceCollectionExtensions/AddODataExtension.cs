

using Microsoft.AspNetCore.OData;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;



namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
{
    public static class AddODataExtension
    {
        public static IServiceCollection AddCustomOData(this IServiceCollection services)
        {
            services.AddOData(setupAction: opt =>
                opt
                    .AddModel(prefix: "odata", model: GetEdmModel(), configureAction: builder => { })
                    .AddModel(prefix: "v{version}", model: GetEdmModel())
                    .Filter().Select().Expand().OrderBy().Count()
            );

            return services;
        }

        private static IEdmModel GetEdmModel()
        {
            ODataConventionModelBuilder builder = new();
            //builder.SetEntities();
            return builder.GetEdmModel();
        }
    }
}