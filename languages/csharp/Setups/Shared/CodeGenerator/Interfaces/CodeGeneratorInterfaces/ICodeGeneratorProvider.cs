using CodeGenerator.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CodeGenerator.Interfaces.CodeGeneratorInterfaces
{
    public interface ICodeGeneratorProvider<TData, TFile>
        where TFile : TemplateFile<TData>
    {
        Task<IEnumerable<string>> GetTemplatesWithinDirectoryPathAsync(string directoryPath);
        Task<bool> IsValidTemplateFile(string filePath);
        Task<bool> IsValidTemplateDirectory(string filePath);
        Task<TData> CreateDataAsync(TFile file);
        Task<TFile> GetFileAsync(string filePath);
    }
}
