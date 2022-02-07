//%runIf: Context.Property.IsSimpleType || Context.Property.IsValueObject 


/*{{
paramSig = [ Context.Property.Signature.Type , " " , (Context.Property.Name[0] | string.downcase) , (Context.Property.Name | string.slice 1 )  ] | array.join ""
whereArgSig = [ (Context.Entity.Name | string.camelize), " => ", (Context.Entity.Name | string.camelize), "." , Context.Property.Signature.Name , " == " , (Context.Property.Name| string.camelize )] | array.join ""
}}*/


/*%u
{{~ for $usedNamespace in Context.Entity.UsedNamespaces ~}}
using {{ $usedNamespace }};
{{~ end ~}}
*/


using __BoundedContext_Name__.Domain.Entities.__Entities_Groups_00_Name__Entities;
using Ardalis.Specification;



namespace __BoundedContext_Name__.Domain.Specs.__Entities_Groups_00_Name__Specs.__Entities_Name__Specs
{
    public sealed class __Entities_NamePluralCase__By__Entities_Properties_Name__Spec_Gen_
        : Specification<__Entities_Name___Gen_>
    {
        public __Entities_NamePluralCase__By__Entities_Properties_Name__Spec_Gen_(/*{{ paramSig }}*/)
        {
            //%u Query.Where({{ whereArgSig }}>);
        }
    }
}