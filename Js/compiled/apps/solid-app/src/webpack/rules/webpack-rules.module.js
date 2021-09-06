var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackRulesModule } from '#shared/src/webpack/rules/webpack-rules.module';
import { CustomModule } from '#shared/src/functions/process-providers';
import { SolidAppWebpackRulesConfigService, SolidAppWebpackRulesService } from './webpack-rules/webpack-rules.service';
import { SolidAppWebpackCsvRulesService } from './webpack-csv-rules/webpack-csv-rules.service';
import { SolidAppWebpackFontRulesService } from './webpack-font-rules/webpack-font-rules.service';
import { SolidAppWebpackImageRulesService } from './webpack-image-rules/webpack-image-rules.service';
import { SolidAppWebpackJsonRulesService } from './webpack-json-rules/webpack-json-rules.service';
import { SolidAppWebpackStyleRulesService } from './webpack-style-rules/webpack-style-rules.service';
import { SolidAppWebpackSvgRulesService } from './webpack-svg-rules/webpack-svg-rules.service';
import { SolidAppWebpackTsRulesService } from './webpack-ts-rules/webpack-ts-rules.service';
import { SolidAppWebpackXmlRulesService } from './webpack-xml-rules/webpack-xml-rules.service';
let SolidAppWebpackRulesModule = class SolidAppWebpackRulesModule {
};
SolidAppWebpackRulesModule = __decorate([
    CustomModule({
        providers: [
            SolidAppWebpackRulesService,
            SolidAppWebpackRulesConfigService,
            SolidAppWebpackCsvRulesService,
            SolidAppWebpackFontRulesService,
            SolidAppWebpackImageRulesService,
            SolidAppWebpackJsonRulesService,
            SolidAppWebpackStyleRulesService,
            SolidAppWebpackSvgRulesService,
            SolidAppWebpackTsRulesService,
            SolidAppWebpackXmlRulesService,
        ],
        imports: [WebpackRulesModule],
    })
], SolidAppWebpackRulesModule);
export { SolidAppWebpackRulesModule };
//# sourceMappingURL=webpack-rules.module.js.map