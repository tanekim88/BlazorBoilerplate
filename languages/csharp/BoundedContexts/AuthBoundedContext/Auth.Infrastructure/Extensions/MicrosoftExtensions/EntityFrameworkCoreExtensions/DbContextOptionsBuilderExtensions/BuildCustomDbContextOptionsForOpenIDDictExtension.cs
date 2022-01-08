using Auth.Infrastructure.OpenIdDict;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;

namespace Auth.Infrastructure.Extensions.MicrosoftExtensions.EntityFrameworkCoreExtensions.DbContextOptionsBuilderExtensions
{
    public static class BuildCustomDbContextOptionsForOpenIDDictExtension
    {
        public static DbContextOptionsBuilder BuildCustomDbContextOptionsForOpenIDDict(this DbContextOptionsBuilder options)
        {
            options.UseOpenIddict<CustomOpenIddictApplication, CustomOpenIddictAuthorization, CustomOpenIddictScope, CustomOpenIddictToken, int>();
            return options;
        }
    }
}
