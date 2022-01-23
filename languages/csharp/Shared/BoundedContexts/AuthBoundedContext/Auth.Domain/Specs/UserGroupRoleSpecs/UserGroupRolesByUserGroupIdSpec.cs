//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserGroupRole" && entity.Properties.Exists(property => property.Name == "UserGroupId" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using System;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserGroupRoleSpecs
{
    public sealed class UserGroupRolesByUserGroupIdSpec : Specification<UserGroupRole>
    {
        public UserGroupRolesByUserGroupIdSpec(UserGroupId userGroupId)
        {
            Query.Where(UserGroupRole => UserGroupRole.UserGroupId == userGroupId);
        }
    }
}