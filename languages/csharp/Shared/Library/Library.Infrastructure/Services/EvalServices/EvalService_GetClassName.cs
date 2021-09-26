

using System;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {
        public GetClassNameOutput GetClassName(Type type)
        {
            var assemblyName = type.Assembly.GetName().Name;
            var fullName = type.FullName;
            var finalName =
                $"{Prefix}{Separator}{assemblyName}{Separator}{fullName}".Replace(oldValue: ".", newValue: "_");

            return new GetClassNameOutput {ClassName = finalName};
        }
    }
}