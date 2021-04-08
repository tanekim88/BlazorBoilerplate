

using OpenIddict.EntityFrameworkCore.Models;



namespace Auth.Infrastructure.OpenIdDict
{
    public class CustomOpenIdApplication :
        OpenIddictEntityFrameworkCoreApplication<int, CustomOpenIdAuthorization, CustomOpenIdToken>
    {
    }
}