

using Auth.Server.Areas.Identity;
using Microsoft.AspNetCore.Hosting;



[assembly: HostingStartup(hostingStartupType: typeof(IdentityHostingStartup))]

namespace Auth.Server.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices(configureServices: (context, services) => { });
        }
    }
}