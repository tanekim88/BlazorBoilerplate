//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "UserGroup" && entity.Properties.Exists(property => property.Name == "Id" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.UserGroupSpecs
{
    public sealed class UserGroupsByIdSpec : Specification<UserGroup>
    {
        public UserGroupsByIdSpec(UserGroupId id)
        {
            Query.Where(UserGroup => UserGroup.Id == id);
        }
    }
}