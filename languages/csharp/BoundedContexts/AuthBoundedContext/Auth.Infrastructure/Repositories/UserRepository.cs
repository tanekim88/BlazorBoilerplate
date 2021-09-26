using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class UserRepository<TDbContext> : EfRepository<User, UserId, TDbContext>, IUserRepository where TDbContext : DbContext
    {
        public UserRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}