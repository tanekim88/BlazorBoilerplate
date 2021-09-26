//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "User" && entity.Properties.Exists(property => property.Name == "MiddleInitial" && (property.IsSimpleType || property.IsValueObject )))
using System;
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserSpecs
{
    public sealed class UsersByMiddleInitialSpec : Specification<User>
    {
        public UsersByMiddleInitialSpec(string middleInitial)
        {
            Query.Where(User => User.MiddleInitial == middleInitial);
        }
    }
}