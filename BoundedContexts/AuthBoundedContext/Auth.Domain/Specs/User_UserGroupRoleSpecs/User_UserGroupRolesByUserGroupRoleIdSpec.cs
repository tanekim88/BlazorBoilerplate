//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "User_UserGroupRole" && entity.Properties.Exists(property => property.Name == "UserGroupRoleId" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.User_UserGroupRoleSpecs
{
    public sealed class User_UserGroupRolesByUserGroupRoleIdSpec : Specification<User_UserGroupRole>
    {
        public User_UserGroupRolesByUserGroupRoleIdSpec(UserGroupRoleId userGroupRoleId)
        {
            Query.Where(User_UserGroupRole => User_UserGroupRole.UserGroupRoleId == userGroupRoleId);
        }
    }
}