//<# var entity = Data.Context.Project.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__"); #>

//<# foreach(var usedNamespace in entity.UsedNamespaces) { #>
//%u using <#= usedNamespace #>;
//<# } #>

//%S:begin Header
//%S:end Header

//%t:begin Header
//%t:end Header

using Core.Domain.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces;

namespace Core.Domain.Services.__Entities_Groups_00_Name__Services
{
    //%S:begin Attributes
    //%S:end Attributes
    public class __Entities_Name__DomainService_Gen_: I__Entities_Name__DomainService_Gen_
    /*%S:begin BaseClass*//*%S:end BaseClass*/
    {
        //%S:begin Properties
        //%S:end Properties


        public __Entities_Name__DomainService_Gen_(
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