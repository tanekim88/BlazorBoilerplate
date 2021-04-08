

using System;



namespace SharedCore.Domain.Attributes.ServiceAttributes
{
    [AttributeUsage(validOn: AttributeTargets.Class)]
    public class ServiceLifetimeAttribute : Attribute
    {
        public ServiceLifetimeAttribute(string name)
        {
            Name = name;
        }

        public virtual string Name { get; }
    }
}