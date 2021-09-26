//%runIf: !Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.BoundedContext.Name == "__Entities_BoundedContext_Name__").ShouldNotGenerate

//%S:begin Header
//%S:end Header



using Shared__Entities_BoundedContext_Name__.Application.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces;

namespace Shared__Entities_BoundedContext_Name__.Application.Services.__Entities_Groups_00_Name__Services
{
    //%S:begin Attributes
    //%S:end Attributes
    public class Shared__Entities_Name__ApplicationService_Gen_ : IShared__Entities_Name__ApplicationService_Gen_

    /*%S:begin BaseClass*//*%S:end BaseClass*/
    {
        //%S:begin Properties
        //%S:end Properties


        public Shared__Entities_Name__ApplicationService_Gen_(
            /*%S:begin ConstructorParameters*/
            /*%S:end ConstructorParameters*/
            )
        {

            /*%S:begin ConstructorBody*/
            /*%S:end ConstructorBody*/
        }

        //%S:begin Body
        //%S:end Body
    }
}
