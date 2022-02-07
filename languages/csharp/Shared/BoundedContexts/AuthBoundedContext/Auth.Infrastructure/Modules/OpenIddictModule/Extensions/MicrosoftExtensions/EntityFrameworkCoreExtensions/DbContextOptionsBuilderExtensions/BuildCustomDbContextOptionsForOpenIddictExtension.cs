using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreApplicationModels;
using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreAuthorizationModels;
using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreScopeModels;
using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreTokenModels;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Modules.OpenIddictModule.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts
{
    public static class BuildCustomDbContextOptionsForOpenIddictExtension
    {
        public static DbContextOptionsBuilder BuildCustomDbContextOptionsForOpenIddict(this DbContextOptionsBuilder options)
        {
            options.UseOpenIddict<CustomOpenIddictApplication,
                CustomOpenIddictAuthorization, CustomOpenIddictScope, CustomOpenIddictToken, int>();
            return options;
        }
    }
}
