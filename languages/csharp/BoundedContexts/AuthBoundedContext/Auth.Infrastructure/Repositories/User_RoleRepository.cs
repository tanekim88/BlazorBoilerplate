using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories
{
    public class User_RoleRepository<TDbContext> : EfRepository<User_Role, User_RoleId, TDbContext>, IUser_RoleRepository where TDbContext : DbContext
    {
        public User_RoleRepository(IDbContextFactory<TDbContext> contextFactory): base(contextFactory)
        {
        }
    }
}