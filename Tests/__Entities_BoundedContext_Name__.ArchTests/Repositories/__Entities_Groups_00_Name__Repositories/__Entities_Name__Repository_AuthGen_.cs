using Auth.Domain.Entities.__Entities_Groups_00_Name__Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces.__Entities_Groups_00_Name__RepositoryInterfaces;
using Auth.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Auth.Infrastructure.Repositories.__Entities_Groups_00_Name__Repositories
{
    public class __Entities_Name__Repository_AuthGen_<TDbContext> : 
        EfRepository<__Entities_Name___AuthGen_, __Entities_Name__Id_AuthGen_, TDbContext>, I__Entities_Name__Repository_AuthGen_ where TDbContext : DbContext 
    {
        public __Entities_Name__Repository_AuthGen_(IDbContextFactory<TDbContext> contextFactory) : base(contextFactory)
        {
        }
    }
}