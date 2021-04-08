"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackWorkboxWebpackPluginService = void 0;
const paths_1 = require("@auth/paths");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const webpack_workbox_webpack_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service");
let AuthWebpackWorkboxWebpackPluginService = class AuthWebpackWorkboxWebpackPluginService extends webpack_workbox_webpack_plugin_service_1.WebpackWorkboxWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            swSrc: paths_1.authPaths.src['service-worker']['index.ts'].toAbsolutePath(),
            swDest: 'service-worker.js',
        }, options);
    }
};
AuthWebpackWorkboxWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackWorkboxWebpackPluginService);
exports.AuthWebpackWorkboxWebpackPluginService = AuthWebpackWorkboxWebpackPluginService;
//# sourceMappingURL=webpack-workbox-webpack-plugin.service.js.map