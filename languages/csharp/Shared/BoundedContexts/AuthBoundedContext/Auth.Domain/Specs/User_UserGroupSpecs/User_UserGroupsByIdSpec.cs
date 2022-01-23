//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "User_UserGroup" && entity.Properties.Exists(property => property.Name == "Id" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.User_UserGroupSpecs
{
    public sealed class User_UserGroupsByIdSpec : Specification<User_UserGroup>
    {
        public User_UserGroupsByIdSpec(User_UserGroupId id)
        {
            Query.Where(User_UserGroup => User_UserGroup.Id == id);
        }
    }
}