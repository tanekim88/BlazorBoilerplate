//%t:begin Intro
//<# var entity = Data.Context.Project.Entities.Find(entity => string.Join(".", entity.Groups.Select(group => group.Name)) == "__Entities_Groups_00_Name__" && entity.Name == "__Entities_Name__"); #>
//<# var interfaces = entity.Interfaces.Select(i => i.Name); #>
//<# var interfaces_by_comma = string.Join(",", interfaces); #>
//<# var primaryKeySignatures = entity.Properties.Where(property => property.IsPrimaryKey).Select(primaryKey => primaryKey.Signature);  #>

//<# var camelPrimaryKeyNames = primaryKeySignatures.Select(x => x.Name.Camelize()); #>
//<# var camelPrimaryKeyNames_by_slash = string.Join("/", camelPrimaryKeyNames); #>
//<# var camelPrimaryKeyNames_by_comma = string.Join(",", camelPrimaryKeyNames); #>

//<# var camelPrimaryKeyFullNames = primaryKeySignatures.Select(x => x.FullType + " " + x.Name.Camelize()); #>
//<# var camelPrimaryKeyFullNames_by_comma = string.Join(",", camelPrimaryKeyFullNames); #>

//<# var camelPrimaryKeyName_eq_entitiesName_dot_Names = primaryKeySignatures.Select(x => x.Name.Camelize() + " = " + entity.Name + "." + x.Name); #>
//<# var camelPrimaryKeyName_eq_entitiesName_dot_Names_by_comma = string.Join(",", camelPrimaryKeyName_eq_entitiesName_dot_Names); #>

//<# var entitiesName_dot_Names = primaryKeySignatures.Select(x =>  entity.Name  + "." + x.Name); #>
//<# var entitiesName_dot_Names_by_comma = string.Join(",", entitiesName_dot_Names); #>

//<# var constructorParameters = entity.Properties.Where(property => ( property.IsSimpleType || property.IsValueObject ) && property.Name != "Id").Select(property => property.Signature.Type + " " + (property.Name.ToLower()[0] + property.Name.Substring(1)) + (property.IsNullable ? " = null": "")); #>
//<# var constructorParameters_by_comma = string.Join(",\n", constructorParameters); #>

//<# var constructorParametersForBody = entity.Properties.Where(property => ( property.IsSimpleType || property.IsValueObject ) && property.Name != "Id")
//%u .Select(property => {
//%u    var fieldName = property.Name.ToLower()[0] + property.Name.Substring(1);
//%u    var toReturn = property.Name + " = " + fieldName;
//%u    if(property.IsEnumerableClass) { 
//%u        toReturn = "_" + fieldName + " = " + fieldName;
//%u            
//%u    }
//%u 
//%u    return toReturn;
//%u 
//%u }); #>
//<# var constructorParametersForBody_by_semicolumn = string.Join(";\n", constructorParametersForBody) + ";"; #>
//%t:end Intro

//<# foreach(var usedNamespace in entity.UsedNamespaces) { #>
//%u using <#= usedNamespace #>;
//<# } #>

//%u using Core.Domain.Entities;

//%S:begin Header
//%S:end Header
//%u using System.ComponentModel.DataAnnotations.Schema;

using Auth.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
using Core.Domain;
using Core.Domain.Interfaces;
using Core.Domain.ValueObjects.Ids.__Entities_Groups_00_Name__Ids;
//%u using System.Collections.ObjectModel;
//%u using System.Collections.Generic;

namespace Auth.Domain.Entities.__Entities_Groups_00_Name__Entities
{
    public class __Entities_Name___AuthGen_ : Entity<__Entities_Name__Id_AuthGen_>, IAggregateRoot
    {
        private __Entities_Name___AuthGen_()
        {
        }

        public __Entities_Name___AuthGen_(
        //<#= constructorParameters_by_comma #>
        //<# if(constructorParameters.Count() > 0 && Data.Context.Sections.Exists(section => section.Name == "ConstructorParameters")) { #>
        //%u ,
        //<# } #>
        /*%S:begin ConstructorParameters*/
        /*%S:end ConstructorParameters*/
        //<# if(constructorParameters.Count() > 0 || Data.Context.Sections.Exists(section => section.Name == "ConstructorParameters")) { #>
        //%u ,
        //<# } #>
        __Entities_Name__Id_AuthGen_? id = null
        )
        {
            if (id is null)
            {
                id = new __Entities_Name__Id_AuthGen_();
            }

            Id = id;

            //<#= constructorParametersForBody_by_semicolumn #>

            /*%S:begin ConstructorBody*/
            /*%S:end ConstructorBody*/
        }

        //<# foreach(var property in entity.Properties) { #> 
        //<# if( property.Name != "Id" ) { #>

        //<# foreach(var attribute in property.Attributes ) { #> 
        //<# if(attribute.IsDbType) { #>
        //<#= attribute.Signature.NameAndArgumentsInsideBrackets ?? "" #>
        //<# } #>
        //<# } #>

        //<# if(property.IsEnumerableClass) { #>
        //%u private readonly <#= property.Signature.Type #> _<#= property.Name.ToLower()[0] #><#= property.Name.Substring(1) #> = new List<<#=property.Signature.ChildType #>>(); 
        //%u public virtual IReadOnlyCollection<<#= property.Signature.ChildType #>> <#= property.Signature.Name #> => _<#= property.Name.ToLower()[0] #><#= property.Name.Substring(1) #>.AsReadOnly();
        //<# } else if(property.IsValueObject || !property.IsSimpleType) { #>
        //%u <#= property.Signature.AccessModifier ?? "" #> virtual <#= property.Signature.Type #> <#= property.Name #> { get; private set; } <#= !property.IsNullable && !property.IsSimpleType ?  " = null!;" : "" #>
        //<# } else  { #>
        //%u <#= property.Signature.AccessModifier ?? "" #>  <#= property.Signature.Type #> <#= property.Name #> { get; private set; } <#= !property.IsNullable && !property.IsSimpleType ?  " = null!;" : "" #>
        //<# } #>
        //<# } #>
        //<# } #>


        //%S:begin Body
        //%S:end Body
    }
}