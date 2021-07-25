var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackJsonRulesService } from '@shared/src/webpack/rules/webpack-json-rules/webpack-json-rules.service';
import { CustomInjectable } from '@shared/src/functions/process-providers';
let BlazorAppWebpackJsonRulesService = class BlazorAppWebpackJsonRulesService extends WebpackJsonRulesService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {}, options);
    }
};
BlazorAppWebpackJsonRulesService = __decorate([
    CustomInjectable()
], BlazorAppWebpackJsonRulesService);
export { BlazorAppWebpackJsonRulesService };
//# sourceMappingURL=webpack-json-rules.service.js.map