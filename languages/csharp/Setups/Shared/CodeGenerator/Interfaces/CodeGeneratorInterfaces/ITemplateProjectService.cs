using CodeGenerator.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CodeGenerator.Interfaces.CodeGeneratorInterfaces
{
    public interface ITemplateProjectService<TData,TFile>
    {
        Task<List<TemplateProject<TData, TFile>> GetDependentProjects(TemplateProject projects);
    }
}
