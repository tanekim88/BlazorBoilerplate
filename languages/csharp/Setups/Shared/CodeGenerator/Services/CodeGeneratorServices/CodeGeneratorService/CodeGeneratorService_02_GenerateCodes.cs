

using CodeGenerator.Models;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CodeGenerator.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService<TData, TFile> 
    {
        public async Task GenerateCodes(
                List<string> templatePaths
            )
        {
            foreach (var templatePath in templatePaths)
            {
                var file = await _codeGeneratorProvider.GetFileAsync(templatePath);

                var data = await _codeGeneratorProvider.CreateDataAsync(file);

                var processPathsOutput = await ProcessPaths(
                    file: file,
                    data: data
                );


                var processContentsOutput = await ProcessContents(
                    file: file,
                    localTemplateInfosForPaths: processPathsOutput.LocalTemplateInfos,
                    data: data
                );




                //foreach (var templateInfo in templateInfos)
                //{
                //    var content = templateInfo.TemplateContent;
                //    var codeType = file.CodeType;

                //    content = codeType.RemoveCommandStrings(intputString: content);
                //    content = codeType.AlignSingleLineTemplateCommands(intputString: content);
                //    content = codeType.ReplaceIgnoredNamesInContent(inputString: content);
                //    content = _templateService.ParseTemplate(content, data);

                //    if (file.ShouldOverWrite || !File.Exists(path: templateInfo.OutputFilePath))
                //    {
                //        if (templateInfo.OutputFilePath.EndsWith(".cs"))
                //        {
                //            try
                //            {
                //                var tree = CSharpSyntaxTree.ParseText(content);
                //                var root = tree.GetRoot().NormalizeWhitespace();
                //                content = root.ToFullString();
                //            }
                //            catch (Exception e) { }
                //        }

                //        File.WriteAllText(path: templateInfo.OutputFilePath, contents: content);
                //    }
                //}
            }
        }
    }
}