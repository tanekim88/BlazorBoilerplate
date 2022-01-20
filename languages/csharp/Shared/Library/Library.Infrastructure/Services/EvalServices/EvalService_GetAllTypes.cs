

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace Library.Infrastructure.Services.EvalServices
{
    public partial class EvalService
    {

        public GetAllTypesOutput GetAllTypes(
           Type type,
           IDictionary<string, Type> dic = null
           )
        {
            var (typeResult, dicResult) = GetAllTypes_Helper(type, dic);
            return new GetAllTypesOutput
            {
                Type = typeResult,
                Dic = dicResult
            };
        }

        private (Type type, IDictionary<string, Type> dic) GetAllTypes_Helper(
            Type type,
            IDictionary<string, Type> dic = null
            )
        {
            var n = type.Name;

            if (dic == null) dic = new Dictionary<string, Type>();
            if (!type.FullName.StartsWith(value: "System.")) dic[key: type.FullName] = type;

            var isDict = type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Dictionary<,>);
            if (isDict)
            {
                Type valueType = type.GetGenericArguments()[1];

                (type, dic) = GetAllTypes_Helper(
                type = valueType, dic = dic);
            }

            if (type.BaseType != null)
            {
                if (type.BaseType.Name != "Object")
                {
                    var (baseType, baseDic) = GetAllTypes_Helper(type: type.BaseType, dic: dic);
                }
            }

            var properties =
                type.GetProperties(bindingAttr: BindingFlags.Public | BindingFlags.Instance |
                                                BindingFlags.DeclaredOnly);
            foreach (var property in properties)
            {
                var propertyType = property.PropertyType;
                if (!dic.TryGetValue(key: propertyType.FullName, value: out var o))
                {
                    if (propertyType.IsGeneric() && propertyType.IsEnumerableType())
                    {
                        var isDict2 = propertyType.IsGenericType &&
                                      propertyType.GetGenericTypeDefinition() == typeof(Dictionary<,>);
                        if (isDict2)
                        {
                            Type keyType = propertyType.GetGenericArguments()[0];
                            Type valueType = propertyType.GetGenericArguments()[1];

                            (type, dic) =
                                GetAllTypes_Helper(type: valueType, dic: dic);
                        }
                        else
                        {
                            var elemType = GetAnyElementType(type: propertyType);
                            if (!elemType.FullName.StartsWith(value: "System."))
                                (type, dic) = GetAllTypes_Helper(type: elemType, dic: dic);
                        }
                    }
                    else if (propertyType.IsClass && !propertyType.FullName.StartsWith(value: "System."))
                    {
                        (type, dic) = GetAllTypes_Helper(type: propertyType, dic: dic);
                    }
                }
            }

            return (type, dic);
        }

        public static Type GetAnyElementType(Type type)
        {
            // Type is Array
            // short-circuit if you expect lots of arrays 
            if (type.IsArray)
                return type.GetElementType();

            // type is IEnumerable<T>;
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                return type.GetGenericArguments()[0];

            // type implements/extends IEnumerable<T>;
            var enumType = type.GetInterfaces()
                .Where(predicate: t => t.IsGenericType &&
                                       t.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                .Select(selector: t => t.GenericTypeArguments[0]).FirstOrDefault();
            return enumType ?? type;
        }
    }
}