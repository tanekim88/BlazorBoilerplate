

using CodeGenerator.Interfaces.CodeGeneratorInterfaces;
using CodeGenerator.Models;
using Library.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.JsServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;
using Presentation.Application.Interfaces.TranslationUiServiceInterfaces;
using System;


namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData, TFile> where TFile : TemplateFile<TData>
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
        private readonly ICodeGeneratorProvider<TData, TFile> _codeGeneratorProvider;
        public CodeGeneratorService(
            IRegexService regexService,
            ITemplateService templateParserSetupService,
            IPathService pathService,
            ITranslationUiService translationUiService,
            IAssemblyService assemblyService,
            IXmlSerializerService xmlSerializerService,
            IEvalService evalService,
         
            IServiceProvider serviceProvider,
            IJsService jsService,
            ICodeGeneratorProvider<TData, TFile> codeGeneratorProvider)
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
            _codeGeneratorProvider = codeGeneratorProvider;
        }
    }
}