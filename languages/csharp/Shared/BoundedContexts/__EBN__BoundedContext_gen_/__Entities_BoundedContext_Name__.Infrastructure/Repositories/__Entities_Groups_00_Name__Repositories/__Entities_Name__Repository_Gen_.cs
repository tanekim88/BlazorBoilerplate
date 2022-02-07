
using __BoundedContext_Name__.Domain.Entities.__Entities_Groups_00_Name__Entities;
using __BoundedContext_Name__.Domain.Interfaces.RepositoryInterfaces.__Entities_Groups_00_Name__RepositoryInterfaces;
using __BoundedContext_Name__.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace __BoundedContext_Name__.Infrastructure.Repositories.__Entities_Groups_00_Name__Repositories
{
    public class __Entities_Name__Repository_Gen_<TDbContext> : 
        EfRepository<__Entities_Name___Gen_, __Entities_Name__Id_Gen_, TDbContext>, I__Entities_Name__Repository_Gen_ where TDbContext : DbContext 
    {
        public __Entities_Name__Repository_Gen_(IDbContextFactory<TDbContext> contextFactory) : base(contextFactory)
        {
        }
    }
}