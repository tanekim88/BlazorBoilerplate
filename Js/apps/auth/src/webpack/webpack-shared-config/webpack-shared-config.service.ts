import { Configuration } from 'webpack';


import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';

import { authPaths } from '@auth/paths';
import {
    Patterns,
    WebpackWatchEntriesPlugin,
    WebpackWatchEntriesPluginConfigService,
} from '@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';

import { WebpackSharedConfigService } from '@shared/src/webpack/webpack-shared-config/webpack-shared-config.service';
import { AuthEnvironmentService } from '../../modules/environment/environment/environment.service';
import { AuthWebpackRulesConfigService } from '../rules/webpack-rules/webpack-rules.service';
import { AuthWebpackPluginsConfigService } from '../plugins/webpack-plugins/webpack-plugins.service';

@CustomInjectable()
export class AuthWebpackSharedConfigService extends WebpackSharedConfigService {
    @CustomInject(AuthEnvironmentService)
    protected environmentService: AuthEnvironmentService;

    @CustomInject(AuthWebpackRulesConfigService)
    private authWebpackRulesConfigService: AuthWebpackRulesConfigService;

    @CustomInject(AuthWebpackPluginsConfigService)
    private authWebpackPluginsConfigService: AuthWebpackPluginsConfigService;

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
                    rules: this.authWebpackRulesConfigService.createRules(),
                },
                plugins: this.authWebpackPluginsConfigService.createPlugins(),
                resolveLoader: {
                    modules: [authPaths.node_modules.toAbsolutePath()],
                },
            } as Configuration,
            options,
        );
    }
}
