using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class UserGroupRequestRepository<TDbContext> : EfRepository<UserGroupRequest, UserGroupRequestId, TDbContext>, IUserGroupRequestRepository where TDbContext : DbContext
    {
        public UserGroupRequestRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}