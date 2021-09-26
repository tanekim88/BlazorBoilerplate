using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class UserClaimRepository<TDbContext> : EfRepository<UserClaim, UserClaimId, TDbContext>, IUserClaimRepository where TDbContext : DbContext
    {
        public UserClaimRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}