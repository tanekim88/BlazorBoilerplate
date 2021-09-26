var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
let WebpackTsRulesService = class WebpackTsRulesService extends WebpackRulesBaseService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, options);
    }
    createRules() {
        return [...super.createRules(), this.createRule()];
    }
};
WebpackTsRulesService = __decorate([
    CustomInjectable()
], WebpackTsRulesService);
export { WebpackTsRulesService };
//# sourceMappingURL=ts-rules.service.js.map