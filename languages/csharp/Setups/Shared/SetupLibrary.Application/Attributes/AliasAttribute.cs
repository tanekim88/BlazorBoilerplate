

using System;



namespace SetupLibrary.Application.Attributes
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