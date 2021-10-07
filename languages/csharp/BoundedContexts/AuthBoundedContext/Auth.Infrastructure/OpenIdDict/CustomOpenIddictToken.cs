

using OpenIddict.EntityFrameworkCore.Models;



namespace Auth.Infrastructure.OpenIdDict
{
    public class CustomOpenIddictToken : OpenIddictEntityFrameworkCoreToken<int, CustomOpenIddictApplication,
        CustomOpenIddictAuthorization>
    {
    }
}