"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackPluginsService = exports.AuthWebpackPluginsConfigService = void 0;
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const webpack_plugins_service_1 = require("#shared/src/webpack/plugins/webpack-plugins/webpack-plugins.service");
let AuthWebpackPluginsConfigService = class AuthWebpackPluginsConfigService extends webpack_plugins_service_1.WebpackPluginsConfigService {
};
AuthWebpackPluginsConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackPluginsConfigService);
exports.AuthWebpackPluginsConfigService = AuthWebpackPluginsConfigService;
let AuthWebpackPluginsService = class AuthWebpackPluginsService extends webpack_plugins_service_1.WebpackPluginsService {
};
AuthWebpackPluginsService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackPluginsService);
exports.AuthWebpackPluginsService = AuthWebpackPluginsService;
//# sourceMappingURL=webpack-plugins.service.js.map