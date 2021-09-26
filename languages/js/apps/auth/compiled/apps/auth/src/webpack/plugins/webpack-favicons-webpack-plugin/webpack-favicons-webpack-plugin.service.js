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
exports.AuthWebpackFaviconsWebpackPluginService = void 0;
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const webpack_favicons_webpack_plugin_service_1 = require("@projects/shared/src/webpack/plugins/webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service");
const environment_service_1 = require("../../../modules/environment/environment/environment.service");
let AuthWebpackFaviconsWebpackPluginService = class AuthWebpackFaviconsWebpackPluginService extends webpack_favicons_webpack_plugin_service_1.WebpackFaviconsWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            logo: this.authEnvironmentService.logoPath,
        }, options);
    }
};
__decorate([
    process_webpack_providers_1.CustomInject(environment_service_1.AuthEnvironmentService),
    __metadata("design:type", environment_service_1.AuthEnvironmentService)
], AuthWebpackFaviconsWebpackPluginService.prototype, "authEnvironmentService", void 0);
AuthWebpackFaviconsWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackFaviconsWebpackPluginService);
exports.AuthWebpackFaviconsWebpackPluginService = AuthWebpackFaviconsWebpackPluginService;
//# sourceMappingURL=webpack-favicons-webpack-plugin.service.js.map