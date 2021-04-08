//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Eval" && service.Name == "Eval")

//%t:begin Intro


//%t:end Intro

//%s:begin Header
//%s:end Header




using System;
using Library.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;



namespace Library.Infrastructure.Services.EvalServices
{
    public /*%s:begin Partial*/ partial /*%s:end Partial*/ class EvalService
        : /*%s:begin BaseClass*/ /*%s:end BaseClass*/
            IEvalService
    {
        public const string Prefix = "TemplatePrefix";

        public const string Separator = "____";

        private readonly IAssemblyService _assemblyService;

        /*%s:begin Properties*/
        private readonly IPathService _pathService;
        private readonly IRegexService _regexService;
        private readonly IServiceProvider _serviceProvider;
        private readonly ITemplateService _templateService;

        private readonly IXmlSerializerService _xmlSerializerService;
        /*%s:end Properties*/


        public EvalService(
            /*%s:begin ConstructorParameters*/
            IRegexService regexService,
            ITemplateService templateParserSetupService,
            IPathService pathSetupService,
            IAssemblyService assemblyService,
            IXmlSerializerService xmlSerializerService,
            IServiceProvider serviceProvider
            /*%s:end ConstructorParameters*/
        )
        {
            /*%s:begin ConstructorBody*/
            _regexService = regexService;
            _templateService = templateParserSetupService;
            _pathService = pathSetupService;
            _assemblyService = assemblyService;
            _xmlSerializerService = xmlSerializerService;
            _serviceProvider = serviceProvider;
            /*%s:end ConstructorBody*/
        }


        //%s:begin Body
        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}