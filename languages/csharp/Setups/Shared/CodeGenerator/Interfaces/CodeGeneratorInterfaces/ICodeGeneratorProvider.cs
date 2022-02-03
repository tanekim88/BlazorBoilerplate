using CodeGenerator.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CodeGenerator.Interfaces.CodeGeneratorInterfaces
{
    public interface ICodeGeneratorProvider<TData>
    {
        Task<string> GetVisualStudioSlnPathAsync(string fileOrDirectoryPath);
        Task<IEnumerable<string>> GetTemplatesWithinDirectoryPathAsync(string directoryPath);
        Task<bool> IsValidTemplateFile(string filePath);
        Task<bool> IsValidTemplateDirectory(string filePath);
        Task<TData> CreatePreDataAsync(TemplateFile file);
        Task<TData> CreateDataAsync(TemplateFile file, IEnumerable<TemplateTokenInfo> tokenIfos);
        Task<IEnumerable<TemplateProject>> GetProjectDependencies(TemplateProject project);
        Task<TemplateProject> GetProjectFromFilePathAsync(string filePath);
    }
}
