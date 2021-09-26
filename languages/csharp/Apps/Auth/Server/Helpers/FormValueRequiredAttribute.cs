

using System;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Routing;



namespace Auth.Server.Helpers
{
    public sealed class FormValueRequiredAttribute : ActionMethodSelectorAttribute
    {
        private readonly string _name;

        public FormValueRequiredAttribute(string name)
        {
            _name = name;
        }

        public override bool IsValidForRequest(RouteContext context, ActionDescriptor action)
        {
            if (string.Equals(a: context.HttpContext.Request.Method, b: "GET",
                    comparisonType: StringComparison.OrdinalIgnoreCase) ||
                string.Equals(a: context.HttpContext.Request.Method, b: "HEAD",
                    comparisonType: StringComparison.OrdinalIgnoreCase) ||
                string.Equals(a: context.HttpContext.Request.Method, b: "DELETE",
                    comparisonType: StringComparison.OrdinalIgnoreCase) ||
                string.Equals(a: context.HttpContext.Request.Method, b: "TRACE",
                    comparisonType: StringComparison.OrdinalIgnoreCase))
                return false;

            if (string.IsNullOrEmpty(value: context.HttpContext.Request.ContentType)) return false;

            if (!context.HttpContext.Request.ContentType.StartsWith(value: "application/x-www-form-urlencoded",
                comparisonType: StringComparison.OrdinalIgnoreCase)) return false;

            return !string.IsNullOrEmpty(value: context.HttpContext.Request.Form[key: _name]);
        }
    }
}