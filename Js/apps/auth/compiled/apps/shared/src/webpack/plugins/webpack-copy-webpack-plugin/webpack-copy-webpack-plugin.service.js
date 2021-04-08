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
exports.WebpackCopyWebpackPluginService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const path_1 = __importDefault(require("path"));
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const paths_1 = require("@shared/paths");
let WebpackCopyWebpackPluginService = class WebpackCopyWebpackPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(copy_webpack_plugin_1.default);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            patterns: [
                {
                    from: path_1.default.resolve(paths_1.sharedPaths.node_modules.toAbsolutePath(), 'bootstrap-icons/bootstrap-icons.svg'),
                    to: '',
                },
            ],
        }, options);
    }
};
WebpackCopyWebpackPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackCopyWebpackPluginService);
exports.WebpackCopyWebpackPluginService = WebpackCopyWebpackPluginService;
//# sourceMappingURL=webpack-copy-webpack-plugin.service.js.map