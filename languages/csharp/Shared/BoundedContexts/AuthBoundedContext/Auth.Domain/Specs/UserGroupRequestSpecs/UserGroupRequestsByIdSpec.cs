//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserGroupRequest" && entity.Properties.Exists(property => property.Name == "Id" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserGroupRequestSpecs
{
    public sealed class UserGroupRequestsByIdSpec : Specification<UserGroupRequest>
    {
        public UserGroupRequestsByIdSpec(UserGroupRequestId id)
        {
            Query.Where(UserGroupRequest => UserGroupRequest.Id == id);
        }
    }
}