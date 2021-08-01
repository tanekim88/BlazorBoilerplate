using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CodeGenerator.Options
{
    internal class GeneralOptions : BaseOptionModel<GeneralOptions>
    {
        [Category("My category")]
        [DisplayName("Is it enabled?")]
        [Description("Specifies the text to show in the message box")]
        [DefaultValue(true)]
        public bool Enabled { get; set; } = true;


        [Category("My category")]
        [DisplayName("Message box text")]
        [Description("Specifies the text to show in the message box")]
        [DefaultValue("My message")]
        public string Message { get; set; } = "My message";

        [Category("My category")]
        [DisplayName("Enums")]
        [Description("Specifies the text to show in the message Enum")]
        [DefaultValue(CodeGeneratorEnum.Enum1)]
        [TypeConverter(typeof(DescriptionEnumConverter))]
        public CodeGeneratorEnum Profile { get; set; } = CodeGeneratorEnum.Enum1;

        public enum CodeGeneratorEnum
        {
            [Description("HI")]
            Enum1,
            Enum2
        }
    }

    public class DescriptionEnumConverter : EnumConverter
    {
        public DescriptionEnumConverter(Type type) : base(type)
        {
        }

        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            return sourceType == typeof(string) || TypeDescriptor.GetConverter(typeof(Enum)).CanConvertFrom(context, sourceType);
        }

        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
        {
            if (value is string)
                return GetEnumValue(EnumType, (string)value);
            if (value is Enum)
                return GetEnumDescription((Enum)value);
            return base.ConvertFrom(context, culture, value);
        }

        public override object ConvertTo(ITypeDescriptorContext context, CultureInfo culture, object value, Type destinationType)
        {
            return value is Enum && destinationType == typeof(string)
                ? GetEnumDescription((Enum)value)
                : (value is string && destinationType == typeof(string)
                  ? GetEnumDescription(EnumType, (string)value)
                  : base.ConvertTo(context, culture, value, destinationType));
        }

        public static string GetEnumDescription(Enum value)
        {
            var fieldInfo = value.GetType().GetField(value.ToString());
            var attributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return (attributes.Length > 0) ? attributes[0].Description : value.ToString();
        }

        public static string GetEnumDescription(Type value, string name)
        {
            var fieldInfo = value.GetField(name);
            var attributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return (attributes.Length > 0) ? attributes[0].Description : name;
        }

        public static object GetEnumValue(Type value, string description)
        {
            var fields = value.GetFields();
            foreach (var fieldInfo in fields)
            {
                var attributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (attributes.Length > 0 && attributes[0].Description == description)
                    return fieldInfo.GetValue(fieldInfo.Name);
                if (fieldInfo.Name == description)
                    return fieldInfo.GetValue(fieldInfo.Name);
            }
            return description;
        }
    }
}
