//%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "Auth" && string.Join(".", entity.Groups.Select(group => group.Name)) == "" && entity.Name == "User_UserGroup" && entity.Properties.Exists(property => property.Name == "UserId" && (property.IsSimpleType || property.IsValueObject )))
using Auth.Domain.ValueObjects.Ids;
using Auth.Domain.Entities;
using Auth.Domain.Entities;
using Ardalis.Specification;

namespace Auth.Domain.Specs.User_UserGroupSpecs
{
    public sealed class User_UserGroupsByUserIdSpec : Specification<User_UserGroup>
    {
        public User_UserGroupsByUserIdSpec(UserId userId)
        {
            Query.Where(User_UserGroup => User_UserGroup.UserId == userId);
        }
    }
}