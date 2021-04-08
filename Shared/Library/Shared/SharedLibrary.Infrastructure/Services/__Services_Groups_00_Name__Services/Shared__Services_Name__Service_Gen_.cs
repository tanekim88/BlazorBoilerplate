///*%runIf: 
//Data.Services.Exists(service => service.Groups[0].Name == "__Services_Groups_0_Name__" && service.Name == "__Services_Name__")
//*/

////%t:begin Intro
////<# var service = Data.Services.Find(service => service.Groups[0].Name == "__Services_Groups_0_Name__" && service.Name == "__Services_Name__"); #>
////<# var model = service.ModelCounterpart ?? new TemplateModel { Properties = new List<TemplateProperty>{}}; #>
////<# var modelExists = model != null; #>
////<# var primaryKeySignatures = model.Properties.Where(property => property.IsPrimaryKey).Select(primaryKey => primaryKey.Signature);  #>

////<# var camelPrimaryKeyNames = primaryKeySignatures.Select(x => x.Name.Camelize()); #>
////<# var camelPrimaryKeyNames_by_slash = string.Join("/", camelPrimaryKeyNames); #>
////<# var camelPrimaryKeyNames_by_comma = string.Join(",", camelPrimaryKeyNames); #>

////<# var camelPrimaryKeyFullNames = primaryKeySignatures.Select(x => x.FullType + " " + x.Name.Camelize()); #>
////<# var camelPrimaryKeyFullNames_by_comma = string.Join(",", camelPrimaryKeyFullNames); #>

////<# var camelPrimaryKeyName_eq_modelsName_dot_Names = primaryKeySignatures.Select(x => x.Name.Camelize() + " = " + model.Name + "." + x.Name); #>
////<# var camelPrimaryKeyName_eq_modelsName_dot_Names_by_comma = string.Join(",", camelPrimaryKeyName_eq_modelsName_dot_Names); #>

////<# var modelsName_dot_Names = primaryKeySignatures.Select(x =>  model.Name  + "." + x.Name); #>
////<# var modelsName_dot_Names_by_comma = string.Join(",", modelsName_dot_Names); #>

////%t:end Intro

////%S:begin Header
////%S:end Header

////%t:begin Header
//using Library.Core.Application.Interfaces.ServiceInterfaces.__Services_Groups_0_Name__ServiceInterfaces;
//using SharedLibrary.Interfaces.ApiInterfaces.__Services_Groups_0_Name__ApiInterfaces;
////%t:end Header


//namespace SharedLibrary.Core.Infrastructure.Services.__Services_Groups_0_Name__Services
//{
//    //%S:begin Attributes
//    //%S:end Attributes
//    public class __Services_Name__Service_Gen_ :
//        /*%S:begin BaseClass*//*%S:end BaseClass*/
//        /*<# if(Data.Context.Sections.Exists(section => section.Name == "BaseClass")) { #>*/
//        //%u ,
//        /*<# } #>*/
//        I__Services_Name__Service_Gen_
//    {
//        //%S:begin Properties
//        //%S:end Properties


//        /*<# if(service.ModelCounterpart is not null) { #>*/
//        public class __Models_Name__Id
//        {

//            /*%d:begin*/
//            public int Id { get; set; }
//            /*%d:end*/

//            //<# foreach(var primaryKey in model.Properties.Where(property => property.IsPrimaryKey)) {#>
//            //%u <#= primaryKey.Signature.AccessModifier #> <#= primaryKey.Signature.FullTypeAndName #> { <#= primaryKey.HasPublicGetter ? "get;": "" #><#= primaryKey.HasPublicSetter ? "set;": "" #> }
//            //<#} #>
//        }
//        /*<# } #>*/

//        protected readonly I__Services_Name__Api_Gen_ ___Models_name__Api;

//        public __Services_Name__Service_Gen_(
//            /*<# if(service.ModelCounterpart is not null) { #>*/
//            I__Services_Name__Api_Gen_ __Models_name__Api
//            /*<# if(Data.Context.Sections.Exists(section => section.Name == "ConstructorParameters")) { #>*/
//            /*%u ,*/
//            /*<# } #>*/
//            /*<# } #>*/
//            /*%S:begin ConstructorParameters*/
//            /*%S:end ConstructorParameters*/
//            )
//        /*<# if(Data.Context.Sections.Exists(section => section.Name == "BaseArguments")) { #>*/
//        : base(/*%S:begin BaseArguments*//*%S:end BaseArguments*/)
//        /*<# } #>*/
//        {
//            ___Models_name__Api = __Models_name__Api;

//            /*%S:begin ConstructorBody*/
//            /*%S:end ConstructorBody*/
//        }

//        //%S:begin Body
//        //%S:end Body


//    }
//}

