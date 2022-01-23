//%runIf: !Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.BoundedContext.Name == "__Entities_BoundedContext_Name__").ShouldNotGenerate
using __Entities_BoundedContext_Name__.Domain.Entities.__Entities_Groups_00_Name__Entities;
using __Entities_BoundedContext_Name__.Domain.Interfaces.RepositoryInterfaces.__Entities_Groups_00_Name__RepositoryInterfaces;
using __Entities_BoundedContext_Name__.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
using Core.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace __Entities_BoundedContext_Name__.Infrastructure.Repositories.__Entities_Groups_00_Name__Repositories
{
    public class __Entities_Name__Repository_Gen_<TDbContext> : 
        EfRepository<__Entities_Name___Gen_, __Entities_Name__Id_Gen_, TDbContext>, I__Entities_Name__Repository_Gen_ where TDbContext : DbContext 
    {
        public __Entities_Name__Repository_Gen_(IDbContextFactory<TDbContext> contextFactory) : base(contextFactory)
        {
        }
    }
}