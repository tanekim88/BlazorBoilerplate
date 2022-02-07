

using CodeGenerator.Interfaces.CodeGeneratorInterfaces;
using CodeGenerator.Models;
using CodeGenerator.Services.CodeGeneratorServices.DefaultCodeGeneratorProviderService_Extension.Models;
using Library.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.JsServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;
using Presentation.Application.Interfaces.TranslationUiServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CodeGenerator.Services.CodeGeneratorServices.DefaultCodeGeneratorProviderService_Extension
{
    public partial class DefaultCodeGeneratorProvider:  ICodeGeneratorProvider<DefaultTemplateData, DefaultTemplateFile, DefaultTemplateTokenInfo>
    {
        private readonly IAssemblyService _assemblyService;
        private readonly IJsService _jsService;
        private readonly IPathService _pathService;
        private readonly IRegexService _regexService;
        private readonly IServiceProvider _serviceProvider;
        private readonly ITemplateService _templateService;
        private readonly ITranslationUiService _translationUiService;
        private readonly IXmlSerializerService _xmlSerializerService;
        private readonly IEvalService _evalService;
        public DefaultCodeGeneratorProvider(
            IRegexService regexService,
            ITemplateService templateParserSetupService,
            IPathService pathService,
            ITranslationUiService translationUiService,
            IAssemblyService assemblyService,
            IXmlSerializerService xmlSerializerService,
            IEvalService evalService,

            IServiceProvider serviceProvider,
            IJsService jsService)
        {
            _regexService = regexService;
            _templateService = templateParserSetupService;
            _pathService = pathService;
            _translationUiService = translationUiService;
            _assemblyService = assemblyService;
            _xmlSerializerService = xmlSerializerService;

            _serviceProvider = serviceProvider;
            _jsService = jsService;
            _evalService = evalService;
        }

        public Task<DefaultTemplateData> CreateDataAsync(DefaultTemplateFile file)
        {
            throw new NotImplementedException();
        }

        public Task<DefaultTemplateFile> GetFileAsync(string filePath)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<string>> GetTemplatesWithinDirectoryPathAsync(string directoryPath)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsValidTemplateDirectory(string filePath)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsValidTemplateFile(string filePath)
        {
            throw new NotImplementedException();
        }
    }
}