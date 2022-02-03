using Library.Application.Interfaces.ServiceInterfaces.AssemblyServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.JsServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.RegexServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;
using Library.Infrastructure.Services.AssemblyServices;
using Library.Infrastructure.Services.EvalServices;
using Library.Infrastructure.Services.JsServices;
using Library.Infrastructure.Services.PathServices;
using Library.Infrastructure.Services.RegexServices;
using Library.Infrastructure.Services.SerializerServices;
using Library.Infrastructure.Services.TemplateServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using CodeGenerator.Services.CodeGeneratorServices;
using CodeGenerator.Services.DatabaseSetupServices;
using Presentation.Application.Interfaces.TranslationUiServiceInterfaces;
using Presentation.Infrastructure.Services.TranslationServices;

namespace CodeGenerator.Exts.IServiceCollectionExts
{
    public static class AddSetupServicesExtension
    {
        public static IServiceCollection AddCustomSetupServices(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddSingleton<DatabaseSetupService>();

            services.AddSingleton<GeoTargetsDatabaseSetupService>();

            services.AddSingleton<IPathService, PathService>();

            services.AddSingleton<IRegexService, RegexService>();
            services.AddSingleton<ITemplateService, TemplateService>();
            services.AddSingleton<IPathService, PathService>();
            services.AddSingleton<ITranslationUiService, TranslationUiService>();
            services.AddSingleton<IAssemblyService, AssemblyService>();
            services.AddSingleton<IXmlSerializerService, XmlSerializerService>();
     
            services.AddSingleton<IJsService, JsService>();
            services.AddSingleton<IEvalService, EvalService>();
            services.AddSingleton<CodeGeneratorService>();

            return services;
        }
    }
}