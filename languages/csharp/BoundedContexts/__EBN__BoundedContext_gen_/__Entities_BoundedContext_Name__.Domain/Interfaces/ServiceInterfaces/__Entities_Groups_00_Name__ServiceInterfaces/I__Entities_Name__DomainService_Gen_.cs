//%runIf: !Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.BoundedContext.Name == "__Entities_BoundedContext_Name__").ShouldNotGenerate
//%S:begin Header
//%S:end Header

//<# var entity = Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__"  && entity.BoundedContext.Name == "__Entities_BoundedContext_Name__"); #>

//<# foreach(var usedNamespace in entity.UsedNamespaces) { #>
//%u using <#= usedNamespace #>;
//<# } #>

namespace __Entities_BoundedContext_Name__.Domain.Interfaces.ServiceInterfaces.__Entities_Groups_00_Name__ServiceInterfaces
{
    public interface I__Entities_Name__DomainService_Gen_
    {
        //%S:begin Body
        //%S:end Body
    }
}