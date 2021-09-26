

using Ardalis.Specification;
using Auth.Domain.Entities;



namespace Auth.Domain.Specs.User_RoleSpecs
{
    public sealed class User_RolesToUsersByNormalizedRoleNameSpec : Specification<User_Role, User>
    {
        public User_RolesToUsersByNormalizedRoleNameSpec(string normalizedRoleName)
        {
            Query
                .Select(selector: b => b.User)
                .Include(includeExpression: b => b.User)
                .Include(includeExpression: b => b.Role)
                .Where(criteria: b => b.Role.NormalizedName == normalizedRoleName);
        }
    }
}