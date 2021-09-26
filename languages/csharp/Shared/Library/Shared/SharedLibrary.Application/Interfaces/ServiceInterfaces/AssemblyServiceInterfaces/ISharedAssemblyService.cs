

using System.Collections.Generic;
using System.Reflection;



namespace SharedLibrary.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces
{
    public interface ISharedAssemblyService
    {
        GetAssembliesOutput GetAssemblies();

        GetAssemblyByProjectNameOutput GetAssemblyByProjectName(string projectName);

        GetAssemblyByProjectFilePathOutput GetAssemblyByProjectPath(string projectFilePath);

        public record GetAssembliesOutput
        {
            public List<Assembly> Payload { get; init; }
        }

        public record GetAssemblyByProjectNameOutput
        {
            public Assembly Payload { get; init; }
        }

        public record GetAssemblyByProjectFilePathOutput
        {
            public Assembly Assembly { get; init; }
        }
    }
}