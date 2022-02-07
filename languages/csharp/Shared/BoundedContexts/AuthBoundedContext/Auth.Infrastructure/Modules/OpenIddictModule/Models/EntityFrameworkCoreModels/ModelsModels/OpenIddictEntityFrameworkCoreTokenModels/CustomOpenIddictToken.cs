

using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreApplicationModels;
using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreAuthorizationModels;
using OpenIddict.EntityFrameworkCore.Models;


namespace Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreTokenModels
{
    public class CustomOpenIddictToken : OpenIddictEntityFrameworkCoreToken<int, CustomOpenIddictApplication,
        CustomOpenIddictAuthorization>
    {
    }
}