

using Microsoft.AspNetCore.Builder;

namespace Core.Infrastructure.Exts.MicrosoftExts.AspNetCoreExts.BuilderExts.WebApplicationExts
{
    public static class UseSecurityHeadersExtension
    {
        public static IApplicationBuilder UseCustomSecurityHeaders(this WebApplication app, bool isDev, string idpHost)
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
                    builder.AddBlockAllMixedContent();
                    builder.AddImgSrc().Self().From("data:");
                    builder.AddFormAction().Self().From(idpHost);
                    builder.AddFontSrc().Self();
                    builder.AddStyleSrc().Self();
                    builder.AddBaseUri().Self();
                    builder.AddFrameAncestors().None();

                    // due to Blazor
                    builder.AddScriptSrc()
                        .Self()
                        .WithHash256("v8v3RKRPmN4odZ1CWM5gw80QKPCCWMcpNeOmimNL2AA=")
                        .UnsafeEval();

                    // disable script and style CSP protection if using Blazor hot reload
                    // if using hot reload, DO NOT deploy with an insecure CSP
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
                .AddCustomHeader("X-My-Test-Header", "Header value")
                .AddPermissionsPolicy(builder =>
                {
                    builder.AddAccelerometer().None();
                    builder.AddAutoplay().None();
                    builder.AddCamera().None();
                    builder.AddEncryptedMedia().None();
                    builder.AddFullscreen().All();
                    builder.AddGeolocation().None();
                    builder.AddGyroscope().None();
                    builder.AddMagnetometer().None();
                    builder.AddMicrophone().None();
                    builder.AddMidi().None();
                    builder.AddPayment().None();
                    builder.AddPictureInPicture().None();
                    builder.AddSyncXHR().None();
                    builder.AddUsb().None();
                });

            //X - Content - Type - Options: nosniff
            //Strict - Transport - Security: max - age = 31536000; includeSubDomains - only applied to HTTPS responses
            //X - Frame - Options: Deny - only applied to text / html responses
            //X - XSS - Protection: 1; mode = block - only applied to text / html responses
            //Referrer - Policy: strict - origin - when - cross - origin - only applied to text / html responses
            //Content - Security - Policy: object-src 'none'; form - action 'self'; frame - ancestors 'none' - only applied to text / html responses

            if (!isDev)
            {
                // maxage = one year in seconds
                policyCollection.AddStrictTransportSecurityMaxAgeIncludeSubDomains(maxAgeInSeconds: 60 * 60 * 24 * 365);
            }

            //app.UseSecurityHeaders(policyCollection);

            return app;
        }
    }
}