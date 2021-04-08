using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class RoleRepository<TDbContext> : EfRepository<Role, RoleId, TDbContext>, IRoleRepository where TDbContext : DbContext
    {
        public RoleRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}