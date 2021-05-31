import { Configuration } from 'webpack';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';

import {
    Patterns,
    WebpackWatchEntriesPlugin,
    WebpackWatchEntriesPluginService,
} from '@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';

import { WebpackSharedService } from '@shared/src/webpack/webpack-shared/webpack-shared.service';
import { BlazorAppPaths, blazorAppPaths } from '@blazor-app/paths';

import path from 'path';
import { BlazorAppEnvironmentService } from '../../modules/environment/environment/environment.service';
import { BlazorAppWebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';
import { BlazorAppWebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';
@CustomInjectable()
export class BlazorAppWebpackSharedService extends WebpackSharedService {

    @CustomInject(BlazorAppWebpackRulesService)
    private blazorAppClientWebpackRulesService: BlazorAppWebpackRulesService;

    @CustomInject(BlazorAppWebpackPluginsService)
    private blazorAppClientWebpackPluginsService: BlazorAppWebpackPluginsService;

    createConfiguration(options?) {

        const entry = WebpackWatchEntriesPlugin.getEntries(
            [
                path.resolve(BlazorAppPaths.Pages.toAbsolutePath(), '**/*.scss'),
                path.resolve(BlazorAppPaths.Shared.toAbsolutePath(), '**/*.scss'),
            ] as Patterns[],
            WebpackWatchEntriesPluginService.name,
        );

        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                entry,
                context: blazorAppPaths.toAbsolutePath(),
                output: {
                    filename: '[name].js',
                    path: BlazorAppPaths.wwwroot.toAbsolutePath(),
                    publicPath: '/',
                },
                module: {
                    rules: this.blazorAppClientWebpackRulesService.createRules(),
                },
                plugins: this.blazorAppClientWebpackPluginsService.createPlugins(),
                resolveLoader: {
                    modules: [blazorAppPaths.node_modules.toAbsolutePath()],
                },
            } as Configuration,
            options,
        );
    }
}
