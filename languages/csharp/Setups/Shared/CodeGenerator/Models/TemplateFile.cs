

using System.Collections.Generic;



namespace CodeGenerator.Models
{

    public class TemplateFile<TData> : TemplateBase
    {
        public string FileName { get; set; }

        //public string GenType { get; set; }

        //public bool HasPartialRef { get; set; }

        //public string PartialRefContent { get; set; }
        //public bool ShouldOverWrite { get; set; }

        //public bool ShouldPartiallyOverWrite { get; set; }

        //public bool ShouldFinalize { get; set; }

        //public TemplateProject<TData, TemplateFile<TData>> Project { get; set; } = new();

        public string ProcessedFileName { get; set; }

        public List<TemplateTokenInfo<TData>> tokenInfos { get; set; }

        public string Content { get; set; }

        public string ProcessedFilePath { get; set; }

        public string FilePath { get; set; }

        // public string XmlPath { get; set; }

        public string Extension { get; set; }

        public TemplateCodeType CodeType { get; set; } = new();

        //public List<TemplateDirectory> Directories { get; set; }

        //public Dictionary<string, TemplateSection> SectionsDict { get; set; }

        //public List<TemplateSection> Sections { get; set; }
        //public Dictionary<string, TemplateSection> TemplateSectionsDict { get; set; }
        //public List<TemplateSection> TemplateSections { get; set; }
    }
}