var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackRulesModule } from '@projects/shared/src/webpack/rules/webpack-rules.module';
import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { BlazorAppWebpackRulesConfigService, BlazorAppWebpackRulesService } from './webpack-rules/webpack-rules.service';
import { BlazorAppWebpackCsvRulesService } from './webpack-csv-rules/webpack-csv-rules.service';
import { BlazorAppWebpackFontRulesService } from './webpack-font-rules/webpack-font-rules.service';
import { BlazorAppWebpackImageRulesService } from './webpack-image-rules/webpack-image-rules.service';
import { BlazorAppWebpackJsonRulesService } from './webpack-json-rules/webpack-json-rules.service';
import { BlazorAppWebpackStyleRulesService } from './webpack-style-rules/webpack-style-rules.service';
import { BlazorAppWebpackSvgRulesService } from './webpack-svg-rules/webpack-svg-rules.service';
import { BlazorAppWebpackTsRulesService } from './webpack-ts-rules/webpack-ts-rules.service';
import { BlazorAppWebpackXmlRulesService } from './webpack-xml-rules/webpack-xml-rules.service';
let BlazorAppWebpackRulesModule = class BlazorAppWebpackRulesModule {
};
BlazorAppWebpackRulesModule = __decorate([
    CustomModule({
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
], BlazorAppWebpackRulesModule);
export { BlazorAppWebpackRulesModule };
//# sourceMappingURL=webpack-rules.module.js.map