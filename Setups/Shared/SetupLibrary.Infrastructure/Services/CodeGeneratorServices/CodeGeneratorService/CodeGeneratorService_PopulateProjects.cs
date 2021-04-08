

using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using AutoMapper.Internal;
using SetupLibrary.Application.Models;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public void PopulateProjects(TemplateData data)
        {
            foreach (var project in data.Projects)
            {
                project.Services = new List<TemplateService>();
                project.Models = new List<TemplateModel>();
                project.Localizations = new List<TemplateLocalization>();

                if (data.Services is not null) {
                    project.Services = data.Services.Where(
                        predicate: service => service.Project.Name == project.Name)
                        .ToList();
                }

                if (data.Models is not null)
                    project.Models = data.Models.Where(
                        predicate: model => model.Project.Name == project.Name).ToList();

                if (data.Entities is not null)
                    project.Entities = data.Entities.Where(
                        predicate: entity => entity.Project.Name == project.Name).ToList();

                if (data.Localizations is not null)
                    project.Localizations = data.Localizations.Where(
                        predicate: localization => localization.Project.Name == project.Name)
                        .ToList();
            }
        }


        public void PopulateProjectHelper(object obj, ConcurrentDictionary<string, TemplateProject> projDic)
        {
            if (obj != null)
            {
                var objectType = obj.GetType();

                if (objectType.IsEnumerableType() && objectType.IsGenericType)
                {
                    var isDict = objectType.IsGenericType &&
                                 objectType.GetGenericTypeDefinition() == typeof(Dictionary<,>);
                    if (isDict)
                    {
                        var objDic = (IDictionary) obj;
                        //Dic
                        var keyType = objectType.GetGenericArguments()[0];
                        var valueType = objectType.GetGenericArguments()[1];

                        foreach (var o in objDic.Values) PopulateProjectHelper(obj: o, projDic: projDic);
                    }
                    else
                    {
                        //List
                        var elementType = GetAnyElementType(type: objectType);
                        var objList = (IEnumerable) obj;

                        foreach (var o in objList) PopulateProjectHelper(obj: o, projDic: projDic);
                    }
                }
                else
                {
                    var isSystemType = objectType.FullName.StartsWith(value: "System.");

                    if (objectType.IsClass && !isSystemType)
                    {
                        foreach (var propInfo in objectType.GetProperties())
                            if (propInfo.PropertyType == typeof(TemplateProject))
                            {
                                var finalValue = (TemplateProject) propInfo.GetValue(obj: obj);
                                if (finalValue != null)
                                    propInfo.SetValue(obj: obj, value: projDic[key: finalValue.Name]);
                            }
                            else
                            {
                                var v = propInfo.GetValue(obj: obj);

                                PopulateProjectHelper(obj: v, projDic: projDic);
                            }
                    }
                }
            }
        }
    }
}