using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class UserLoginRepository<TDbContext> : EfRepository<UserLogin, UserLoginId, TDbContext>, IUserLoginRepository where TDbContext : DbContext
    {
        public UserLoginRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}