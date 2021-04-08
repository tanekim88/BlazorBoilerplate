using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class UserGroupRoleRepository<TDbContext> : EfRepository<UserGroupRole, UserGroupRoleId, TDbContext>, IUserGroupRoleRepository where TDbContext : DbContext
    {
        public UserGroupRoleRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}