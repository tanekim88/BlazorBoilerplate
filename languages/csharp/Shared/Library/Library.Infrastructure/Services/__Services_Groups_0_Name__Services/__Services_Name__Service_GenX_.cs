//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "__Services_Groups_0_Name__" && service.Name == "__Services_Name__")

//%t:begin Intro
//<# var service = Data.Services.Find(service => service.Groups[0].Name == "__Services_Groups_0_Name__" && service.Name == "__Services_Name__"); #>
//<# var model = service.ModelCounterpart ?? new TemplateModel { Properties = new List<TemplateProperty>{}}; #>
//<# var modelExists = model != null; #>
//<# var primaryKeySignatures = model.PrimaryKeys.Select(primaryKey => primaryKey.Signature);  #>

//<# var camelPrimaryKeyNames = primaryKeySignatures.Select(x => x.Name.Camelize()); #>
//<# var camelPrimaryKeyNames_by_slash = string.Join("/", camelPrimaryKeyNames); #>
//<# var camelPrimaryKeyNames_by_comma = string.Join(",", camelPrimaryKeyNames); #>

//<# var camelPrimaryKeyFullNames = primaryKeySignatures.Select(x => x.FullType + " " + x.Name.Camelize()); #>
//<# var camelPrimaryKeyFullNames_by_comma = string.Join(",", camelPrimaryKeyFullNames); #>

//<# var camelPrimaryKeyName_eq_modelsName_dot_Names = primaryKeySignatures.Select(x => x.Name.Camelize() + " = " + model.Name + "." + x.Name); #>
//<# var camelPrimaryKeyName_eq_modelsName_dot_Names_by_comma = string.Join(",", camelPrimaryKeyName_eq_modelsName_dot_Names); #>

//<# var modelsName_dot_Names = primaryKeySignatures.Select(x =>  model.Name  + "." + x.Name); #>
//<# var modelsName_dot_Names_by_comma = string.Join(",", modelsName_dot_Names); #>
//%t:end Intro

//%S:begin Header
//%S:end Header



using Library.Application.Interfaces.ServiceInterfaces.__Services_Groups_0_Name__ServiceInterfaces;



namespace Library.Infrastructure.Services.__Services_Groups_0_Name__Services
{
    public /*%S:begin Partial*/ /*%S:end Partial*/ class __Services_Name__Service_Gen_
        : /*%S:begin BaseClass*/ /*%S:end BaseClass*/
            /*<# if(Data.Context.Sections.Exists(section => section.Name == "BaseClass")) { #>*/
            //%u ,
            /*<# } #>*/
            I__Services_Name__Service_Gen_
    {
        /*%S:begin Properties*/
        /*%S:end Properties*/


        //%S:begin Body
        //%S:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}