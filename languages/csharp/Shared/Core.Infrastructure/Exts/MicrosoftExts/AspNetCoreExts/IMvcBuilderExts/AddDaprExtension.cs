using Microsoft.Extensions.DependencyInjection;

namespace Core.Infrastructure.Exts.MicrosoftExtensions.AspNetCoreExtensions.IMvcBuilderExtensions
{
    public static class AddDaprExtension
    {
        public static IMvcBuilder AddCustomDapr(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.AddDapr();
            return mvcBuilder;
        }



    }
}