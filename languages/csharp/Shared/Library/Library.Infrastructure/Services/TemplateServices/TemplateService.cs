//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Template" && service.Name == "Template")

//%t:begin Intro


//%t:end Intro

//%s:begin Header

//%s:end Header




using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;
using Scriban;
using System;
using System.IO;
using System.Threading.Tasks;
using static SharedLibrary.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces.ISharedTemplateService;

namespace Library.Infrastructure.Services.TemplateServices
{
    public /*%s:begin Partial*/ /*%s:end Partial*/ class TemplateService
        : /*%s:begin BaseClass*/ /*%s:end BaseClass*/ ITemplateService
    {
        /*%s:begin Properties*/
        private readonly IPathService _pathService;
        /*%s:end Properties*/

        public TemplateService(
            /*%s:begin ConstructorParameters*/
            IPathService PathService
        /*%s:end ConstructorParameters*/
        )
        {
            /*%s:begin ConstructorBody*/
            _pathService = PathService;
            /*%s:end ConstructorBody*/
        }


        //%s:begin Body

        public async Task<ParseTemplateOutput> ParseTemplate<TArgs>(
            string inputContent,
            string outputFile,
            TArgs args
        )
        {
            try
            {
                Template template = Template.Parse(inputContent);  // Parses and compiles the template
                string outputContent = template.Render(args, member => member.Name); // Renders the output => "hi tobi"


                return new ParseTemplateOutput
                {
                    Success = true,
                    OutputContent = outputContent
                };
            }
            catch (Exception e)
            {

            }

            return new ParseTemplateOutput
            {
                Success = false,
                OutputContent = ""
            };
        }


        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}