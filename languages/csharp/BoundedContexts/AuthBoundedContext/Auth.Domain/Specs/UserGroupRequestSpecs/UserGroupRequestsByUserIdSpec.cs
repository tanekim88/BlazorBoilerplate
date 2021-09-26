//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserGroupRequest" && entity.Properties.Exists(property => property.Name == "UserId" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserGroupRequestSpecs
{
    public sealed class UserGroupRequestsByUserIdSpec : Specification<UserGroupRequest>
    {
        public UserGroupRequestsByUserIdSpec(UserId userId)
        {
            Query.Where(UserGroupRequest => UserGroupRequest.UserId == userId);
        }
    }
}