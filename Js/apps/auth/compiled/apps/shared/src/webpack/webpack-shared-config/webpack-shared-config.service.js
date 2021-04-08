"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackSharedConfigService = void 0;
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
const webpack_watch_entries_plugin_service_1 = require("../plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service");
const configs_1 = require("@root/configs");
const paths_1 = require("@shared/paths");
const paths_2 = require("@root/paths");
const webpack_shared_base_service_1 = require("../webpack-shared-base/webpack-shared-base.service");
const rootDir = configs_1.rootConfig.rootDir;
let WebpackSharedConfigService = class WebpackSharedConfigService extends webpack_shared_base_service_1.WebpackSharedBaseService {
    createConfiguration(options) {
        const entry = webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPlugin.getEntries([
            {
                patterns: [
                    this.environmentService.localPaths['.eslintrc.ts'].toAbsolutePath(),
                    this.environmentService.localPaths['.prettierrc.ts'].toAbsolutePath(),
                    this.environmentService.localPaths['.stylelintrc.ts'].toAbsolutePath(),
                    this.environmentService.localPaths['tailwind.config.ts'].toAbsolutePath(),
                    this.environmentService.localPaths['tsconfig.ts'].toAbsolutePath(),
                ],
                output: {
                    path: this.environmentService.localPaths.toAbsolutePath(),
                    extension: {
                        name: '.json',
                        ignoredFromWatch: true,
                    },
                    preserveFilename: true,
                },
                excludeFromHtmlWebpackPlugin: true,
            },
            {
                patterns: [
                    paths_1.sharedPaths['.eslintrc.ts'].toAbsolutePath(),
                    paths_1.sharedPaths['.prettierrc.ts'].toAbsolutePath(),
                    paths_1.sharedPaths['.stylelintrc.ts'].toAbsolutePath(),
                    paths_1.sharedPaths['tailwind.config.ts'].toAbsolutePath(),
                    paths_1.sharedPaths['tsconfig.ts'].toAbsolutePath(),
                ],
                output: {
                    path: paths_1.sharedPaths.toAbsolutePath(),
                    extension: {
                        name: '.json',
                        ignoredFromWatch: true,
                    },
                    preserveFilename: true,
                },
                excludeFromHtmlWebpackPlugin: true,
            },
            {
                patterns: [
                    paths_2.rootPaths['.eslintrc.ts'].toAbsolutePath(),
                    paths_2.rootPaths['.prettierrc.ts'].toAbsolutePath(),
                    paths_2.rootPaths['.stylelintrc.ts'].toAbsolutePath(),
                    paths_2.rootPaths['tailwind.config.ts'].toAbsolutePath(),
                    paths_2.rootPaths['tsconfig.ts'].toAbsolutePath(),
                ],
                output: {
                    path: rootDir,
                    extension: {
                        name: '.json',
                        ignoredFromWatch: true,
                    },
                    preserveFilename: true,
                },
                excludeFromHtmlWebpackPlugin: true,
            },
        ], webpack_watch_entries_plugin_service_1.WebpackWatchEntriesPluginConfigService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            target: 'node',
        }, options);
    }
};
WebpackSharedConfigService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], WebpackSharedConfigService);
exports.WebpackSharedConfigService = WebpackSharedConfigService;
//# sourceMappingURL=webpack-shared-config.service.js.map