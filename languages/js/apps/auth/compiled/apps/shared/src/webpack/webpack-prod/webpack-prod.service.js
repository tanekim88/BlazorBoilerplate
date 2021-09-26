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
exports.WebpackProdService = void 0;
const webpack_base_service_1 = require("../webpack-base/webpack-base.service");
const webpack_minimizers_service_1 = require("../minimizers/webpack-minimizers/webpack-minimizers.service");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const process_webpack_providers_2 = require("@projects/shared/src/functions/process-webpack-providers");
let WebpackProdService = class WebpackProdService extends webpack_base_service_1.WebpackBaseService {
    createConfiguration(options) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            output: {
                filename: '[name].js',
            },
            mode: 'production',
            devtool: 'source-map',
            optimization: {
                minimize: true,
                minimizer: this.webpackMinimizersService.createMinimizers(),
                usedExports: true,
            },
        }, options);
    }
};
__decorate([
    process_webpack_providers_2.CustomInject(webpack_minimizers_service_1.WebpackMinimizersService),
    __metadata("design:type", webpack_minimizers_service_1.WebpackMinimizersService)
], WebpackProdService.prototype, "webpackMinimizersService", void 0);
WebpackProdService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackProdService);
exports.WebpackProdService = WebpackProdService;
//# sourceMappingURL=webpack-prod.service.js.map