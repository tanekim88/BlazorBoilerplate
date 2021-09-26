﻿

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SetupLibrary.Application.Models;
using static Library.Application.Interfaces.ServiceInterfaces.EvalServiceInterfaces.IEvalService;



namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices
{
    public partial class CodeGeneratorService
    {
        public async Task<ProcessRunIfsOutput> ProcessBulkRunIfs(
             Dictionary<string, object> parameters ,
             List<ProcessRunIfs_Record> records 
        )
        {

            var expressionRecords = records.SelectMany(selector: record =>
            {
                var file = record.File;
                var templateRecords = record.EvalCodeRecords;
                var codeType = file.CodeType;


                return templateRecords.Select(selector: async tempRecord =>
                {
                    var sections = tempRecord.Sections;
                    var templateSections = tempRecord.TemplateSections;

                    var commandContent = GetFirstCommandContent(
                        inputString: tempRecord.BodyCode, command: TemplateCommand.RunIf, codeType: codeType);

                    if (string.IsNullOrEmpty(value: commandContent)) return null;

                    var project = file.Project;

                    var contextTemplateResult = await GetContextTemplate(
                        fileTemplatePath : file.TemplatePath,
                        project : project,
                        sections :sections,
                        templateSections : templateSections
                    );

                    return new ExpressionCodeRecord
                    {
                        Id = tempRecord.Id,
                        Expression = commandContent,
                        LocalParameters = file.LocalParameters,
                        ContextTemplate = contextTemplateResult.Template
                    };
                });
            }).Select(selector: x => x.Result).Where(predicate: x => x != null).ToList();


            var result = await _evalService.EvaluateBulkExpressions<bool>(
                expressionRecords: expressionRecords,
                parameters: parameters,
                localTypes: new List<Type>
                {
                    typeof(TemplateContext)
                }
            );

            var idsToExclude = result.Payloads.Where(predicate: o => !o.Result).Select(selector: o => o.Id).ToList();

            var templateCodeRecords = records.SelectMany(selector: x =>
            {
                var toReturn = x.EvalCodeRecords.Select(selector: y =>
                {
                    return new TemplateCodeRecord
                    {
                        BodyCode = y.BodyCode,
                        CodeType = x.File.CodeType,
                        Id = y.Id,
                        LocalParameters = y.LocalParameters,
                        Sections = y.Sections,
                        TemplateSections = y.TemplateSections
                    };
                });

                return toReturn;
            }).Where(predicate: x => !idsToExclude.Contains(item: x.Id)).ToList();


            return new ProcessRunIfsOutput
            {
                TemplateCodeRecords = templateCodeRecords
            };
        }

        public record TemplateCodeRecord
        {
            public string Id { get; init; }
            public string BodyCode { get; set; }
            public List<string> Sections { get; set; }
            public List<string> TemplateSections { get; set; }
            public Dictionary<string, object> LocalParameters { get; set; }
            public TemplateCodeType CodeType { get; set; }
        }

        public record ProcessRunIfs_Record
        {
            public TemplateFile File { get; init; }
            public List<EvalCodeRecord> EvalCodeRecords { get; init; }
        }


        public record ProcessRunIfsOutput
        {
            public List<TemplateCodeRecord> TemplateCodeRecords { get; init; }
        }
    }
}