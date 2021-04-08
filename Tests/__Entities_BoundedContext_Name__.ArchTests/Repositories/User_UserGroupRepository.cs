using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class User_UserGroupRepository<TDbContext> : EfRepository<User_UserGroup, User_UserGroupId, TDbContext>, IUser_UserGroupRepository where TDbContext : DbContext
    {
        public User_UserGroupRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}