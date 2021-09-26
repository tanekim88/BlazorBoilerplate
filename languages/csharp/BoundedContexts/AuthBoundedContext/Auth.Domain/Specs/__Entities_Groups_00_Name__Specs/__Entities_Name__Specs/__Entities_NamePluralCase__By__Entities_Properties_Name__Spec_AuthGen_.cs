//%runIf: Data.Context.Project.Entities.Exists(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__" && entity.Properties.Exists(property => property.Name == "__Entities_Properties_Name__" && (property.IsSimpleType || property.IsValueObject )))
//<# var entity = Data.Context.Project.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__"); #>
//<# var property = entity.Properties.First(property => property.Name == "__Entities_Properties_Name__"); #>
//<# var paramSig = property.Signature.Type + " " + (property.Name.ToLower()[0] + property.Name.Substring(1)); #>
//<# var whereArgSig = "__Entities_NameCamelCase__ => __Entities_NameCamelCase__." + property.Signature.Name + " == " + (property.Name.ToLower()[0] + property.Name.Substring(1)); #>

//<# foreach(var usedNamespace in entity.UsedNamespaces) { #>
//%u using <#= usedNamespace #>;
//<# } #>
using Ardalis.Specification;
using Auth.Domain.Entities.__Entities_Groups_00_Name__Entities;



namespace Auth.Domain.Specs.__Entities_Groups_00_Name__Specs.__Entities_Name__Specs
{
    public sealed class __Entities_NamePluralCase__By__Entities_Properties_Name__Spec_AuthGen_
        : Specification<__Entities_Name___AuthGen_>
    {
        public __Entities_NamePluralCase__By__Entities_Properties_Name__Spec_AuthGen_(/*<#= paramSig #>*/)
        {
            //%u Query.Where(<#= whereArgSig #>);
        }
    }
}