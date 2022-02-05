using System;
using System.Collections.Generic;
using System.Reflection;



namespace CodeGenerator.Models
{

    public class TemplateProject<TData, TFile> : TemplateBase, ICloneable where TFile : TemplateFile<TData>
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public TData Data { get; set; }
        public string BaseName { get; set; }
        public TemplateCodeType CodeType { get; set; } = new();
        public string GeneratorSymbol { get; set; }

        public string ProjectFilePath { get; set; }

        public string ProjectDirPath { get; set; }

        public Assembly Assembly { get; set; }

        public HashSet<TFile> Files { get; set; }

        public List<TemplateProject<TData, TFile>> DependentProjects { get; set; }

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}