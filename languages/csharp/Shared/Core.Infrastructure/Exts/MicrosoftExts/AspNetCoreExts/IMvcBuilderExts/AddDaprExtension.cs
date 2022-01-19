using Microsoft.Extensions.DependencyInjection;

namespace Core.Infrastructure.Exts.MicrosoftExts.AspNetCoreExts.IMvcBuilderExts
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