using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class RoleClaimRepository<TDbContext> : EfRepository<RoleClaim, RoleClaimId, TDbContext>, IRoleClaimRepository where TDbContext : DbContext
    {
        public RoleClaimRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}