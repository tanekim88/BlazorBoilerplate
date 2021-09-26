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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackErrorOverlayWebpackPluginService = void 0;
const common_1 = require("@nestjs/common");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
let WebpackErrorOverlayWebpackPluginService = class WebpackErrorOverlayWebpackPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor(classConstructor) {
        super(classConstructor ?? ErrorOverlayPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
WebpackErrorOverlayWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __param(0, common_1.Optional()),
    __metadata("design:paramtypes", [Object])
], WebpackErrorOverlayWebpackPluginService);
exports.WebpackErrorOverlayWebpackPluginService = WebpackErrorOverlayWebpackPluginService;
//# sourceMappingURL=webpack-error-overlay-webpack-plugin.service.js.map