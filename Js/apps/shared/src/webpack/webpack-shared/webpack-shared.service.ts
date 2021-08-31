import { WebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import {
    Patterns,
    WebpackWatchEntriesPlugin,
    WebpackWatchEntriesPluginService,
} from '../plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { Configuration } from 'webpack';
import { rootConfig } from '#root/configs';

import { WebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';

import { WebpackSharedBaseService } from '../webpack-shared-base/webpack-shared-base.service';
import { sharedPaths } from '#shared/paths';
import path from 'path';
import { BlazorAppEnvironmentService } from '#blazor-app/src/modules/environment/environment/environment.service';
const rootDir = rootConfig.rootDir;
@CustomInjectable()
export class WebpackSharedService extends WebpackSharedBaseService {
    @CustomInject(BlazorAppEnvironmentService)
    protected blazorAppEnvironmentService: BlazorAppEnvironmentService;
    createConfiguration(options?) {
        const entry = WebpackWatchEntriesPlugin.getEntries(
            [
                {
                    patterns: [path.resolve(sharedPaths.src.web.toAbsolutePath(), '**/index.ts')],
                    patternsOptions: {
                        ignore: [
                            path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts'),
                            path.resolve(sharedPaths.src.web.material.toAbsolutePath(), '**/index.ts'),
                        ],
                    },
                    output:{
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
                    output:{
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
                    output:{
                        prefix: 'Shared_Rest_Lazy'
                    }
                },
                {
                    patterns: [this.blazorAppEnvironmentService.localPaths.src['service-worker']['index.ts'].toAbsolutePath()],
                    ignoredFromWatch: true,
                    output:{
                        prefix: 'Shared_ServiceWorker'
                    }
                },
            ] as Patterns[],
            WebpackWatchEntriesPluginService.name,
        );

        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                entry,
            } as Configuration,
            options,
        );
    }
}
