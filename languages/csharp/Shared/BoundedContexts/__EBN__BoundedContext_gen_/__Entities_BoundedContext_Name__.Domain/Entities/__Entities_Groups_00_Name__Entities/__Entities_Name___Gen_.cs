
//%t:begin Intro

/*{{ 

interfaces = Context.Entity.Interfaces | array.map "Name" 
interfaces_by_comma = interfaces | array.join ", "

func isPrimaryKey(property)
   ret property.IsPrimaryKey
end
primaryKeySignatures = Context.Entity.Properties |  array.filter @isPrimaryKey | array.map "Signature"

camelPrimaryKeyNames = primaryKeySignatures | array.map "Name" | array.camelize

camelPrimaryKeyNames_by_slash = camelPrimaryKeyNames | array.join "/"
camelPrimaryKeyNames_by_comma = camelPrimaryKeyNames | array.join ","

func camelPrimaryKeyFullNamesSelect(arg); ret [arg.FullType, " ", (arg.Name | string.camelize)] | array.join ""; end
camelPrimaryKeyFullNames = primaryKeySignatures | array.select @camelPrimaryKeyFullNamesSelect
camelPrimaryKeyFullNames_by_comma = camelPrimaryKeyFullNames | array.join ","

camelPrimaryKeyName_eq_entitiesName_dot_Names = primaryKeySignatures.Select(x => x.Name.Camelize() + " = " + entity.Name + "." + x.Name); #>
camelPrimaryKeyName_eq_entitiesName_dot_Names_by_comma = string.Join(",", camelPrimaryKeyName_eq_entitiesName_dot_Names); #>

entitiesName_dot_Names = primaryKeySignatures.Select(x =>  entity.Name  + "." + x.Name); #>
entitiesName_dot_Names_by_comma = string.Join(",", entitiesName_dot_Names); #>

constructorParameters = entity.Properties.Where(property => ( property.IsSimpleType || property.IsValueObject ) && property.Name != "Id").Select(property => property.Signature.Type + " " + (property.Name.ToLower()[0] + property.Name.Substring(1)) + (property.IsNullable ? " = null": "")); #>
constructorParameters_by_comma = string.Join(",\n", constructorParameters); #>

func isSimpleTypeAndValueObject(property)
   ret (( property.IsSimpleType || property.IsValueObject ) && property.Name != "Id")
end

func constructorParametersForBodySelect(property)
    fieldName = property.Name | string.camelize
    if property.IsEnumerableClass 
        toReturn = ["_", fieldName, " = ", fieldName] | array.join ""
    else
        toReturn = [property.Name , " = " , fieldName] | array.join ""
    end
 
    ret toReturn
end

constructorParametersForBody = Context.Entity.Properties | array.filter @isSimpleTypeAndValueObject | array.select @constructorParametersForBodySelect
constructorParametersForBody_by_newline = constructorParametersForBody | array.join ";\n"
constructorParametersForBody_by_newline_semicolumn = constructorParametersForBody_by_newline | string.append ";"
}}*/

//%t:end Intro


/*%u
{{~ for $usedNamespace in Context.Entity.UsedNamespaces ~}}
using {{ $usedNamespace }};
{{~ end ~}}
*/

//%u using Core.Domain.Entities;
//%S:begin Header
//%S:end Header
//%u using System.ComponentModel.DataAnnotations.Schema;
//%u using System.ComponentModel.DataAnnotations;

using __Entities_BoundedContext_Name__.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
using Core.Domain;
using Core.Domain.Interfaces;
//%u using System.Collections.ObjectModel;
//%u using System.Collections.Generic;

namespace __Entities_BoundedContext_Name__.Domain.Entities.__Entities_Groups_00_Name__Entities
{
    public class __Entities_Name___Gen_ : Entity<__Entities_Name__Id_Gen_>, IAggregateRoot
    {
        private __Entities_Name___Gen_()
        {
        }

        public __Entities_Name___Gen_(
        /*{{ 
            constructorParameters_by_comma

            func doesConstructorParametersExists(section)
                ret section.Name == "ConstructorParameters"
            end

            if (constructorParameters | array.size) > 0 && (Context.File.Sections | array.exists @doesConstructorParametersExists)
            ,
            end
        }}*/
        /*%S:begin ConstructorParameters*/
            
        /*%S:end ConstructorParameters*/

        __Entities_Name__Id_Gen_? id = null
        )
        {
            if (id is null)
            {
                id = new __Entities_Name__Id_Gen_();
            }

            Id = id;

            //{{ constructorParametersForBody_by_newline_semicolumn }}
            /*%S:begin ConstructorBody*/
            /*%S:end ConstructorBody*/
        }

        /*{{for property in entity.Properties
            if property.Name != "Id"
                for attribute in property.Attributes
                    if attribute.IsDbType
                        attribute.Signature.NameAndArgumentsInsideBrackets ?? ""
                    end
                    if property.IsEnumerableClass}}
                        private readonly {{ property.Signature.Type }} _{{ property.Name | string.camelize }}= new List<{{ property.Signature.ChildType }}>(); 
                        public virtual IReadOnlyCollection<{{ property.Signature.ChildType }}> {{ property.Signature.Name }} => _{{property.Name | string.camelize}}.AsReadOnly();
                    {{else if property.IsValueObject || !property.IsSimpleType}}
                        {{property.Signature.AccessModifier ?? "" }} virtual {{ property.Signature.Type }} {{ property.Name }} { get; private set; } {{ !property.IsNullable && !property.IsSimpleType ?  " = null!;" : "" }}
                    {{else}}
                        {{property.Signature.AccessModifier ?? "" }}  {{ property.Signature.Type }} {{ property.Name }} { get; private set; } {{ !property.IsNullable && !property.IsSimpleType ?  " = null!;" : "" }}
                    {{end
                end
            end
        end}}*/

        //%S:begin Body
        //%S:end Body
    }
}