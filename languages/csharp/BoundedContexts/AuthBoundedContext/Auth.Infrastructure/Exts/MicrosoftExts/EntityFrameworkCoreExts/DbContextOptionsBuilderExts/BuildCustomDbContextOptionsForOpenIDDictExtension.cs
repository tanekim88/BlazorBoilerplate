using Auth.Infrastructure.OpenIdDict;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;

namespace Auth.Infrastructure.Exts.MicrosoftExts.EntityFrameworkCoreExts.DbContextOptionsBuilderExts
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
