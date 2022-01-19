

using Microsoft.OData.ModelBuilder;



namespace Core.Infrastructure.Exts.MicrosoftExts.ODataExts.ODataConventionModelBuilderExts
{
    public static class SetEntitiesExtension_ServerGen_
    {
        public static ODataConventionModelBuilder SetEntities(this ODataConventionModelBuilder builder)
        {
            //<# foreach(var model in Data.Models) { #>
            //%u builder.EntitySet<<#=model.FullName#>>("<#= model.Name.Pluralize() #>");
            //<# } #>

            return builder;
        }
    }
}