var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackRulesModule } from '#shared/src/webpack/rules/webpack-rules.module';
import { CustomModule } from '#shared/src/functions/process-providers';
import { AuthWebpackRulesConfigService, AuthWebpackRulesService } from './webpack-rules/webpack-rules.service';
import { AuthWebpackCsvRulesService } from './webpack-csv-rules/webpack-csv-rules.service';
import { AuthWebpackFontRulesService } from './webpack-font-rules/webpack-font-rules.service';
import { AuthWebpackImageRulesService } from './webpack-image-rules/webpack-image-rules.service';
import { AuthWebpackJsonRulesService } from './webpack-json-rules/webpack-json-rules.service';
import { AuthWebpackStyleRulesService } from './webpack-style-rules/webpack-style-rules.service';
import { AuthWebpackSvgRulesService } from './webpack-svg-rules/webpack-svg-rules.service';
import { AuthWebpackTsRulesService } from './webpack-ts-rules/webpack-ts-rules.service';
import { AuthWebpackXmlRulesService } from './webpack-xml-rules/webpack-xml-rules.service';
let AuthWebpackRulesModule = class AuthWebpackRulesModule {
};
AuthWebpackRulesModule = __decorate([
    CustomModule({
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
], AuthWebpackRulesModule);
export { AuthWebpackRulesModule };
//# sourceMappingURL=webpack-rules.module.js.map