//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Template" && service.Name == "Template")

//%t:begin Intro
//%t:end Intro

//%s:begin Header
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces;
using Scriban;
using System;
using Scriban.Parsing;
using Scriban.Runtime;
using Scriban.Syntax;
using System.Collections;
using System.Threading.Tasks;
using static SharedLibrary.Application.Interfaces.ServiceInterfaces.TemplateServiceInterfaces.ISharedTemplateService;
using System.Collections.Generic;
using Humanizer;
//%s:end Header





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
            TArgs data
        )
        {
            try
            {
                Template template = Template.Parse(inputContent);

                var context = new TemplateContext { MemberRenamer = member => member.Name };

                ((ScriptObject)context.BuiltinObject["string"]).Import("camelize", new Func<string, string>((arg) => arg.ToLower()));
                
                ((ScriptObject)context.BuiltinObject["array"]).Import("camelize", new Func<IEnumerable, IEnumerable>((arg) =>
                {
                    var toReturn = new List<string>();

                    foreach (var item in arg)
                    {
                        toReturn.Add(item.ToString().Camelize());
                    }

                    return toReturn;
                }));

                ((ScriptObject)context.BuiltinObject["array"]).Import("exists", Exists);

                var scriptObject = new ScriptObject();

                scriptObject.Import(data, renamer: member => member.Name);

                context.PushGlobal(scriptObject);

                string outputContent = template.Render(context);

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

        public static bool Exists(TemplateContext context, SourceSpan span, IEnumerable list, object function)
        {
            if (function is string)
            {
                foreach (var item in list)
                {
                    if (item.Equals(function))
                    {
                        return true;
                    }
                }

                return false;
            }


            var scriptingFunction = function as IScriptCustomFunction;
            if (scriptingFunction == null)
            {
                throw new ArgumentException($"The parameter `{function}` is not a function. Maybe prefix it with @?", nameof(function));
            }

            var parType = scriptingFunction.GetParameterInfo(0).ParameterType;

            var callerContext = context.CurrentNode;

            var arg = new ScriptArray(1);
            foreach (var item in list)
            {
                var itemToTransform = context.ToObject(span, item, parType);
                arg[0] = itemToTransform;
                var itemTransformed = ScriptFunctionCall.Call(context, callerContext, scriptingFunction, arg);
                if (context.ToBool(span, itemTransformed))
                {
                    return true;
                }
            }

            return false;
        }

        //%s:end Body
    }
}