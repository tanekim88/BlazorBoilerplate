using Microsoft.AspNetCore.OData;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace Core.Infrastructure.Exts.MicrosoftExtensions.AspNetCoreExtensions.IMvcBuilderExtensions
{
    public static class UseODataExtension
    {
        public static IMvcBuilder UseCustomOData(this IMvcBuilder mvcBuilder)
        {
            //mvcBuilder.AddOData(setupAction: opt =>
            //    opt
            //        .AddModel(prefix: "odata", model: GetEdmModel(), configureAction: builder => { })
            //        .AddModel(prefix: "v{version}", model: GetEdmModel())
            //        .Filter().Select().Expand().OrderBy().Count()
            //);
            return mvcBuilder;
        }


        private static IEdmModel GetEdmModel()
        {
            ODataConventionModelBuilder builder = new();
            //builder.SetEntities();
            return builder.GetEdmModel();
        }
    }
}