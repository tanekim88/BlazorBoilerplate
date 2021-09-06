var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackCsvRulesService } from './webpack-csv-rules/webpack-csv-rules.service';
import { WebpackFontRulesService } from './webpack-font-rules/webpack-font-rules.service';
import { WebpackImageRulesService } from './webpack-image-rules/webpack-image-rules.service';
import { WebpackJsonRulesService } from './webpack-json-rules/webpack-json-rules.service';
import { WebpackStyleRulesService } from './webpack-style-rules/webpack-style-rules.service';
import { WebpackSvgRulesService } from './webpack-svg-rules/webpack-svg-rules.service';
import { WebpackTsRulesService } from './webpack-ts-rules/webpack-ts-rules.service';
import { WebpackXmlRulesService } from './webpack-xml-rules/webpack-xml-rules.service';
import { WebpackRulesConfigService, WebpackRulesService } from './webpack-rules/webpack-rules.service';
import { CustomModule } from '../../functions/process-providers';
import { WebpackRulesBaseService } from './webpack-rules-base/webpack-rules-base.service';
let WebpackRulesModule = class WebpackRulesModule {
};
WebpackRulesModule = __decorate([
    CustomModule({
        providers: [
            WebpackRulesConfigService,
            WebpackRulesService,
            WebpackRulesBaseService,
            WebpackCsvRulesService,
            WebpackFontRulesService,
            WebpackImageRulesService,
            WebpackJsonRulesService,
            WebpackStyleRulesService,
            WebpackSvgRulesService,
            WebpackTsRulesService,
            WebpackXmlRulesService,
        ],
        imports: [],
    })
], WebpackRulesModule);
export { WebpackRulesModule };
//# sourceMappingURL=rules.module.js.map