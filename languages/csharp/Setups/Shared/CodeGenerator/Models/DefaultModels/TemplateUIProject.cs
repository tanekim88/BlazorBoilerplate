

using System.Collections.Generic;
using System.Runtime.Serialization;



namespace CodeGenerator.Models
{
    
    public class TemplateUIProject : TemplateProject
    {
         public List<TemplateLocalization> Localizations { get; set; }
    }
}