using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class User_UserGroupRoleRepository<TDbContext> : EfRepository<User_UserGroupRole, User_UserGroupRoleId, TDbContext>, IUser_UserGroupRoleRepository where TDbContext : DbContext
    {
        public User_UserGroupRoleRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}