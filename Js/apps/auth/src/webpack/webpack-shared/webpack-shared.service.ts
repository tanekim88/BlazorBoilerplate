import { Configuration } from 'webpack';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';

import {
    Patterns,
    WebpackWatchEntriesPlugin,
    WebpackWatchEntriesPluginService,
} from '@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';

import { WebpackSharedService } from '@shared/src/webpack/webpack-shared/webpack-shared.service';
import { AuthPaths, authPaths } from '@auth/paths';

import path from 'path';
import { AuthEnvironmentService } from '../../modules/environment/environment/environment.service';
import { AuthWebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';
import { AuthWebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';
import { sharedPaths } from '@shared/paths';
@CustomInjectable()
export class AuthWebpackSharedService extends WebpackSharedService {
    @CustomInject(AuthEnvironmentService)
    protected environmentService: AuthEnvironmentService;

    @CustomInject(AuthWebpackRulesService)
    private authWebpackRulesService: AuthWebpackRulesService;

    @CustomInject(AuthWebpackPluginsService)
    private authWebpackPluginsService: AuthWebpackPluginsService;

    createConfiguration(options?) {

        const entry = WebpackWatchEntriesPlugin.getEntries(
            [
                {
                    patterns: [
                        path.resolve(AuthPaths.Views.toAbsolutePath(), '**/*.scss'),
                        path.resolve(AuthPaths.Pages.toAbsolutePath(), '**/*.scss'),
                        path.resolve(AuthPaths.Areas.toAbsolutePath(), '**/*.scss'),
                    ],
                    output:{
                        prefix: 'Auth',
                        extensions:[{
                            name: '.css',
                            ignoredFromWatch: true,
                        },{
                            name: '.cshtml',
                            ignoredFromWatch: true,
                        }],
                    }
                },   
                {
                    patterns: [
                        path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts'),
                    ],
                    output:{
                        prefix: 'Shared_NativeMaterial'
                    }
                },                
            ] as Patterns[],
            WebpackWatchEntriesPluginService.name,
        );

        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                entry,
                context: authPaths.toAbsolutePath(),
                output: {
                    filename: '[name].js',
                    path: AuthPaths.wwwroot.toAbsolutePath(),
                    publicPath: '/',
                },
                module: {
                    rules: this.authWebpackRulesService.createRules(),
                },
                plugins: this.authWebpackPluginsService.createPlugins(),
                resolveLoader: {
                    modules: [authPaths.node_modules.toAbsolutePath()],
                },
            } as Configuration,
            options,
        );
    }
}
