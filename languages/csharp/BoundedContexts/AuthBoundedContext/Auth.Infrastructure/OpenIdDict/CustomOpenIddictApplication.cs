

using OpenIddict.EntityFrameworkCore.Models;



namespace Auth.Infrastructure.OpenIdDict
{
    public class CustomOpenIddictApplication :
        OpenIddictEntityFrameworkCoreApplication<int, CustomOpenIddictAuthorization, CustomOpenIddictToken>
    {
    }
}