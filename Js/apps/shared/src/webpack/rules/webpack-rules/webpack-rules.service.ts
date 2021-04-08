import { WebpackCsvRulesService } from '../webpack-csv-rules/webpack-csv-rules.service';
import { WebpackFontRulesService } from '../webpack-font-rules/webpack-font-rules.service';
import { WebpackImageRulesService } from '../webpack-image-rules/webpack-image-rules.service';
import { WebpackJsonRulesService } from '../webpack-json-rules/webpack-json-rules.service';
import { WebpackStyleRulesService } from '../webpack-style-rules/webpack-style-rules.service';
import { WebpackSvgRulesService } from '../webpack-svg-rules/webpack-svg-rules.service';
import { WebpackTsRulesService } from '../webpack-ts-rules/webpack-ts-rules.service';
import { WebpackXmlRulesService } from '../webpack-xml-rules/webpack-xml-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';
@CustomInjectable()
export class WebpackRulesConfigService {
    @CustomInject(WebpackStyleRulesService)
    protected webpackStyleRulesService: WebpackStyleRulesService;
    @CustomInject(WebpackCsvRulesService)
    protected webpackCsvRulesService: WebpackCsvRulesService;
    @CustomInject(WebpackFontRulesService)
    protected webpackFontRulesService: WebpackFontRulesService;
    @CustomInject(WebpackImageRulesService)
    protected webpackImageRulesService: WebpackImageRulesService;
    @CustomInject(WebpackJsonRulesService)
    protected webpackJsonRulesService: WebpackJsonRulesService;
    @CustomInject(WebpackSvgRulesService)
    protected webpackSvgRulesService: WebpackSvgRulesService;
    @CustomInject(WebpackTsRulesService)
    protected webpackTsRulesService: WebpackTsRulesService;
    @CustomInject(WebpackXmlRulesService)
    protected webpackXmlRulesService: WebpackXmlRulesService;

    createRules() {
        const toReturn = [
            ...this.webpackCsvRulesService.createRules(),
            ...this.webpackFontRulesService.createRules(),
            ...this.webpackImageRulesService.createRules(),
            ...this.webpackJsonRulesService.createRules(),
            ...this.webpackSvgRulesService.createRules(),
            ...this.webpackTsRulesService.createRules(),
            ...this.webpackXmlRulesService.createRules(),
        ];

        return toReturn;
    }
}

@CustomInjectable()
export class WebpackRulesService {
    @CustomInject(WebpackStyleRulesService)
    protected webpackStyleRulesService: WebpackStyleRulesService;
    @CustomInject(WebpackCsvRulesService)
    protected webpackCsvRulesService: WebpackCsvRulesService;
    @CustomInject(WebpackFontRulesService)
    protected webpackFontRulesService: WebpackFontRulesService;
    @CustomInject(WebpackImageRulesService)
    protected webpackImageRulesService: WebpackImageRulesService;
    @CustomInject(WebpackJsonRulesService)
    protected webpackJsonRulesService: WebpackJsonRulesService;
    @CustomInject(WebpackSvgRulesService)
    protected webpackSvgRulesService: WebpackSvgRulesService;
    @CustomInject(WebpackTsRulesService)
    protected webpackTsRulesService: WebpackTsRulesService;
    @CustomInject(WebpackXmlRulesService)
    protected webpackXmlRulesService: WebpackXmlRulesService;

    createRules() {
        const toReturn = [
            ...this.webpackStyleRulesService.createRules(),
            ...this.webpackCsvRulesService.createRules(),
            ...this.webpackFontRulesService.createRules(),
            ...this.webpackImageRulesService.createRules(),
            ...this.webpackJsonRulesService.createRules(),
            ...this.webpackSvgRulesService.createRules(),
            ...this.webpackTsRulesService.createRules(),
            ...this.webpackXmlRulesService.createRules(),
        ];

        return toReturn;
    }
}
