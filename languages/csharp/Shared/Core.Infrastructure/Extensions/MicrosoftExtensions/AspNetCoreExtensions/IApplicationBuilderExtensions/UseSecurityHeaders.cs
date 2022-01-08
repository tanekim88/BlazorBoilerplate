

using Microsoft.AspNetCore.Builder;

namespace Core.Infrastructure.Extensions.MicrosoftExtensions.AspNetCoreExtensions.IApplicationBuilderExtensions
{
    public static class UseSecurityHeadersExtension
    {
        public static IApplicationBuilder UseCustomSecurityHeaders(this IApplicationBuilder app)
        {
            var policyCollection = new HeaderPolicyCollection()
                .AddFrameOptionsDeny()
                .AddXssProtectionBlock()
                .AddContentTypeOptionsNoSniff()
                .AddStrictTransportSecurityMaxAgeIncludeSubDomains(maxAgeInSeconds: 60 * 60 * 24 * 365) // maxage = one year in seconds
                .AddReferrerPolicyStrictOriginWhenCrossOrigin()
                .RemoveServerHeader()
                .AddContentSecurityPolicy(builder =>
                {
                    builder.AddObjectSrc().None();
                    builder.AddFormAction().Self();
                    builder.AddFrameAncestors().None();
                })
                .AddCrossOriginOpenerPolicy(builder =>
                {
                    builder.SameOrigin();
                })
                .AddCrossOriginEmbedderPolicy(builder =>
                {
                    builder.RequireCorp();
                })
                .AddCrossOriginResourcePolicy(builder =>
                {
                    builder.SameOrigin();
                })
                .AddCustomHeader("X-My-Test-Header", "Header value");
            app.UseSecurityHeaders(policyCollection);
//X - Content - Type - Options: nosniff
//Strict - Transport - Security: max - age = 31536000; includeSubDomains - only applied to HTTPS responses
//X - Frame - Options: Deny - only applied to text / html responses
//X - XSS - Protection: 1; mode = block - only applied to text / html responses
//Referrer - Policy: strict - origin - when - cross - origin - only applied to text / html responses
//Content - Security - Policy: object-src 'none'; form - action 'self'; frame - ancestors 'none' - only applied to text / html responses

            return app;
        }
    }
}