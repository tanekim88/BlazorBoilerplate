"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackWatchEntriesPluginService = exports.AuthWebpackWatchEntriesPluginConfigService = void 0;
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const webpack_watch_entries_plugin_service_1 = require("@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
let AuthWebpackWatchEntriesPluginConfigService = class AuthWebpackWatchEntriesPluginConfigService extends webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            id: webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService.name,
            outputPath: this.environmentService.outputDir,
        }, options);
    }
};
AuthWebpackWatchEntriesPluginConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackWatchEntriesPluginConfigService);
exports.AuthWebpackWatchEntriesPluginConfigService = AuthWebpackWatchEntriesPluginConfigService;
let AuthWebpackWatchEntriesPluginService = class AuthWebpackWatchEntriesPluginService extends webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            id: webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginService.name,
            outputPath: this.environmentService.outputDir,
        }, options);
    }
};
AuthWebpackWatchEntriesPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthWebpackWatchEntriesPluginService);
exports.AuthWebpackWatchEntriesPluginService = AuthWebpackWatchEntriesPluginService;
//# sourceMappingURL=webpack-watch-entries-plugin.service.js.map