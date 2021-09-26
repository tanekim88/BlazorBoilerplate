﻿

using Auth.Infrastructure.OpenIdDict;
using Auth.Server.Helpers;
using Auth.Server.ViewModels.Authorization;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using OpenIddict.Abstractions;
using OpenIddict.Core;
using OpenIddict.Server.AspNetCore;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static OpenIddict.Abstractions.OpenIddictConstants;



namespace Auth.Server.Controllers
{
    public class AuthorizationController : Controller
    {
        private readonly OpenIddictApplicationManager<CustomOpenIdApplication> _applicationManager;
        private readonly OpenIddictAuthorizationManager<CustomOpenIdAuthorization> _authorizationManager;
        private readonly OpenIddictScopeManager<CustomOpenIdScope> _scopeManager;
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public AuthorizationController(
            OpenIddictApplicationManager<CustomOpenIdApplication> applicationManager,
            OpenIddictAuthorizationManager<CustomOpenIdAuthorization> authorizationManager,
            OpenIddictScopeManager<CustomOpenIdScope> scopeManager,
            SignInManager<UserModel> signInManager,
            UserManager<UserModel> userManager)
        {
            _applicationManager = applicationManager;
            _authorizationManager = authorizationManager;
            _scopeManager = scopeManager;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpGet(template: "~/connect/authorize")]
        [HttpPost(template: "~/connect/authorize")]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Authorize()
        {
            var request = HttpContext.GetOpenIddictServerRequest() ??
                          throw new InvalidOperationException(
                              message: "The OpenID Connect request cannot be retrieved.");

            // Retrieve the user principal stored in the authentication cookie.
            // If it can't be extracted, redirect the user to the login page.
            var result = await HttpContext.AuthenticateAsync(scheme: IdentityConstants.ApplicationScheme);
            if (result == null || !result.Succeeded)
            {
                // If the client application requested promptless authentication,
                // return an error indicating that the user is not logged in.
                if (request.HasPrompt(prompt: Prompts.None))
                    return Forbid(
                        authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                        properties: new AuthenticationProperties(items: new Dictionary<string, string>
                        {
                            [key: OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.LoginRequired,
                            [key: OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                                "The user is not logged in."
                        }));

                return Challenge(
                    authenticationSchemes: IdentityConstants.ApplicationScheme,
                    properties: new AuthenticationProperties
                    {
                        RedirectUri = Request.PathBase + Request.Path + QueryString.Create(
                            parameters: Request.HasFormContentType ? Request.Form.ToList() : Request.Query.ToList())
                    });
            }

            // If prompt=login was specified by the client application,
            // immediately return the user agent to the login page.
            if (request.HasPrompt(prompt: Prompts.Login))
            {
                // To avoid endless login -> authorization redirects, the prompt=login flag
                // is removed from the authorization request payload before redirecting the user.
                var prompt = string.Join(separator: " ", values: request.GetPrompts().Remove(item: Prompts.Login));

                var parameters = Request.HasFormContentType
                    ? Request.Form.Where(predicate: parameter => parameter.Key != Parameters.Prompt).ToList()
                    : Request.Query.Where(predicate: parameter => parameter.Key != Parameters.Prompt).ToList();

                parameters.Add(
                    item: KeyValuePair.Create(key: Parameters.Prompt, value: new StringValues(value: prompt)));

                return Challenge(
                    authenticationSchemes: IdentityConstants.ApplicationScheme,
                    properties: new AuthenticationProperties
                    {
                        RedirectUri = Request.PathBase + Request.Path + QueryString.Create(parameters: parameters)
                    });
            }

            // If a max_age parameter was provided, ensure that the cookie is not too old.
            // If it's too old, automatically redirect the user agent to the login page.
            if (request.MaxAge != null && result.Properties?.IssuedUtc != null &&
                DateTimeOffset.UtcNow - result.Properties.IssuedUtc > TimeSpan.FromSeconds(value: request.MaxAge.Value))
            {
                if (request.HasPrompt(prompt: Prompts.None))
                    return Forbid(
                        authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                        properties: new AuthenticationProperties(items: new Dictionary<string, string>
                        {
                            [key: OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.LoginRequired,
                            [key: OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                                "The user is not logged in."
                        }));

                return Challenge(
                    authenticationSchemes: IdentityConstants.ApplicationScheme,
                    properties: new AuthenticationProperties
                    {
                        RedirectUri = Request.PathBase + Request.Path + QueryString.Create(
                            parameters: Request.HasFormContentType ? Request.Form.ToList() : Request.Query.ToList())
                    });
            }

            // Retrieve the profile of the logged in user.
            var user = await _userManager.GetUserAsync(principal: result.Principal) ??
                       throw new InvalidOperationException(message: "The user details cannot be retrieved.");

            // Retrieve the application details from the database.
            var application = await _applicationManager.FindByClientIdAsync(identifier: request.ClientId) ??
                              throw new InvalidOperationException(
                                  message: "Details concerning the calling client application cannot be found.");

            // Retrieve the permanent authorizations associated with the user and the calling client application.
            var authorizations = await _authorizationManager.FindAsync(
                subject: await _userManager.GetUserIdAsync(user: user),
                client: await _applicationManager.GetIdAsync(application: application),
                status: Statuses.Valid,
                type: AuthorizationTypes.Permanent,
                scopes: request.GetScopes()).ToListAsync();

            switch (await _applicationManager.GetConsentTypeAsync(application: application))
            {
                // If the consent is external (e.g when authorizations are granted by a sysadmin),
                // immediately return an error if no authorization can be found in the database.
                case ConsentTypes.External when !authorizations.Any():
                    return Forbid(
                        authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                        properties: new AuthenticationProperties(items: new Dictionary<string, string>
                        {
                            [key: OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.ConsentRequired,
                            [key: OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                                "The logged in user is not allowed to access this client application."
                        }));

                // If the consent is implicit or if an authorization was found,
                // return an authorization response without displaying the consent form.
                case ConsentTypes.Implicit:
                case ConsentTypes.External when authorizations.Any():
                case ConsentTypes.Explicit when authorizations.Any() && !request.HasPrompt(prompt: Prompts.Consent):
                    var principal = await _signInManager.CreateUserPrincipalAsync(user: user);

                    // Note: in this sample, the granted scopes match the requested scope
                    // but you may want to allow the user to uncheck specific scopes.
                    // For that, simply restrict the list of scopes before calling SetScopes.
                    principal.SetScopes(scopes: request.GetScopes());
                    principal.SetResources(resources: await _scopeManager
                        .ListResourcesAsync(scopes: principal.GetScopes()).ToListAsync());

                    // Automatically create a permanent authorization to avoid requiring explicit consent
                    // for future authorization or token requests containing the same scopes.
                    var authorization = authorizations.LastOrDefault();
                    if (authorization == null)
                        authorization = await _authorizationManager.CreateAsync(
                            principal: principal,
                            subject: await _userManager.GetUserIdAsync(user: user),
                            client: await _applicationManager.GetIdAsync(application: application),
                            type: AuthorizationTypes.Permanent,
                            scopes: principal.GetScopes());

                    principal.SetAuthorizationId(
                        identifier: await _authorizationManager.GetIdAsync(authorization: authorization));

                    foreach (var claim in principal.Claims)
                        claim.SetDestinations(destinations: GetDestinations(claim: claim, principal: principal));

                    return SignIn(principal: principal,
                        authenticationScheme: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

                // At this point, no authorization was found in the database and an error must be returned
                // if the client application specified prompt=none in the authorization request.
                case ConsentTypes.Explicit when request.HasPrompt(prompt: Prompts.None):
                case ConsentTypes.Systematic when request.HasPrompt(prompt: Prompts.None):
                    return Forbid(
                        authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                        properties: new AuthenticationProperties(items: new Dictionary<string, string>
                        {
                            [key: OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.ConsentRequired,
                            [key: OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                                "Interactive user consent is required."
                        }));

                // In every other case, render the consent form.
                default:
                {
                    if (Request.Host.Value == "localhost:5001")
                    {
                        var principal2 = await _signInManager.CreateUserPrincipalAsync(user: user);

                        // Note: in this sample, the granted scopes match the requested scope
                        // but you may want to allow the user to uncheck specific scopes.
                        // For that, simply restrict the list of scopes before calling SetScopes.
                        principal2.SetScopes(scopes: request.GetScopes());
                        principal2.SetResources(resources: await _scopeManager
                            .ListResourcesAsync(scopes: principal2.GetScopes())
                            .ToListAsync());

                        // Automatically create a permanent authorization to avoid requiring explicit consent
                        // for future authorization or token requests containing the same scopes.
                        var authorization2 = authorizations.LastOrDefault();
                        if (authorization2 == null)
                            authorization2 = await _authorizationManager.CreateAsync(
                                principal: principal2,
                                subject: await _userManager.GetUserIdAsync(user: user),
                                client: await _applicationManager.GetIdAsync(application: application),
                                type: AuthorizationTypes.Permanent,
                                scopes: principal2.GetScopes());

                        principal2.SetAuthorizationId(
                            identifier: await _authorizationManager.GetIdAsync(authorization: authorization2));

                        foreach (var claim in principal2.Claims)
                            claim.SetDestinations(destinations: GetDestinations(claim: claim, principal: principal2));

                        return SignIn(principal: principal2,
                            authenticationScheme: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                    }

                    return View(model: new AuthorizeViewModel
                    {
                        ApplicationName = await _applicationManager.GetDisplayNameAsync(application: application),
                        Scope = request.Scope
                    });
                }
            }
        }

        [Authorize]
        [FormValueRequired(name: "submit.Accept")]
        [HttpPost(template: "~/connect/authorize")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Accept()
        {
            var request = HttpContext.GetOpenIddictServerRequest() ??
                          throw new InvalidOperationException(
                              message: "The OpenID Connect request cannot be retrieved.");

            // Retrieve the profile of the logged in user.
            var user = await _userManager.GetUserAsync(principal: User) ??
                       throw new InvalidOperationException(message: "The user details cannot be retrieved.");

            // Retrieve the application details from the database.
            var application = await _applicationManager.FindByClientIdAsync(identifier: request.ClientId) ??
                              throw new InvalidOperationException(
                                  message: "Details concerning the calling client application cannot be found.");

            // Retrieve the permanent authorizations associated with the user and the calling client application.
            var authorizations = await _authorizationManager.FindAsync(
                subject: await _userManager.GetUserIdAsync(user: user),
                client: await _applicationManager.GetIdAsync(application: application),
                status: Statuses.Valid,
                type: AuthorizationTypes.Permanent,
                scopes: request.GetScopes()).ToListAsync();

            // Note: the same check is already made in the other action but is repeated
            // here to ensure a malicious user can't abuse this POST-only endpoint and
            // force it to return a valid response without the external authorization.
            if (!authorizations.Any() &&
                await _applicationManager.HasConsentTypeAsync(application: application, type: ConsentTypes.External))
                return Forbid(
                    authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                    properties: new AuthenticationProperties(items: new Dictionary<string, string>
                    {
                        [key: OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.ConsentRequired,
                        [key: OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                            "The logged in user is not allowed to access this client application."
                    }));

            var principal = await _signInManager.CreateUserPrincipalAsync(user: user);

            // Note: in this sample, the granted scopes match the requested scope
            // but you may want to allow the user to uncheck specific scopes.
            // For that, simply restrict the list of scopes before calling SetScopes.
            principal.SetScopes(scopes: request.GetScopes());
            principal.SetResources(resources: await _scopeManager.ListResourcesAsync(scopes: principal.GetScopes())
                .ToListAsync());

            // Automatically create a permanent authorization to avoid requiring explicit consent
            // for future authorization or token requests containing the same scopes.
            var authorization = authorizations.LastOrDefault();
            if (authorization == null)
                authorization = await _authorizationManager.CreateAsync(
                    principal: principal,
                    subject: await _userManager.GetUserIdAsync(user: user),
                    client: await _applicationManager.GetIdAsync(application: application),
                    type: AuthorizationTypes.Permanent,
                    scopes: principal.GetScopes());

            principal.SetAuthorizationId(
                identifier: await _authorizationManager.GetIdAsync(authorization: authorization));

            foreach (var claim in principal.Claims)
                claim.SetDestinations(destinations: GetDestinations(claim: claim, principal: principal));

            // Returning a SignInResult will ask OpenIddict to issue the appropriate access/identity tokens.
            return SignIn(principal: principal,
                authenticationScheme: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        [Authorize]
        [FormValueRequired(name: "submit.Deny")]
        [HttpPost(template: "~/connect/authorize")]
        [ValidateAntiForgeryToken]
        // Notify OpenIddict that the authorization grant has been denied by the resource owner
        // to redirect the user agent to the client application using the appropriate response_mode.
        public IActionResult Deny()
        {
            return Forbid(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        //[HttpGet("~/connect/logout")]
        //public IActionResult Logout() => View();

        //[ActionName(nameof(Logout)), HttpPost("~/connect/logout"), ValidateAntiForgeryToken]
        //public async Task<IActionResult> LogoutPost()
        //{
        //    // Ask ASP.NET Core Identity to delete the local and external cookies created
        //    // when the user agent is redirected from the external identity provider
        //    // after a successful authentication flow (e.g Google or Facebook).
        //    await _signInManager.SignOutAsync();

        //    // Returning a SignOutResult will ask OpenIddict to redirect the user agent
        //    // to the post_logout_redirect_uri specified by the client application or to
        //    // the RedirectUri specified in the authentication properties if none was set.
        //    return SignOut(
        //        authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
        //        properties: new AuthenticationProperties
        //        {
        //            RedirectUri = "/"
        //        });
        //}

        [HttpPost(template: "~/connect/token")]
        [Produces(contentType: "application/json")]
        public async Task<IActionResult> Exchange()
        {
            var request = HttpContext.GetOpenIddictServerRequest() ??
                          throw new InvalidOperationException(
                              message: "The OpenID Connect request cannot be retrieved.");

            if (request.IsAuthorizationCodeGrantType() || request.IsRefreshTokenGrantType())
            {
                // Retrieve the claims principal stored in the authorization code/device code/refresh token.
                var principal =
                    (await HttpContext.AuthenticateAsync(
                        scheme: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme))
                    .Principal;

                // Retrieve the user profile corresponding to the authorization code/refresh token.
                // Note: if you want to automatically invalidate the authorization code/refresh token
                // when the user password/roles change, use the following line instead:
                // var user = _signInManager.ValidateSecurityStampAsync(info.Principal);
                var user = await _userManager.GetUserAsync(principal: principal);
                if (user == null)
                    return Forbid(
                        authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                        properties: new AuthenticationProperties(items: new Dictionary<string, string>
                        {
                            [key: OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.InvalidGrant,
                            [key: OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                                "The token is no longer valid."
                        }));

                // Ensure the user is still allowed to sign in.
                if (!await _signInManager.CanSignInAsync(user: user))
                    return Forbid(
                        authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                        properties: new AuthenticationProperties(items: new Dictionary<string, string>
                        {
                            [key: OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.InvalidGrant,
                            [key: OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                                "The user is no longer allowed to sign in."
                        }));

                foreach (var claim in principal.Claims)
                    claim.SetDestinations(destinations: GetDestinations(claim: claim, principal: principal));

                // Returning a SignInResult will ask OpenIddict to issue the appropriate access/identity tokens.
                return SignIn(principal: principal,
                    authenticationScheme: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            throw new InvalidOperationException(message: "The specified grant type is not supported.");
        }

        private IEnumerable<string> GetDestinations(Claim claim, ClaimsPrincipal principal)
        {
            // Note: by default, claims are NOT automatically included in the access and identity tokens.
            // To allow OpenIddict to serialize them, you must attach them a destination, that specifies
            // whether they should be included in access tokens, in identity tokens or in both.

            switch (claim.Type)
            {
                case Claims.Name:
                    yield return Destinations.AccessToken;

                    if (principal.HasScope(scope: Scopes.Profile))
                        yield return Destinations.IdentityToken;

                    yield break;

                case Claims.Email:
                    yield return Destinations.AccessToken;

                    if (principal.HasScope(scope: Scopes.Email))
                        yield return Destinations.IdentityToken;

                    yield break;

                case Claims.Role:
                    yield return Destinations.AccessToken;

                    if (principal.HasScope(scope: Scopes.Roles))
                        yield return Destinations.IdentityToken;

                    yield break;

                // Never include the security stamp in the access and identity tokens, as it's a secret value.
                case "AspNet.Identity.SecurityStamp": yield break;

                default:
                    yield return Destinations.AccessToken;
                    yield break;
            }
        }
    }
}