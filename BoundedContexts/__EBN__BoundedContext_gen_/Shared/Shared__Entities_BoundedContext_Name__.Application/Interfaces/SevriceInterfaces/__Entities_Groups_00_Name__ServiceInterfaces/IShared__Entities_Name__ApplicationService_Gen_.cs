//%runIf: !Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.BoundedContext.Name == "__Entities_BoundedContext_Name__").ShouldNotGenerate
//%S:begin Header
//%S:end Header


namespace Shared__Entities_BoundedContext_Name__.Application.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces
{
    public interface IShared__Entities_Name__ApplicationService_Gen_
    /*%S:begin Interfaces*/ /*%S:end Interfaces*/
    {
        //%S:begin Body
        //%S:end Body
    }
}