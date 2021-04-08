"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlazorAppWebpackWatchEntriesPluginService = exports.BlazorAppWebpackWatchEntriesPluginConfigService = void 0;
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const webpack_watch_entries_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
let BlazorAppWebpackWatchEntriesPluginConfigService = class BlazorAppWebpackWatchEntriesPluginConfigService extends webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            id: webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService.name,
            outputPath: this.environmentService.outputDir,
        }, options);
    }
};
BlazorAppWebpackWatchEntriesPluginConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], BlazorAppWebpackWatchEntriesPluginConfigService);
exports.BlazorAppWebpackWatchEntriesPluginConfigService = BlazorAppWebpackWatchEntriesPluginConfigService;
let BlazorAppWebpackWatchEntriesPluginService = class BlazorAppWebpackWatchEntriesPluginService extends webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            id: webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService.name,
            outputPath: this.environmentService.outputDir,
        }, options);
    }
};
BlazorAppWebpackWatchEntriesPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], BlazorAppWebpackWatchEntriesPluginService);
exports.BlazorAppWebpackWatchEntriesPluginService = BlazorAppWebpackWatchEntriesPluginService;
//# sourceMappingURL=webpack-watch-entries-plugin.service.js.map