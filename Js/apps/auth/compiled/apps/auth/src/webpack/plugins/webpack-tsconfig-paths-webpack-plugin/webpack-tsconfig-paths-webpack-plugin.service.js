"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackTsconfigPathsWebpackPluginService = void 0;
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const webpack_tsconfig_paths_webpack_plugin_service_1 = require("#shared/src/webpack/plugins/webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service");
let AuthWebpackTsconfigPathsWebpackPluginService = class AuthWebpackTsconfigPathsWebpackPluginService extends webpack_tsconfig_paths_webpack_plugin_service_1.WebpackTsconfigPathsWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
AuthWebpackTsconfigPathsWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackTsconfigPathsWebpackPluginService);
exports.AuthWebpackTsconfigPathsWebpackPluginService = AuthWebpackTsconfigPathsWebpackPluginService;
//# sourceMappingURL=webpack-tsconfig-paths-webpack-plugin.service.js.map