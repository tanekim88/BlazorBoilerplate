var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackXmlRulesService } from '@shared/src/webpack/rules/webpack-xml-rules/webpack-xml-rules.service';
import { CustomInjectable } from '@shared/src/functions/process-providers';
let BlazorAppWebpackXmlRulesService = class BlazorAppWebpackXmlRulesService extends WebpackXmlRulesService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {}, options);
    }
};
BlazorAppWebpackXmlRulesService = __decorate([
    CustomInjectable()
], BlazorAppWebpackXmlRulesService);
export { BlazorAppWebpackXmlRulesService };
//# sourceMappingURL=webpack-xml-rules.service.js.map