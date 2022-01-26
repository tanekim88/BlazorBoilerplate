

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using Humanizer;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateContext : ICloneable
    {
        [DataMember] public TemplateProject Project { get; set; }
        [DataMember] public TemplateFile File { get; set; }
        [DataMember] public TemplateEntity Entity { get; set; }

        [DataMember] public TemplateProject ApplicationProject { get; set; }
        [DataMember] public TemplateProject SharedApplicationProject { get; set; }

        [DataMember] public TemplateProject DomainProject { get; set; }
        [DataMember] public TemplateProject SharedDomainProject { get; set; }

        [DataMember] public TemplateProject InfrastructureProject { get; set; }
        [DataMember] public TemplateProject SharedInfrastructureProject { get; set; }


        public object Clone()
        {
            return MemberwiseClone();
        }

        public void Reset()
        {
            foreach (var propertyInfo in GetType().GetProperties()) propertyInfo.SetValue(obj: this, value: null);
        }

        public static TemplateContext CombineCurrents(List<TemplateContext> templateCurrents)
        {
            var toReturn = templateCurrents.Aggregate(seed: new TemplateContext(), func: (acc, curr) =>
            {
                var propertyInfos = acc.GetType().GetProperties();
                foreach (var propertyInfo in propertyInfos)
                {
                    var currVal = propertyInfo.GetValue(obj: curr);

                    if (currVal != null) propertyInfo.SetValue(obj: acc, value: currVal);
                }

                return acc;
            });

            return toReturn;
        }

        public TemplateContext GetUpdatedCurrent(object obj)
        {
            var names = typeof(TemplateData).GetProperties().Select(selector: p => p.Name.Singularize()).ToList();

            var toReturn = (TemplateContext)MemberwiseClone();
            var objectType = obj.GetType();
            var currentProperties = GetType().GetProperties();

            foreach (var propertyInfo in currentProperties)
            {
                if (propertyInfo.PropertyType == objectType)
                {
                    if (propertyInfo.Name != nameof(Project) && propertyInfo.Name != nameof(File))
                    {
                        if (names.Contains(item: propertyInfo.Name))
                        {
                            propertyInfo.SetValue(obj: toReturn, value: obj);
                            return toReturn;
                        }
                    }
                }
            }

            return this;
        }
    }
}