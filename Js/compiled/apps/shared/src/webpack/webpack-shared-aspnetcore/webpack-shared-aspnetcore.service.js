var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { WebpackWatchEntriesPlugin, WebpackWatchEntriesPluginService, } from '../plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { rootConfig } from '@root/configs';
import { sharedPaths } from '@shared/paths';
import path from 'path';
import { WebpackSharedService } from '../webpack-shared/webpack-shared.service';
const rootDir = rootConfig.rootDir;
let WebpackSharedAspnetcoreService = class WebpackSharedAspnetcoreService extends WebpackSharedService {
    createConfiguration(options) {
        const entry = WebpackWatchEntriesPlugin.getEntries([
            {
                patterns: [path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts')],
                output: {
                    path: path.resolve(this.environmentService.outputDir, 'native'),
                    prefix: 'Shared_NativeMaterial'
                },
            },
            {
                patterns: [path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.lazy.ts'),],
                excludeFromHtmlWebpackPlugin: true,
                output: {
                    prefix: 'Shared_NativeMaterial_Lazy'
                }
            },
        ], WebpackWatchEntriesPluginService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
        }, options);
    }
};
WebpackSharedAspnetcoreService = __decorate([
    CustomInjectable()
], WebpackSharedAspnetcoreService);
export { WebpackSharedAspnetcoreService };
//# sourceMappingURL=webpack-shared-aspnetcore.service.js.map