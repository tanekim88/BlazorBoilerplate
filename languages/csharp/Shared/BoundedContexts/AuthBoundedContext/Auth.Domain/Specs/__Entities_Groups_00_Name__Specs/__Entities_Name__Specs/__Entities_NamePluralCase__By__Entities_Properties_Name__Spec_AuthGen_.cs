//%runIf: Context.Property.IsSimpleType || Context.Property.IsValueObject 


/*{{
paramSig = [ Context.Property.Signature.Type , " " , (Context.Property.Name | string.camelize ) ] | array.join ","
whereArgSig = [ (Context.Entity.Name | string.camelize), " => ", (Context.Entity.Name | string.camelize), "." , Context.Property.Signature.Name , " == " , (Context.Property.Name | string.camelize) ] | array.join ","
}}*/


/*%u
{{~ for $usedNamespace in Context.Entity.UsedNamespaces ~}}
using {{ $usedNamespace }};
{{~ end ~}}
*/

using Ardalis.Specification;
using Auth.Domain.Entities.__Entities_Groups_00_Name__Entities;



namespace Auth.Domain.Specs.__Entities_Groups_00_Name__Specs.__Entities_Name__Specs
{
    public sealed class __Entities_NamePluralCase__By__Entities_Properties_Name__Spec_AuthGen_
        : Specification<__Entities_Name___AuthGen_>
    {
        public __Entities_NamePluralCase__By__Entities_Properties_Name__Spec_AuthGen_(/*{{ paramSig }}*/)
        {
            //%u Query.Where({{ whereArgSig }});
        }
    }
}