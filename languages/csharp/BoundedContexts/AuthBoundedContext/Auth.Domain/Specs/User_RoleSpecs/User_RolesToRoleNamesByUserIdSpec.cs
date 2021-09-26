

using Ardalis.Specification;
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;



namespace Auth.Domain.Specs.User_RoleSpecs
{
    public class User_RolesToRoleNamesByUserIdSpec : Specification<User_Role, string>
    {
        public User_RolesToRoleNamesByUserIdSpec(UserId userId)
        {
            Query
                .Select(selector: b => b.Role.Name)
                .Include(includeExpression: b => b.Role)
                .Where(criteria: b => b.UserId == userId);
        }
    }
}