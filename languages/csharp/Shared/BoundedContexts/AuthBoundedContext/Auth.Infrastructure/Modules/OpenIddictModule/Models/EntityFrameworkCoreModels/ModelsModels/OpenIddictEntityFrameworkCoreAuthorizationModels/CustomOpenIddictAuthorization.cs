

using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreApplicationModels;
using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreTokenModels;
using OpenIddict.EntityFrameworkCore.Models;



namespace Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreAuthorizationModels
{
    public class CustomOpenIddictAuthorization : OpenIddictEntityFrameworkCoreAuthorization<int, CustomOpenIddictApplication,
        CustomOpenIddictToken>
    {
    }
}