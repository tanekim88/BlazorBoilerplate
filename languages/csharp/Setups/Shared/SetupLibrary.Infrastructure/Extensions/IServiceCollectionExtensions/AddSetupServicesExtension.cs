

using Auth.Infrastructure.DbContexts;
using Auth.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
using Core.Infrastructure.DbContexts;
using Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions;
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
using Presentation.Application.Interfaces.TranslationUiServiceInterfaces;
using Presentation.Infrastructure.Services.TranslationServices;
using SetupLibrary.Infrastructure.Services.CodeGeneratorServices;
using SetupLibrary.Infrastructure.Services.DatabaseSetupServices;
using System;



namespace SetupLibrary.Infrastructure.Exts.IServiceCollectionExts
{
    public static class AddSetupServicesExtension
    {
        public static IServiceCollection AddCustomSetupServices(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddSingleton<DatabaseSetupService>();

            services.AddSingleton<GeoTargetsDatabaseSetupService>();
            services.AddSingleton<ReferencesDatabaseSetupService>();


            services.AddCustomAuthServer(configuration, environment);
            services.AddCustomDbContextPool<AuthDbContext>(configuration);
            services.AddCustomDbContext<AuthDbContext>(configuration);


            services.AddSingleton<IPathService, PathService>();

            services.AddSingleton<IRegexService, RegexService>();
            services.AddSingleton<ITemplateService, TemplateService>();
            services.AddSingleton<IPathService, PathService>();
            services.AddSingleton<ITranslationUiService, TranslationUiService>();
            services.AddSingleton<IAssemblyService, AssemblyService>();
            services.AddSingleton<IXmlSerializerService, XmlSerializerService>();
            services.AddSingleton<IEvalService, EvalService>();
            services.AddSingleton<IJsService, JsService>();
            services.AddSingleton<CodeGeneratorService>();

            return services;
        }
    }
}