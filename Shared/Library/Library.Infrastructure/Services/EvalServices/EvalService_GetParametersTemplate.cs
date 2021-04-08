

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public async Task<GetIntroOutput> GetParametersTemplate(
            string template,
            string xmlFilePathPrefix,
            IDictionary<string, object> parameters = null,
            bool shouldInlineXml = false
        )
        {
            var builder = new StringBuilder();

            parameters = parameters ?? new Dictionary<string, object>();
            var sessionKvList = parameters.ToList();

            List<XmlData> listOfXmlData = sessionKvList.Select(selector: (kv, i) =>
            {
                var key = kv.Key;
                object obj = kv.Value;
                var objType = obj.GetType();
                using (MemoryStream memoryStream = new())
                using (StreamReader reader = new(stream: memoryStream))
                {
                    DataContractSerializer serializer = new(type: obj.GetType());
                    serializer.WriteObject(stream: memoryStream, graph: obj);
                    memoryStream.Position = 0;
                    var xml = reader.ReadToEnd();
                    //var className = GetClassName(new GetClassNameInput { Type = objType }).ClassName;
                    var className = objType.Name;
                    var id = Guid.NewGuid();
                    var xmlFilePath = $@"{xmlFilePathPrefix}_{className}_{id}.temp.txt.xml";
                    var parentDirPath = Directory.GetParent(path: xmlFilePath).FullName;
                    if (!Directory.Exists(path: parentDirPath)) Directory.CreateDirectory(path: parentDirPath);

                    return new XmlData {Key = key, Xml = xml, ClassName = className, FilePath = xmlFilePath};
                }
            }).ToList();


            builder.Append(value: "<#\n");
            listOfXmlData.ForEach(action: tuple =>
            {
                var key = tuple.Key;
                var xml = tuple.Xml;
                var xmlFilePath = tuple.FilePath;
                var match = Regex.Match(input: xml, pattern: @"(http://schemas.datacontract.org/2004/07/)[^\""]*");
                var namespaceToReplace = match.Value;
                var className = tuple.ClassName;

                var classTypeDecl = "classType_" + className;
                var classNameDecl = "className_" + className;
                var declaringTypeNameDecl = "declaringTypeName_" + className;
                var classNamespaceDecl = "classNamespace_" + className;
                var xmlDecl = "xml_" + className;


                var finalXml = new StringBuilder(value: xml);

                foreach (var kv in sessionKvList)
                {
                    var sessionKv = GetAllTypes(type : kv.Value.GetType())
                        .Dic;
                    foreach (var type in sessionKv.Values)
                    {
                        var classTypeName = type.Name;

                        if (shouldInlineXml)
                            finalXml = finalXml
                                .Replace(oldValue: $"<{classTypeName}",
                                    newValue: $"<{{{declaringTypeNameDecl}}}.{classTypeName}")
                                .Replace(oldValue: $"</{classTypeName}",
                                    newValue: $"</{{{declaringTypeNameDecl}}}.{classTypeName}");
                        else
                            finalXml = finalXml
                                .Replace(oldValue: $"<{classTypeName}", newValue: $"<{{0}}.{classTypeName}")
                                .Replace(oldValue: $"</{classTypeName}", newValue: $"</{{0}}.{classTypeName}");
                    }
                }

                if (shouldInlineXml)
                    finalXml.Replace(oldValue: namespaceToReplace,
                        newValue: "http://schemas.datacontract.org/2004/07/" + $"{{{classNamespaceDecl}}}");
                else
                    finalXml.Replace(oldValue: namespaceToReplace,
                        newValue: "http://schemas.datacontract.org/2004/07/" + "{1}");

                builder.Append(
                    value: $@"
{className} {key};
{{
    var {classTypeDecl} = typeof({className});
    var {declaringTypeNameDecl} =  {classTypeDecl}.DeclaringType.Name;
    var {classNameDecl} = ""{className}"";
    var {classNamespaceDecl} = {classTypeDecl}.Namespace;
");

                if (shouldInlineXml)
                {
                    builder.Append(
                        value: $@"var {xmlDecl} = @$""{finalXml.Replace(oldValue: @"""", newValue: @"""""")}"";");
                }
                else
                {
                    File.WriteAllText(path: xmlFilePath, contents: finalXml.ToString());

                    builder.Append(value: $@"
var {xmlDecl} = File.ReadAllText($@""{xmlFilePath}"");
{xmlDecl} = string.Format({xmlDecl}, {declaringTypeNameDecl},{classNamespaceDecl});
");
                }

                builder.Append(
                    value: $@"
    using (System.Xml.XmlReader reader = System.Xml.XmlReader.Create(new StringReader({xmlDecl})))
    {{
        DataContractSerializer deserializer = new DataContractSerializer({classTypeDecl});
        {key} = ({className})deserializer.ReadObject(reader);
    }}
}}
");
            });

            if (!string.IsNullOrEmpty(value: template)) builder.Append(value: template);

            builder.Append(value: "#>\n");

            return new GetIntroOutput {ParametersTemplate = builder.ToString(), ListOfXmlData = listOfXmlData};
        }
    }
}