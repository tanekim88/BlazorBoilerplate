

using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    [DataContract(IsReference = true)]
    public static class TemplateCommand
    {
        [DataMember] public const string SectionBegin = "s:begin";

        [DataMember] public const string SectionEnd = "s:end";

        [DataMember] public const string IgnoreBegin = "i:begin";

        [DataMember] public const string IgnoreEnd = "i:end";

        [DataMember] public const string CodeBegin = "code:begin";

        [DataMember] public const string CodeEnd = "code:end";

        [DataMember] public const string TemplateSectionBegin = "t:begin";

        [DataMember] public const string TemplateSectionEnd = "t:end";

        [DataMember] public static string Uncomment { get; set; } = "u";

        [DataMember] public static string Ref { get; set; } = "ref";

        [DataMember] public static string RefProject { get; set; } = "refProject";

        [DataMember] public static string PartialRef { get; set; } = "partialRef";

        [DataMember] public static string PartialRefProject { get; set; } = "partialRefProject";

        [DataMember] public static string RunIf { get; set; } = "runIf";

        [DataMember] public static string RefIf { get; set; } = "refIf";

        [DataMember] public static string DeleteBegin { get; set; } = "d:begin";

        [DataMember] public static string DeleteEnd { get; set; } = "d:end";
    }
}