

using System;
using System.Linq;
using System.Runtime.Serialization;



namespace SetupLibrary.Application.Models
{
    [DataContract(IsReference = true)]
    public class TemplateStore : ICloneable
    {
        //public List<TemplateFile> Files { get; set; } = new();
        public DateTime StartTime { get; set; }

        public IGrouping<string, TemplateFile> FileGroup { get; set; }


        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}