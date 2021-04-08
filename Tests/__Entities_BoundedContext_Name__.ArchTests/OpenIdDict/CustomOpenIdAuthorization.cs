

using OpenIddict.EntityFrameworkCore.Models;



namespace Auth.Infrastructure.OpenIdDict
{
    public class CustomOpenIdAuthorization : OpenIddictEntityFrameworkCoreAuthorization<int, CustomOpenIdApplication,
        CustomOpenIdToken>
    {
    }
}