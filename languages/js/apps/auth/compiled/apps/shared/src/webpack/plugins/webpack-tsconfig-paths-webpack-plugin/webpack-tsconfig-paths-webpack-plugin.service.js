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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackTsconfigPathsWebpackPluginService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const tsconfig_paths_webpack_plugin_1 = __importDefault(require("tsconfig-paths-webpack-plugin"));
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
let WebpackTsconfigPathsWebpackPluginService = class WebpackTsconfigPathsWebpackPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(tsconfig_paths_webpack_plugin_1.default);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            configFile: this.environmentService.localPaths['tsconfig.json'].toAbsolutePath(),
        }, options);
    }
};
WebpackTsconfigPathsWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackTsconfigPathsWebpackPluginService);
exports.WebpackTsconfigPathsWebpackPluginService = WebpackTsconfigPathsWebpackPluginService;
//# sourceMappingURL=webpack-tsconfig-paths-webpack-plugin.service.js.map