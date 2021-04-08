

using Ardalis.Specification;
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;



namespace Auth.Domain.Specs.User_RoleSpecs
{
    public class User_RolesByUserIdAndNormalizedRoleNameSpec : Specification<User_Role>
    {
        public User_RolesByUserIdAndNormalizedRoleNameSpec(UserId userId, string normalizedRoleName)
        {
            Query.Include(includeExpression: b => b.Role).Include(includeExpression: b => b.User)
                .Where(criteria: b => b.User.Id == userId && b.Role.NormalizedName == normalizedRoleName);
        }
    }
}