using Microsoft.Extensions.DependencyInjection;

namespace Core.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.IMvcBuilderExtensions
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