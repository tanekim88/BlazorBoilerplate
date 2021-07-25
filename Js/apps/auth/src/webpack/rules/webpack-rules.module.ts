import { Module } from '@nestjs/common';


import { WebpackRulesModule } from '@shared/src/webpack/rules/webpack-rules.module';
import { CustomModule } from '@shared/src/functions/process-providers';
import { AuthWebpackRulesConfigService, AuthWebpackRulesService } from './webpack-rules/webpack-rules.service';
import { AuthWebpackCsvRulesService } from './webpack-csv-rules/webpack-csv-rules.service';
import { AuthWebpackFontRulesService } from './webpack-font-rules/webpack-font-rules.service';
import { AuthWebpackImageRulesService } from './webpack-image-rules/webpack-image-rules.service';
import { AuthWebpackJsonRulesService } from './webpack-json-rules/webpack-json-rules.service';
import { AuthWebpackStyleRulesService } from './webpack-style-rules/webpack-style-rules.service';
import { AuthWebpackSvgRulesService } from './webpack-svg-rules/webpack-svg-rules.service';
import { AuthWebpackTsRulesService } from './webpack-ts-rules/webpack-ts-rules.service';
import { AuthWebpackXmlRulesService } from './webpack-xml-rules/webpack-xml-rules.service';

@CustomModule({
    providers: [
        AuthWebpackRulesService,
        AuthWebpackRulesConfigService,
        AuthWebpackCsvRulesService,
        AuthWebpackFontRulesService,
        AuthWebpackImageRulesService,

        AuthWebpackJsonRulesService,
        AuthWebpackStyleRulesService,
        AuthWebpackSvgRulesService,

        AuthWebpackTsRulesService,
        AuthWebpackXmlRulesService,
    ],
    imports: [WebpackRulesModule],
})
export class AuthWebpackRulesModule {}
