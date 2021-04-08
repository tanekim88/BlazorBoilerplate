

using OpenIddict.EntityFrameworkCore.Models;



namespace Auth.Infrastructure.OpenIdDict
{
    public class CustomOpenIdToken : OpenIddictEntityFrameworkCoreToken<int, CustomOpenIdApplication,
        CustomOpenIdAuthorization>
    {
    }
}