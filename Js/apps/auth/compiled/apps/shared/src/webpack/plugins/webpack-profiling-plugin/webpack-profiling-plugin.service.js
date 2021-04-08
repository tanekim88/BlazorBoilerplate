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
exports.WebpackProfilingPluginService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const webpack_1 = __importDefault(require("webpack"));
const path_1 = __importDefault(require("path"));
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
let WebpackProfilingPluginService = class WebpackProfilingPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(webpack_1.default.debug.ProfilingPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            outputPath: path_1.default.resolve(this.environmentService.outputDir, 'profile.json'),
        }, options);
    }
};
WebpackProfilingPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackProfilingPluginService);
exports.WebpackProfilingPluginService = WebpackProfilingPluginService;
//# sourceMappingURL=webpack-profiling-plugin.service.js.map