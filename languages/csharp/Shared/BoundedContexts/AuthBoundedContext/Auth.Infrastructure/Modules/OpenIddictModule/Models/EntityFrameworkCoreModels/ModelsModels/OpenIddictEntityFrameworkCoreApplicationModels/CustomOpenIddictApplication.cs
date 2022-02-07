

using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreAuthorizationModels;
using Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreTokenModels;
using OpenIddict.EntityFrameworkCore.Models;



namespace Auth.Infrastructure.Modules.OpenIddictModule.Models.EntityFrameworkCoreModels.ModelsModels.OpenIddictEntityFrameworkCoreApplicationModels
{
    public class CustomOpenIddictApplication :
        OpenIddictEntityFrameworkCoreApplication<int, CustomOpenIddictAuthorization, CustomOpenIddictToken>
    {
    }
}