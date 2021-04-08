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
exports.AuthWebpackCopyWebpackPluginService = void 0;
const path_1 = __importDefault(require("path"));
const webpack_copy_webpack_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service");
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const paths_1 = require("@auth/paths");
const environment_service_1 = require("@auth/src/modules/environment/environment/environment.service");
let AuthWebpackCopyWebpackPluginService = class AuthWebpackCopyWebpackPluginService extends webpack_copy_webpack_plugin_service_1.WebpackCopyWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            patterns: [
                {
                    from: path_1.default.resolve(paths_1.authPaths.src.toAbsolutePath(), 'appsettings.json'),
                    to: '',
                },
                {
                    from: path_1.default.resolve(paths_1.authPaths.src.toAbsolutePath(), 'appsettings.Development.json'),
                    to: '',
                },
            ],
        }, options);
    }
};
__decorate([
    process_webpack_providers_1.CustomInject(environment_service_1.AuthEnvironmentService),
    __metadata("design:type", environment_service_1.AuthEnvironmentService)
], AuthWebpackCopyWebpackPluginService.prototype, "authEnvironmentService", void 0);
AuthWebpackCopyWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackCopyWebpackPluginService);
exports.AuthWebpackCopyWebpackPluginService = AuthWebpackCopyWebpackPluginService;
//# sourceMappingURL=webpack-copy-webpack-plugin.service.js.map