//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserGroupRequest" && entity.Properties.Exists(property => property.Name == "UserGroupId" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserGroupRequestSpecs
{
    public sealed class UserGroupRequestsByUserGroupIdSpec : Specification<UserGroupRequest>
    {
        public UserGroupRequestsByUserGroupIdSpec(UserGroupId userGroupId)
        {
            Query.Where(UserGroupRequest => UserGroupRequest.UserGroupId == userGroupId);
        }
    }
}