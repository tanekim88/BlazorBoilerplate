import { WebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';
import { WebpackBaseService } from '../webpack-base/webpack-base.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';

import { Configuration } from 'webpack';
import { rootConfig } from '@root/configs';
import { sharedPaths } from '@shared/paths';

import { WebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';
import { WebpackTsconfigPathsWebpackPluginService } from '../plugins/webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';

const rootDir = rootConfig.rootDir;

@CustomInjectable()
export class WebpackSharedBaseService extends WebpackBaseService {
    @CustomInject(WebpackRulesService)
    protected webpackRulesService: WebpackRulesService;
    @CustomInject(WebpackPluginsService)
    protected webpackPluginsService: WebpackPluginsService;
    @CustomInject(WebpackTsconfigPathsWebpackPluginService)
    protected webpackTsconfigPathsWebpackPluginService: WebpackTsconfigPathsWebpackPluginService;
    createConfiguration(options?) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                output: {
                    filename: '[name].js',
                    path: this.environmentService.outputDir,
                    publicPath: '/',
                },
                context: this.environmentService.localPaths.toAbsolutePath(),
                optimization: {
                    splitChunks: { chunks: 'all', maxInitialRequests: 30, maxAsyncRequests: 30, maxSize: 100000 },
                },
                resolve: {
                    enforceExtension: false,
                    extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.css'],
                    modules: [this.environmentService.localPaths.node_modules.toAbsolutePath()],
                    plugins: [this.webpackTsconfigPathsWebpackPluginService.createPlugin()],
                },
                resolveLoader: {
                    modules: [
                        sharedPaths.src.webpack.loaders.toAbsolutePath(),
                        this.environmentService.localPaths.src.webpack.loaders.toAbsolutePath(),
                        this.environmentService.localPaths.node_modules.toAbsolutePath(),
                    ],
                },
                watchOptions: {
                    poll: 1000,
                },
            } as Configuration,
            options,
        );
    }
}
