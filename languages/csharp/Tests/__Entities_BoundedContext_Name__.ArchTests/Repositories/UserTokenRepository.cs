using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class UserTokenRepository<TDbContext> : EfRepository<UserToken, UserTokenId, TDbContext>, IUserTokenRepository where TDbContext : DbContext
    {
        public UserTokenRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}