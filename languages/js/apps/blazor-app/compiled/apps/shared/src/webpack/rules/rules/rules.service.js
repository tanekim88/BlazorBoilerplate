var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
import { WebpackCsvRulesService } from '../webpack-csv-rules/webpack-csv-rules.service';
import { WebpackFontRulesService } from '../webpack-font-rules/webpack-font-rules.service';
import { WebpackImageRulesService } from '../webpack-image-rules/webpack-image-rules.service';
import { WebpackJsonRulesService } from '../webpack-json-rules/webpack-json-rules.service';
import { WebpackStyleRulesService } from '../webpack-style-rules/webpack-style-rules.service';
import { WebpackSvgRulesService } from '../webpack-svg-rules/webpack-svg-rules.service';
import { WebpackTsRulesService } from '../webpack-ts-rules/webpack-ts-rules.service';
import { WebpackXmlRulesService } from '../webpack-xml-rules/webpack-xml-rules.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
let WebpackRulesConfigService = class WebpackRulesConfigService {
    webpackStyleRulesService;
    webpackCsvRulesService;
    webpackFontRulesService;
    webpackImageRulesService;
    webpackJsonRulesService;
    webpackSvgRulesService;
    webpackTsRulesService;
    webpackXmlRulesService;
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
    __metadata("design:type", typeof (_a = typeof WebpackStyleRulesService !== "undefined" && WebpackStyleRulesService) === "function" ? _a : Object)
], WebpackRulesConfigService.prototype, "webpackStyleRulesService", void 0);
__decorate([
    CustomInject(WebpackCsvRulesService),
    __metadata("design:type", typeof (_b = typeof WebpackCsvRulesService !== "undefined" && WebpackCsvRulesService) === "function" ? _b : Object)
], WebpackRulesConfigService.prototype, "webpackCsvRulesService", void 0);
__decorate([
    CustomInject(WebpackFontRulesService),
    __metadata("design:type", typeof (_c = typeof WebpackFontRulesService !== "undefined" && WebpackFontRulesService) === "function" ? _c : Object)
], WebpackRulesConfigService.prototype, "webpackFontRulesService", void 0);
__decorate([
    CustomInject(WebpackImageRulesService),
    __metadata("design:type", typeof (_d = typeof WebpackImageRulesService !== "undefined" && WebpackImageRulesService) === "function" ? _d : Object)
], WebpackRulesConfigService.prototype, "webpackImageRulesService", void 0);
__decorate([
    CustomInject(WebpackJsonRulesService),
    __metadata("design:type", typeof (_e = typeof WebpackJsonRulesService !== "undefined" && WebpackJsonRulesService) === "function" ? _e : Object)
], WebpackRulesConfigService.prototype, "webpackJsonRulesService", void 0);
__decorate([
    CustomInject(WebpackSvgRulesService),
    __metadata("design:type", typeof (_f = typeof WebpackSvgRulesService !== "undefined" && WebpackSvgRulesService) === "function" ? _f : Object)
], WebpackRulesConfigService.prototype, "webpackSvgRulesService", void 0);
__decorate([
    CustomInject(WebpackTsRulesService),
    __metadata("design:type", typeof (_g = typeof WebpackTsRulesService !== "undefined" && WebpackTsRulesService) === "function" ? _g : Object)
], WebpackRulesConfigService.prototype, "webpackTsRulesService", void 0);
__decorate([
    CustomInject(WebpackXmlRulesService),
    __metadata("design:type", typeof (_h = typeof WebpackXmlRulesService !== "undefined" && WebpackXmlRulesService) === "function" ? _h : Object)
], WebpackRulesConfigService.prototype, "webpackXmlRulesService", void 0);
WebpackRulesConfigService = __decorate([
    CustomInjectable()
], WebpackRulesConfigService);
export { WebpackRulesConfigService };
let WebpackRulesService = class WebpackRulesService {
    webpackStyleRulesService;
    webpackCsvRulesService;
    webpackFontRulesService;
    webpackImageRulesService;
    webpackJsonRulesService;
    webpackSvgRulesService;
    webpackTsRulesService;
    webpackXmlRulesService;
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
    __metadata("design:type", typeof (_j = typeof WebpackStyleRulesService !== "undefined" && WebpackStyleRulesService) === "function" ? _j : Object)
], WebpackRulesService.prototype, "webpackStyleRulesService", void 0);
__decorate([
    CustomInject(WebpackCsvRulesService),
    __metadata("design:type", typeof (_k = typeof WebpackCsvRulesService !== "undefined" && WebpackCsvRulesService) === "function" ? _k : Object)
], WebpackRulesService.prototype, "webpackCsvRulesService", void 0);
__decorate([
    CustomInject(WebpackFontRulesService),
    __metadata("design:type", typeof (_l = typeof WebpackFontRulesService !== "undefined" && WebpackFontRulesService) === "function" ? _l : Object)
], WebpackRulesService.prototype, "webpackFontRulesService", void 0);
__decorate([
    CustomInject(WebpackImageRulesService),
    __metadata("design:type", typeof (_m = typeof WebpackImageRulesService !== "undefined" && WebpackImageRulesService) === "function" ? _m : Object)
], WebpackRulesService.prototype, "webpackImageRulesService", void 0);
__decorate([
    CustomInject(WebpackJsonRulesService),
    __metadata("design:type", typeof (_o = typeof WebpackJsonRulesService !== "undefined" && WebpackJsonRulesService) === "function" ? _o : Object)
], WebpackRulesService.prototype, "webpackJsonRulesService", void 0);
__decorate([
    CustomInject(WebpackSvgRulesService),
    __metadata("design:type", typeof (_p = typeof WebpackSvgRulesService !== "undefined" && WebpackSvgRulesService) === "function" ? _p : Object)
], WebpackRulesService.prototype, "webpackSvgRulesService", void 0);
__decorate([
    CustomInject(WebpackTsRulesService),
    __metadata("design:type", typeof (_q = typeof WebpackTsRulesService !== "undefined" && WebpackTsRulesService) === "function" ? _q : Object)
], WebpackRulesService.prototype, "webpackTsRulesService", void 0);
__decorate([
    CustomInject(WebpackXmlRulesService),
    __metadata("design:type", typeof (_r = typeof WebpackXmlRulesService !== "undefined" && WebpackXmlRulesService) === "function" ? _r : Object)
], WebpackRulesService.prototype, "webpackXmlRulesService", void 0);
WebpackRulesService = __decorate([
    CustomInjectable()
], WebpackRulesService);
export { WebpackRulesService };
//# sourceMappingURL=rules.service.js.map