import { Module } from '@nestjs/common';


import { WebpackRulesModule } from '@shared/src/webpack/rules/webpack-rules.module';
import { CustomModule } from '@shared/src/functions/process-webpack-providers';
import { BlazorAppWebpackRulesConfigService, BlazorAppWebpackRulesService } from './webpack-rules/webpack-rules.service';
import { BlazorAppWebpackCsvRulesService } from './webpack-csv-rules/webpack-csv-rules.service';
import { BlazorAppWebpackFontRulesService } from './webpack-font-rules/webpack-font-rules.service';
import { BlazorAppWebpackImageRulesService } from './webpack-image-rules/webpack-image-rules.service';
import { BlazorAppWebpackJsonRulesService } from './webpack-json-rules/webpack-json-rules.service';
import { BlazorAppWebpackStyleRulesService } from './webpack-style-rules/webpack-style-rules.service';
import { BlazorAppWebpackSvgRulesService } from './webpack-svg-rules/webpack-svg-rules.service';
import { BlazorAppWebpackTsRulesService } from './webpack-ts-rules/webpack-ts-rules.service';
import { BlazorAppWebpackXmlRulesService } from './webpack-xml-rules/webpack-xml-rules.service';

@CustomModule({
    providers: [
        BlazorAppWebpackRulesService,
        BlazorAppWebpackRulesConfigService,
        BlazorAppWebpackCsvRulesService,
        BlazorAppWebpackFontRulesService,
        BlazorAppWebpackImageRulesService,

        BlazorAppWebpackJsonRulesService,
        BlazorAppWebpackStyleRulesService,
        BlazorAppWebpackSvgRulesService,

        BlazorAppWebpackTsRulesService,
        BlazorAppWebpackXmlRulesService,
    ],
    imports: [WebpackRulesModule],
})
export class BlazorAppWebpackRulesModule {}
