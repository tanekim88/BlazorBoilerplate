//%S:begin Header
//%S:end Header

//<# var service = Data.Services.Find(service => service.Groups[0].Name == "__Services_Groups_0_Name__" && service.Name == "__Services_Name__"); #>
//<# var model = service.ModelCounterpart ?? new TemplateModel { Properties = new List<TemplateProperty>{}}; #>
//<# var modelExists = model != null; #>
//<# var primaryKeySignatures = model.Properties.Where(property => property.IsPrimaryKey).Select(primaryKey => primaryKey.Signature);  #>

//<# var camelPrimaryKeyNames = primaryKeySignatures.Select(x => x.Name.Camelize()); #>
//<# var camelPrimaryKeyNames_by_slash = string.Join("/", camelPrimaryKeyNames); #>
//<# var camelPrimaryKeyNames_by_comma = string.Join(",", camelPrimaryKeyNames); #>

//<# var camelPrimaryKeyFullNames = primaryKeySignatures.Select(x => x.FullType + " " + x.Name.Camelize()); #>
//<# var camelPrimaryKeyFullNames_by_comma = string.Join(",", camelPrimaryKeyFullNames); #>

//<# var camelPrimaryKeyName_eq_modelsName_dot_Names = primaryKeySignatures.Select(x => x.Name.Camelize() + " = " + model.Name + "." + x.Name); #>
//<# var camelPrimaryKeyName_eq_modelsName_dot_Names_by_comma = string.Join(",", camelPrimaryKeyName_eq_modelsName_dot_Names); #>

//<# var modelsName_dot_Names = primaryKeySignatures.Select(x =>  model.Name  + "." + x.Name); #>
//<# var modelsName_dot_Names_by_comma = string.Join(",", modelsName_dot_Names); #>

namespace Library.Application.Interfaces.ServiceInterfaces.__Services_Groups_0_Name__ServiceInterfaces
{
    public interface I__Services_Name__Service_Gen_
        /*<# if(Data.Context.Sections.Exists(section => section.Name == "Interfaces")) { #>*/
        //%u :
        /*<# } #>*/
        /*%S:begin Interfaces*/ /*%S:end Interfaces*/
    {
        //<# foreach(var property in service.Properties) {#>
        //<# if(property.IsPublic) {#>
        //<#= property.Signature.FullTypeAndName #> { <#= property.HasPublicGetter ? "get;": "" #><#= property.HasPublicSetter ? "set;": "" #> }
        //<# } #>
        //<# } #>


        //<# foreach(var method in service.Methods) { #>
        //<# if(method.IsPublic) { #>
        //<#= method.Signature.FullTypeAndNameAndParameters #>;
        //<# } #>
        //<# } #>
    }
}