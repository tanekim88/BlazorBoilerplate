//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "Role" && entity.Properties.Exists(property => property.Name == "Name" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using System;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.RoleSpecs
{
    public sealed class RolesByNameSpec : Specification<Role>
    {
        public RolesByNameSpec(string name)
        {
            Query.Where(Role => Role.Name == name);
        }
    }
}