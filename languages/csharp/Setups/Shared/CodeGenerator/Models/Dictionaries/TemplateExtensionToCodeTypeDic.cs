

using System.Collections.Generic;
using System.Linq;



namespace CodeGenerator.Models.Dictionaries
{
    public static class TemplateExtensionToCodeType
    {
        public static List<TemplateCodeType> CodeTypes = new()
        {
            new TemplateCodeType
            {
                Extension = ".cs",
                SingLineCommentSymbol = "//",
                MultiLineCommentBeginSymbol = "/*",
                MultiLineCommentEndSymbol = "*/",
                CommandSymbol = "%"
            },
            new TemplateCodeType
            {
                Extension = ".resx",
                SingLineCommentSymbol = "",
                MultiLineCommentBeginSymbol = "<!--",
                MultiLineCommentEndSymbol = "-->",
                CommandSymbol = "%"
            },
            new TemplateCodeType
            {
                Extension = ".po",
                SingLineCommentSymbol = "# ",
                MultiLineCommentBeginSymbol = "",
                MultiLineCommentEndSymbol = "",

                CommandSymbol = "%"
            },
            new TemplateCodeType
            {
                Extension = ".razor",
                SingLineCommentSymbol = "",
                MultiLineCommentBeginSymbol = "@*",
                MultiLineCommentEndSymbol = "*@",
                CommandSymbol = "%"
            },
            new TemplateCodeType
            {
                Extension = ".css",
                SingLineCommentSymbol = "",
                MultiLineCommentBeginSymbol = "/*",
                MultiLineCommentEndSymbol = "*/",

                CommandSymbol = "%"
            },
            new TemplateCodeType
            {
                Extension = ".scss",
                SingLineCommentSymbol = "",
                MultiLineCommentBeginSymbol = "/*",
                MultiLineCommentEndSymbol = "*/",

                CommandSymbol = "%"
            },
            new TemplateCodeType
            {
                Extension = ".ts",
                SingLineCommentSymbol = "//",
                MultiLineCommentBeginSymbol = "/*",
                MultiLineCommentEndSymbol = "*/",

                CommandSymbol = "%"
            },
            new TemplateCodeType()
            {
                Extension = ".js",
                SingLineCommentSymbol = "//",
                MultiLineCommentBeginSymbol = "/*",
                MultiLineCommentEndSymbol = "*/",

                CommandSymbol = "%"
            }
        };

        public static Dictionary<string, TemplateCodeType> ExtensionToCodeTypeDic =
            CodeTypes.ToDictionary(keySelector: codeType => codeType.Extension);
    }
}