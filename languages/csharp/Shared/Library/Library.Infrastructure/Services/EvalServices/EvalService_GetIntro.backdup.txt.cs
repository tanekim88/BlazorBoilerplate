﻿//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Runtime.Serialization;
//using System.Text;
//using static SharedLibrary.Services.SerializerServices.XmlSerializerService;

//namespace Library.Core.Infrastructure.Services.EvalServices
//{
//    public partial class EvalService
//    {

//        public record GetIntroInput
//        {
//            public IDictionary<string, object> Session { get; set; }
//            public StringBuilder Builder { get; set; }
//            public string XmlFilePath { get; set; }
//        }

//        public record GetIntroOutput
//        {
//            public List<string> XmlFilesCreated { get; set; }
//            public StringBuilder Builder { get; set; }
//        }

//        public GetIntroOutput GetIntro(GetIntroInput input)
//        {
//            var builder = input.Builder;

//            var session = input.Session;
//            var xmlFilePath = input.XmlFilePath;
//            var sessionKvList = session.ToList();

//            List<(string key, string xmlPath, string className)> tuples = sessionKvList.Select((kv, i) =>
//            {
//                var key = kv.Key;
//                object obj = kv.Value;
//                var objType = obj.GetType();
//                var className = objType.Name;
//                var filePath = Path.GetFileNameWithoutExtension(xmlFilePath) + "." + key + ".xml";

//                if (xmlFilePath == null)
//                {
//                    var projPathResult = _pathSetupService.GetProjectPath(new() { ProjectName = nameof(Library.Core.Infrastructure) });
//                    filePath = Path.Combine(projPathResult.Payload, "Temp", Guid.NewGuid().ToString() + ".xml");
//                }

//                _xmlSerializerService.WriteObjectToFile(new WriteObjectToFileInput()
//                {
//                    FilePath = filePath,
//                    Object = obj
//                });

//                return (key, filePath, className);

//                //using (MemoryStream memoryStream = new MemoryStream())
//                //using (StreamReader reader = new StreamReader(memoryStream))
//                //{
//                //    DataContractSerializer serializer = new DataContractSerializer(obj.GetType());
//                //    serializer.WriteObject(memoryStream, obj);
//                //    memoryStream.Position = 0;
//                //    var xml = reader.ReadToEnd();
//                //    //var className = GetClassName(new GetClassNameInput { Type = objType }).ClassName;
//                //    return (key, xml.Replace(@"""", @""""""), className);
//                //}
//            }).ToList();


//            var tupleStrings = tuples.Select(tuple => @$"(@""{tuple.key}"", @""{tuple.xmlPath}"", @""{tuple.className}"")");
//            var xmlsJoinedByComma = string.Join(",", tupleStrings);
//            builder.Append("<#\n");
//            //builder.Append($"var tuples = new List<(string xmlPath, string, string)> {{{xmlsJoinedByComma}}};");
//            tuples.ForEach(tuple =>
//            {
//                var key = tuple.key;
//                var xmlPath = tuple.xmlPath;
//                var className = tuple.className;

//                var classTypeDecl = "classType_" + className;
//                var classNameDecl = "className_" + className;
//                var declaringTypeNameDecl = "declaringTypeName_" + className;
//                var classNamespaceDecl = "classNamespace_" + className;
//                var xmlDecl = "xml_" + className;

//                builder.Append(
//    $@"
//    var {classTypeDecl} = typeof({className});
//    var {declaringTypeNameDecl} =  {classTypeDecl}.DeclaringType.Name;
//    var {classNameDecl} = ""{className}"";
//    var {classNamespaceDecl} = {classTypeDecl}.Namespace;
//    var {xmlDecl}2 = @""{xmlPath}"";
//    var {xmlDecl} = File.ReadAllText(@""{xmlPath}"")"

//        );

//                foreach (var kv in sessionKvList)
//                {
//                    var sessionKv = GetAllTypes(new GetAllTypesInputOutput { Type = kv.Value.GetType() }).ToReturn;
//                    foreach (var type in sessionKv.Values)
//                    {
//                        var classTypeName = type.Name;
//                        builder.Append(
//@$"
//        .Replace( ""<{classTypeName}"", $""<{{{declaringTypeNameDecl}}}.{classTypeName}"")
//        .Replace(""</{classTypeName}"", $""</{{{declaringTypeNameDecl}}}.{classTypeName}"")");
//                    }
//                }

//                builder.Append(";");
//                builder.Append(
//    $@"
//    {xmlDecl} = Regex.Replace({xmlDecl}, ""(http://schemas.datacontract.org/2004/07/)[^\""]*"", ""$1"" + {classNamespaceDecl});
//    {className} {key} = null;
//    using (Stream stream = new MemoryStream())
//    {{
//        byte[] data = System.Text.Encoding.UTF8.GetBytes({xmlDecl});
//        stream.Write(data, 0, data.Length);
//        stream.Position = 0;
//        DataContractSerializer deserializer = new DataContractSerializer({classTypeDecl});
//        {key} = ({className})deserializer.ReadObject(stream);
//    }}
//#>
//");
//            });

//            var xmlFilesCreated = tuples.Select(x => x.xmlPath).ToList();

//            return new GetIntroOutput
//            {
//                Builder = builder,
//                XmlFilesCreated = xmlFilesCreated
//            };
//        }
//    }


//}

