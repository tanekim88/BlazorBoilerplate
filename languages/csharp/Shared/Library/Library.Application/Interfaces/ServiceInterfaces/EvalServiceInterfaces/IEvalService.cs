

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;



namespace Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces
{
    public interface IEvalService
    {
        Task<EvaluateExpressionOutput<Targs>> Evaluate<Targs>(string code, Targs data);

        public class GetAllTypesOutput
        {
            public Type Type { get; set; }
            public IDictionary<string, Type> Dic { get; set; }
        }

        GetAllTypesOutput GetAllTypes(
                   Type type,
                   IDictionary<string, Type> dic = null
                   );
        GetClassNameOutput GetClassName(Type type);

        Task<GetIntroOutput> GetParametersTemplate(
            string template,
            string xmlFilePathPrefix,
            IDictionary<string, object> parameters = null,
            bool shouldInlineXml = false
        );

        GetTypeFromClassNameOutput GetTypeFromClassName(string className);
                public record ProcessOutput
        {
            public StringBuilder Builder { get; set; }
            public List<XmlData> ListOfXmlData { get; set; }
        }
        Task<ProcessOutput> Process(Func<StringBuilder, Task<StringBuilder>> bodyBuilder, string templateId,
            dynamic parametersInput, List<Type> localTypes, string resultVariableName = null,
            string xmlFilePathPrefix = null);

        public record ExpressionCodeRecord
        {
            public string Id { get; set; }
            public string Expression { get; set; }
            public Dictionary<string, object> LocalParameters { get; set; }
            public string ContextTemplate { get; set; }
        }

        public record ExpressionCodeResult<T>
        {
            public string Id { get; set; }
            public T Result { get; set; }
        }

        public record EvaluateBulkExpressionsOutput<T>
        {
            public List<ExpressionCodeResult<T>> Payloads { get; set; }
        }

        public record StatementCodeRecord
        {
            public string Id { get; set; }
            public string Code { get; set; }
            public Dictionary<string, object> LocalParameters { get; set; }
            public string ContextTemplate { get; set; }
        }

        public record StatementCodeResult<T>
        {
            public string Id { get; set; }
            public T Result { get; set; }
        }

        public record EvaluateBulkStatementsOutput<T>
        {
            public List<StatementCodeResult<T>> Payloads { get; set; }
        }

        public record EvalCodeRecord
        {
            public string Id { get; init; }
            public string BodyCode { get; init; }
            public Dictionary<string, object> LocalParameters { get; set; }
            public string ContextTemplate { get; set; }
            public List<string> Sections { get; set; }
            public List<string> TemplateSections { get; set; }
        }

        public record TemplateCodeResult
        {
            public string Id { get; init; }
            public string Content { get; init; }
        }


        public record EvaluateBulkTemplatesOutput
        {
            public List<TemplateCodeResult> Payloads { get; set; }
        }

        public record EvaluateExpressionOutput<T>
        {
            public T Payload { get; set; }
        }


        public record EvaluateStatementsOutput<T>
        {
            public T Payload { get; set; }
        }

        public record EvalutateTemplateOutput
        {
            public bool Success { get; set; }
            public string OutputContent { get; set; }
        }

        public record GetClassNameOutput
        {
            public string ClassName { get; set; }
        }

        public record GetFooterOutput
        {
            public StringBuilder Builder { get; set; }
        }

        public record GetHeaderOutput
        {
            public StringBuilder Builder { get; set; }
        }

        public record GetIntroOutput
        {
            public string ParametersTemplate { get; set; }
            public List<XmlData> ListOfXmlData { get; set; }
        }

        public record XmlData
        {
            public string Key { get; set; }
            public string Xml { get; set; }
            public string ClassName { get; set; }
            public string FilePath { get; set; }
        }

        public record GetTypeFromClassNameOutput
        {
            public Type Type { get; set; }
        }


    }
}