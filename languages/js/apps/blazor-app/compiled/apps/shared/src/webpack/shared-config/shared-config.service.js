var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackWatchEntriesPlugin, WebpackWatchEntriesPluginConfigService, } from '../plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { rootConfig } from '@projects/root/configs';
import { sharedPaths } from '@projects/shared/paths';
import { rootPaths } from '@projects/root/paths';
import { WebpackSharedBaseService } from '../webpack-shared-base/webpack-shared-base.service';
const rootDir = rootConfig.rootDir;
let WebpackSharedConfigService = class WebpackSharedConfigService extends WebpackSharedBaseService {
    createConfiguration(options) {
        const entry = WebpackWatchEntriesPlugin.getEntries([
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
                    extensions: [{
                            name: '.json',
                            ignoredFromWatch: true,
                        }],
                    preserveFilename: true,
                },
                excludeFromHtmlWebpackPlugin: true,
                watchThePatternsOnly: true
            },
            {
                patterns: [
                    sharedPaths['.eslintrc.ts'].toAbsolutePath(),
                    sharedPaths['.prettierrc.ts'].toAbsolutePath(),
                    sharedPaths['.stylelintrc.ts'].toAbsolutePath(),
                    sharedPaths['tailwind.config.ts'].toAbsolutePath(),
                    sharedPaths['tsconfig.ts'].toAbsolutePath(),
                ],
                output: {
                    path: sharedPaths.toAbsolutePath(),
                    extensions: [{
                            name: '.json',
                            ignoredFromWatch: true,
                        }],
                    preserveFilename: true,
                },
                excludeFromHtmlWebpackPlugin: true,
                watchThePatternsOnly: true
            },
            {
                patterns: [
                    rootPaths['.eslintrc.ts'].toAbsolutePath(),
                    rootPaths['.prettierrc.ts'].toAbsolutePath(),
                    rootPaths['.stylelintrc.ts'].toAbsolutePath(),
                    rootPaths['tailwind.config.ts'].toAbsolutePath(),
                    rootPaths['tsconfig.ts'].toAbsolutePath(),
                ],
                output: {
                    path: rootDir,
                    extensions: [{
                            name: '.json',
                            ignoredFromWatch: true,
                        }],
                    preserveFilename: true,
                },
                excludeFromHtmlWebpackPlugin: true,
                watchThePatternsOnly: true
            },
        ], WebpackWatchEntriesPluginConfigService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
            target: 'node',
        }, options);
    }
};
WebpackSharedConfigService = __decorate([
    CustomInjectable()
], WebpackSharedConfigService);
export { WebpackSharedConfigService };
//# sourceMappingURL=shared-config.service.js.map