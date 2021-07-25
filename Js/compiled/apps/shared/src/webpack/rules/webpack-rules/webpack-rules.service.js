var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WebpackCsvRulesService } from '../webpack-csv-rules/webpack-csv-rules.service';
import { WebpackFontRulesService } from '../webpack-font-rules/webpack-font-rules.service';
import { WebpackImageRulesService } from '../webpack-image-rules/webpack-image-rules.service';
import { WebpackJsonRulesService } from '../webpack-json-rules/webpack-json-rules.service';
import { WebpackStyleRulesService } from '../webpack-style-rules/webpack-style-rules.service';
import { WebpackSvgRulesService } from '../webpack-svg-rules/webpack-svg-rules.service';
import { WebpackTsRulesService } from '../webpack-ts-rules/webpack-ts-rules.service';
import { WebpackXmlRulesService } from '../webpack-xml-rules/webpack-xml-rules.service';
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
let WebpackRulesConfigService = class WebpackRulesConfigService {
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
};
__decorate([
    CustomInject(WebpackStyleRulesService),
    __metadata("design:type", WebpackStyleRulesService)
], WebpackRulesConfigService.prototype, "webpackStyleRulesService", void 0);
__decorate([
    CustomInject(WebpackCsvRulesService),
    __metadata("design:type", WebpackCsvRulesService)
], WebpackRulesConfigService.prototype, "webpackCsvRulesService", void 0);
__decorate([
    CustomInject(WebpackFontRulesService),
    __metadata("design:type", WebpackFontRulesService)
], WebpackRulesConfigService.prototype, "webpackFontRulesService", void 0);
__decorate([
    CustomInject(WebpackImageRulesService),
    __metadata("design:type", WebpackImageRulesService)
], WebpackRulesConfigService.prototype, "webpackImageRulesService", void 0);
__decorate([
    CustomInject(WebpackJsonRulesService),
    __metadata("design:type", WebpackJsonRulesService)
], WebpackRulesConfigService.prototype, "webpackJsonRulesService", void 0);
__decorate([
    CustomInject(WebpackSvgRulesService),
    __metadata("design:type", WebpackSvgRulesService)
], WebpackRulesConfigService.prototype, "webpackSvgRulesService", void 0);
__decorate([
    CustomInject(WebpackTsRulesService),
    __metadata("design:type", WebpackTsRulesService)
], WebpackRulesConfigService.prototype, "webpackTsRulesService", void 0);
__decorate([
    CustomInject(WebpackXmlRulesService),
    __metadata("design:type", WebpackXmlRulesService)
], WebpackRulesConfigService.prototype, "webpackXmlRulesService", void 0);
WebpackRulesConfigService = __decorate([
    CustomInjectable()
], WebpackRulesConfigService);
export { WebpackRulesConfigService };
let WebpackRulesService = class WebpackRulesService {
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
};
__decorate([
    CustomInject(WebpackStyleRulesService),
    __metadata("design:type", WebpackStyleRulesService)
], WebpackRulesService.prototype, "webpackStyleRulesService", void 0);
__decorate([
    CustomInject(WebpackCsvRulesService),
    __metadata("design:type", WebpackCsvRulesService)
], WebpackRulesService.prototype, "webpackCsvRulesService", void 0);
__decorate([
    CustomInject(WebpackFontRulesService),
    __metadata("design:type", WebpackFontRulesService)
], WebpackRulesService.prototype, "webpackFontRulesService", void 0);
__decorate([
    CustomInject(WebpackImageRulesService),
    __metadata("design:type", WebpackImageRulesService)
], WebpackRulesService.prototype, "webpackImageRulesService", void 0);
__decorate([
    CustomInject(WebpackJsonRulesService),
    __metadata("design:type", WebpackJsonRulesService)
], WebpackRulesService.prototype, "webpackJsonRulesService", void 0);
__decorate([
    CustomInject(WebpackSvgRulesService),
    __metadata("design:type", WebpackSvgRulesService)
], WebpackRulesService.prototype, "webpackSvgRulesService", void 0);
__decorate([
    CustomInject(WebpackTsRulesService),
    __metadata("design:type", WebpackTsRulesService)
], WebpackRulesService.prototype, "webpackTsRulesService", void 0);
__decorate([
    CustomInject(WebpackXmlRulesService),
    __metadata("design:type", WebpackXmlRulesService)
], WebpackRulesService.prototype, "webpackXmlRulesService", void 0);
WebpackRulesService = __decorate([
    CustomInjectable()
], WebpackRulesService);
export { WebpackRulesService };
//# sourceMappingURL=webpack-rules.service.js.map