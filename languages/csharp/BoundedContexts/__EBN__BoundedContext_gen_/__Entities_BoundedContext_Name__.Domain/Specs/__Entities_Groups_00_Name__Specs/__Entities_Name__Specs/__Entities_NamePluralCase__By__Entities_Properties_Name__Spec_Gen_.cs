/*%runIf: Data.Entities.Exists(entity =>  entity.BoundedContext.Name == "__Entities_BoundedContext_Name__" && string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.Properties.Exists(property => property.Name == "__Entities_Properties_Name__" && (property.IsSimpleType || property.IsValueObject ))) &&
          !Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.BoundedContext.Name == "__Entities_BoundedContext_Name__").ShouldNotGenerate 
 */
//<# var entity = Data.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__"); #>
//<# var property = entity.Properties.First(property => property.Name == "__Entities_Properties_Name__"); #>
//<# var paramSig = property.Signature.Type + " " + (property.Name.ToLower()[0] + property.Name.Substring(1)); #>
//<# var whereArgSig = "__Entities_NameCamelCase__ => __Entities_NameCamelCase__." + property.Signature.Name + " == " + (property.Name.ToLower()[0] + property.Name.Substring(1)); #>

//<# foreach(var usedNamespace in entity.UsedNamespaces) { #>
//%u using <#= usedNamespace #>;
//<# } #>
using __Entities_BoundedContext_Name__.Domain.Entities.__Entities_Groups_00_Name__Entities;
using Ardalis.Specification;



namespace __Entities_BoundedContext_Name__.Domain.Specs.__Entities_Groups_00_Name__Specs.__Entities_Name__Specs
{
    public sealed class __Entities_NamePluralCase__By__Entities_Properties_Name__Spec_Gen_
        : Specification<__Entities_Name___Gen_>
    {
        public __Entities_NamePluralCase__By__Entities_Properties_Name__Spec_Gen_(/*<#= paramSig #>*/)
        {
            //%u Query.Where(<#= whereArgSig #>);
        }
    }
}