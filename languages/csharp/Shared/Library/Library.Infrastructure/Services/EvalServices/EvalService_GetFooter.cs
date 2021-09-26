

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public async Task<GetFooterOutput> GetFooter(
            List<Type> objTypes,
            StringBuilder builder
        )
        {
            var assembly = _assemblyService.GetAssemblyByProjectName(projectName: nameof(Infrastructure)).Payload;

            builder.Append(value: "\n<#+");

            var types = objTypes
                .SelectMany(selector: objType =>
                    GetAllTypes(type : objType).Dic.Values)
                .Distinct();


            foreach (var type in types)
            {
                var attribute = type.GetCustomAttribute<DataContractAttribute>();
                if (attribute != null)
                {
                    builder.Append(value: "\n");
                    if (attribute.IsReference)
                        builder.Append(value: "[DataContract(IsReference = true)]\n");
                    else
                        builder.Append(value: "[DataContract]\n");

                    builder.Append(value: $"public class {type.Name}");

                    if (type.BaseType != null)
                        if (type.BaseType.Name != "Object")
                            builder.Append(value: $":{type.BaseType.Name}");

                    builder.Append(value: " {\n");

                    var props = type.GetProperties(bindingAttr: BindingFlags.Public | BindingFlags.DeclaredOnly |
                                                                BindingFlags.Instance);

                    foreach (var prop in props)
                    {
                        var propAttribute = prop.GetCustomAttribute<DataMemberAttribute>();
                        if (propAttribute != null)
                            builder.Append(
                                value:
                                $"   [DataMember] public {prop.PropertyType.GetSignature()} {prop.Name} {{ get; set; }}\n");
                    }

                    builder.Append(value: "}\n");
                }
            }

            builder.Append(value: "#>");

            return new GetFooterOutput {Builder = builder};
        }
    }
}