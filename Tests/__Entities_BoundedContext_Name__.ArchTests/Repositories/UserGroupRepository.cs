using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class UserGroupRepository<TDbContext> : EfRepository<UserGroup, UserGroupId, TDbContext>, IUserGroupRepository where TDbContext : DbContext
    {
        public UserGroupRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}