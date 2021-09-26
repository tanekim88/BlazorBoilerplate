//%S:begin Header
//%S:end Header

//<# var entity = Data.Context.Project.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__"); #>

//<# foreach(var usedNamespace in entity.UsedNamespaces) { #>
//%u using <#= usedNamespace #>;
//<# } #>

namespace Core.Domain.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces
{
    public interface I__Entities_Name__DomainService_Gen_
    {
        //%S:begin Body
        //%S:end Body
    }
}