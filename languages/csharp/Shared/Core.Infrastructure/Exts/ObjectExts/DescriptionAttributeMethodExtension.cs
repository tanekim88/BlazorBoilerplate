

using System.ComponentModel;
using System.Reflection;



namespace Core.Infrastructure.Exts.ObjectExtensions
{
    public static class DescriptionAttributeMethodExtension
    {
        public static GetDescriptionAttributeValueOutput GetDescriptionAttributeValue<T>(this T source)
        {
            FieldInfo fi = source.GetType().GetField(name: source.ToString());

            DescriptionAttribute[] attributes = (DescriptionAttribute[]) fi.GetCustomAttributes(
                attributeType: typeof(DescriptionAttribute), inherit: false);

            var success = false;
            var value = source.ToString();
            if (attributes != null && attributes.Length > 0)
            {
                success = true;
                value = attributes[0].Description;
            }

            return new GetDescriptionAttributeValueOutput
            {
                Success = success,
                Value = value
            };
        }

        public class GetDescriptionAttributeValueOutput
        {
            public bool Success { get; set; }
            public string Value { get; set; }
        }
    }
}