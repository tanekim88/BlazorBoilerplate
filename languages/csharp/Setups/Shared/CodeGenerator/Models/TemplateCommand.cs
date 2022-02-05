

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public static class TemplateCommand
    {
         public const string SectionBegin = "s:begin";

         public const string SectionEnd = "s:end";

         public const string IgnoreBegin = "i:begin";

         public const string IgnoreEnd = "i:end";

         public const string CodeBegin = "code:begin";

         public const string CodeEnd = "code:end";

         public const string TemplateSectionBegin = "t:begin";

         public const string TemplateSectionEnd = "t:end";

         public static string Uncomment { get; set; } = "u";

         public static string Ref { get; set; } = "ref";

         public static string RefProject { get; set; } = "refProject";

         public static string PartialRef { get; set; } = "partialRef";

         public static string PartialRefProject { get; set; } = "partialRefProject";

         public static string RunIf { get; set; } = "runIf";

         public static string RefIf { get; set; } = "refIf";

         public static string DeleteBegin { get; set; } = "d:begin";

         public static string DeleteEnd { get; set; } = "d:end";
    }
}