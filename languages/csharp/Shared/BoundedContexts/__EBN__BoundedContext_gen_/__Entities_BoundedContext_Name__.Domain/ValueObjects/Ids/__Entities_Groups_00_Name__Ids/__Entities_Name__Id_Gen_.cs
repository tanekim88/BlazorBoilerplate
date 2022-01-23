//%runIf: !Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.BoundedContext.Name == "__Entities_BoundedContext_Name__").ShouldNotGenerate
using Core.Domain;

namespace __Entities_BoundedContext_Name__.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids
{
    public class __Entities_Name__Id_Gen_ : TypedIdValueBase<__Entities_Name__Id_Gen_>
    {
        private __Entities_Name__Id_Gen_() { }
        public __Entities_Name__Id_Gen_(int? id = null) : base(id)
        {

        }
    }
}