

using System;



namespace CodeGenerator.Attributes
{
    public class PropertyPathsAliasAttribute : Attribute
    {
        public PropertyPathsAliasAttribute(string[] propertyPaths)
        {
            PropertyPaths = propertyPaths;
        }

        public string[] PropertyPaths { get; set; }
    }
}