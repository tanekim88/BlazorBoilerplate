"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackStylelintService = void 0;
const webpack_postcss_base_service_1 = require("../webpack-postcss-base/webpack-postcss-base.service");
const Stylelint = require('stylelint');
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
let WebpackStylelintService = class WebpackStylelintService extends webpack_postcss_base_service_1.WebpackPostcssBaseService {
    constructor() {
        super(Stylelint);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
WebpackStylelintService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackStylelintService);
exports.WebpackStylelintService = WebpackStylelintService;
//# sourceMappingURL=webpack-stylelint.service.js.map