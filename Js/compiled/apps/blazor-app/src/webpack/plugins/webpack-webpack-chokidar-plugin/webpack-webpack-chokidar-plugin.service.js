"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlazorAppWebpackWebpackChokidarPluginService = void 0;
const WebpackChokidarPlugin = require('webpack-chokidar-plugin');
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const webpack_webpack_chokidar_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service");
let BlazorAppWebpackWebpackChokidarPluginService = class BlazorAppWebpackWebpackChokidarPluginService extends webpack_webpack_chokidar_plugin_service_1.WebpackWebpackChokidarPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
BlazorAppWebpackWebpackChokidarPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], BlazorAppWebpackWebpackChokidarPluginService);
exports.BlazorAppWebpackWebpackChokidarPluginService = BlazorAppWebpackWebpackChokidarPluginService;
//# sourceMappingURL=webpack-webpack-chokidar-plugin.service.js.map