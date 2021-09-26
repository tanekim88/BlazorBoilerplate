

using System;
using System.ComponentModel;
using System.Globalization;



namespace SharedLibrary.Application.TypeConverters
{
    public class DescriptionEnumConverter : EnumConverter
    {
        public DescriptionEnumConverter(Type type) : base(type: type)
        {
        }

        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            return sourceType == typeof(string) ||
                   TypeDescriptor.GetConverter(type: typeof(Enum))
                       .CanConvertFrom(context: context, sourceType: sourceType);
        }

        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
        {
            if (value is string)
                return GetEnumValue(value: EnumType, description: (string) value);
            if (value is Enum)
                return GetEnumDescription(value: (Enum) value);
            return base.ConvertFrom(context: context, culture: culture, value: value);
        }

        public override object ConvertTo(ITypeDescriptorContext context, CultureInfo culture, object value,
            Type destinationType)
        {
            return value is Enum && destinationType == typeof(string)
                ? GetEnumDescription(value: (Enum) value)
                : value is string && destinationType == typeof(string)
                    ? GetEnumDescription(value: EnumType, name: (string) value)
                    : base.ConvertTo(context: context, culture: culture, value: value,
                        destinationType: destinationType);
        }

        public static string GetEnumDescription(Enum value)
        {
            var fieldInfo = value.GetType().GetField(name: value.ToString());
            var attributes =
                (DescriptionAttribute[]) fieldInfo.GetCustomAttributes(attributeType: typeof(DescriptionAttribute),
                    inherit: false);
            return attributes.Length > 0 ? attributes[0].Description : value.ToString();
        }

        public static string GetEnumDescription(Type value, string name)
        {
            var fieldInfo = value.GetField(name: name);
            var attributes =
                (DescriptionAttribute[]) fieldInfo.GetCustomAttributes(attributeType: typeof(DescriptionAttribute),
                    inherit: false);
            return attributes.Length > 0 ? attributes[0].Description : name;
        }

        public static object GetEnumValue(Type value, string description)
        {
            var fields = value.GetFields();
            foreach (var fieldInfo in fields)
            {
                var attributes =
                    (DescriptionAttribute[]) fieldInfo.GetCustomAttributes(attributeType: typeof(DescriptionAttribute),
                        inherit: false);
                if (attributes.Length > 0 && attributes[0].Description == description)
                    return fieldInfo.GetValue(obj: fieldInfo.Name);
                if (fieldInfo.Name == description)
                    return fieldInfo.GetValue(obj: fieldInfo.Name);
            }

            return description;
        }
    }
}