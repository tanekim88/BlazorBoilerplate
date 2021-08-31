var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
import { WebpackWatchEntriesPlugin, WebpackWatchEntriesPluginService, } from '../plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { rootConfig } from '@root/configs';
import { WebpackSharedBaseService } from '../webpack-shared-base/webpack-shared-base.service';
import { sharedPaths } from '@shared/paths';
import path from 'path';
import { BlazorAppEnvironmentService } from '@blazor-app/src/modules/environment/environment/environment.service';
const rootDir = rootConfig.rootDir;
let WebpackSharedService = class WebpackSharedService extends WebpackSharedBaseService {
    blazorAppEnvironmentService;
    createConfiguration(options) {
        const entry = WebpackWatchEntriesPlugin.getEntries([
            {
                patterns: [path.resolve(sharedPaths.src.web.toAbsolutePath(), '**/index.ts')],
                patternsOptions: {
                    ignore: [
                        path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts'),
                        path.resolve(sharedPaths.src.web.material.toAbsolutePath(), '**/index.ts'),
                    ],
                },
                output: {
                    prefix: 'Shared_Rest'
                }
            },
            {
                patterns: [path.resolve(sharedPaths.src.web.material.toAbsolutePath(), '**/index.ts'),],
                patternsOptions: {
                    ignore: [
                        path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts'),
                    ],
                },
                output: {
                    prefix: 'Shared_Material'
                }
            },
            {
                patterns: [path.resolve(sharedPaths.src.web.toAbsolutePath(), '**/index.lazy.ts')],
                patternsOptions: {
                    ignore: [
                        path.resolve(sharedPaths.src.web.toAbsolutePath(), '**/native/**/index.lazy.ts'),
                    ],
                },
                excludeFromHtmlWebpackPlugin: true,
                output: {
                    prefix: 'Shared_Rest_Lazy'
                }
            },
            {
                patterns: [this.blazorAppEnvironmentService.localPaths.src['service-worker']['index.ts'].toAbsolutePath()],
                ignoredFromWatch: true,
                output: {
                    prefix: 'Shared_ServiceWorker'
                }
            },
        ], WebpackWatchEntriesPluginService.name);
        return this.mergeService.mergeOptions(super.createConfiguration(), {
            entry,
        }, options);
    }
};
__decorate([
    CustomInject(BlazorAppEnvironmentService),
    __metadata("design:type", BlazorAppEnvironmentService)
], WebpackSharedService.prototype, "blazorAppEnvironmentService", void 0);
WebpackSharedService = __decorate([
    CustomInjectable()
], WebpackSharedService);
export { WebpackSharedService };
//# sourceMappingURL=webpack-shared.service.js.map