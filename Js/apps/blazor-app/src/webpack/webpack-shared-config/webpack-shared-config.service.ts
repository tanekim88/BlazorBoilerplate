import { Configuration } from 'webpack';


import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';

import { blazorAppPaths } from '@blazor-app/paths';
import {
    Patterns,
    WebpackWatchEntriesPlugin,
    WebpackWatchEntriesPluginConfigService,
} from '@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';

import { WebpackSharedConfigService } from '@shared/src/webpack/webpack-shared-config/webpack-shared-config.service';
import { BlazorAppEnvironmentService } from '../../modules/environment/environment/environment.service';
import { BlazorAppWebpackRulesConfigService } from '../rules/webpack-rules/webpack-rules.service';
import { BlazorAppWebpackPluginsConfigService } from '../plugins/webpack-plugins/webpack-plugins.service';

@CustomInjectable()
export class BlazorAppWebpackSharedConfigService extends WebpackSharedConfigService {
    @CustomInject(BlazorAppEnvironmentService)
    protected environmentService: BlazorAppEnvironmentService;

    @CustomInject(BlazorAppWebpackRulesConfigService)
    private blazorAppClientWebpackRulesConfigService: BlazorAppWebpackRulesConfigService;

    @CustomInject(BlazorAppWebpackPluginsConfigService)
    private blazorAppClientWebpackPluginsConfigService: BlazorAppWebpackPluginsConfigService;

    createConfiguration(options?) {
        const entry = WebpackWatchEntriesPlugin.getEntries(
            [] as Patterns[],
            WebpackWatchEntriesPluginConfigService.name,
        );

        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                entry,
                module: {
                    rules: this.blazorAppClientWebpackRulesConfigService.createRules(),
                },
                plugins: this.blazorAppClientWebpackPluginsConfigService.createPlugins(),
                resolveLoader: {
                    modules: [blazorAppPaths.node_modules.toAbsolutePath()],
                },
            } as Configuration,
            options,
        );
    }
}
