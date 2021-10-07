

using OpenIddict.EntityFrameworkCore.Models;



namespace Auth.Infrastructure.OpenIdDict
{
    public class CustomOpenIddictAuthorization : OpenIddictEntityFrameworkCoreAuthorization<int, CustomOpenIddictApplication,
        CustomOpenIddictToken>
    {
    }
}