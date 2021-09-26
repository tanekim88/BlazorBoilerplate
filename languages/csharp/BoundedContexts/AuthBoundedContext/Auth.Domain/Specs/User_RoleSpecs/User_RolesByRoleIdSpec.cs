//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "User_Role" && entity.Properties.Exists(property => property.Name == "RoleId" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.User_RoleSpecs
{
    public sealed class User_RolesByRoleIdSpec : Specification<User_Role>
    {
        public User_RolesByRoleIdSpec(RoleId roleId)
        {
            Query.Where(User_Role => User_Role.RoleId == roleId);
        }
    }
}