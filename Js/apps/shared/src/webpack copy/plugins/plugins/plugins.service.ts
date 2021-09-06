import { EnvironmentService } from '../../../modules/environment/environment/environment.service';

import { WebpackCleanWebpackPluginService } from '../webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
import { WebpackCopyWebpackPluginService } from '../webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';

import { WebpackFaviconsWebpackPluginService } from '../webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';

import {
    WebpackMiniCssExtractPluginService,
    WebpackMiniCssExtractPluginConfigService,
} from '../webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';
import {
    WebpackRemoveFilesWebpackPluginService,
    WebpackPreRemoveFilesWebpackPluginService,
} from '../webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';

import { WebpackWebpackFixStyleOnlyEntriesService } from '../webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';
import { WebpackWorkboxWebpackPluginService } from '../webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
import { WebpackTsconfigPathsWebpackPluginService } from '../webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
import { WebpackWebpackChokidarPluginService } from '../webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
import {
    WebpackWatchEntriesPluginConfigService,
    WebpackWatchEntriesPluginService,
} from '../webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackErrorOverlayWebpackPluginService } from '../webpack-error-overlay-webpack-plugin/webpack-error-overlay-webpack-plugin.service';
import { WebpackHtmlWebpackPluginService } from '../webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { WebpackHtmlWebpackCustomizerPluginService } from '../webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service';
import { WebpackProfilingPluginService } from '../webpack-profiling-plugin/webpack-profiling-plugin.service';
import { WebpackWebpackBundleAnalyzerService } from '../webpack-webpack-bundle-analyzer/webpack-webpack-bundle-analyzer.service';
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
import { WebpackProvidePluginService } from '../webpack-provide-plugin/webpack-provide-plugin.service';
import { WebpackSvgSpriteMapWebpackPluginService } from '../webpack-svg-spritemap-webpack-plugin/webpack-svg-spritemap-webpack-plugin.service';
@CustomInjectable()
export class WebpackPluginsConfigService {
    @CustomInject(EnvironmentService)
    protected environmentService: EnvironmentService;

    @CustomInject(WebpackCopyWebpackPluginService)
    protected webpackCopyWebpackPluginService: WebpackCopyWebpackPluginService;

    // @CustomInject(WebpackExtractSvgSpriteWebpackPluginService)
    // protected webpackExtractSvgSpriteWebpackPluginService: WebpackExtractSvgSpriteWebpackPluginService;

    @CustomInject(WebpackFaviconsWebpackPluginService)
    protected webpackFaviconsWebpackPluginService: WebpackFaviconsWebpackPluginService;

    @CustomInject(WebpackHtmlWebpackPluginService)
    protected webpackHtmlWebpackPluginService: WebpackHtmlWebpackPluginService;

    @CustomInject(WebpackMiniCssExtractPluginConfigService)
    protected webpackPreMiniCssExtractPluginService: WebpackMiniCssExtractPluginConfigService;

    @CustomInject(WebpackPreRemoveFilesWebpackPluginService)
    protected webpackPreRemoveFilesWebpackPluginService: WebpackPreRemoveFilesWebpackPluginService;

    // @CustomInject(WebpackSvgSpriteLoaderPluginService)
    // protected webpackSvgSpriteLoaderPluginService: WebpackSvgSpriteLoaderPluginService;

    @CustomInject(WebpackWebpackFixStyleOnlyEntriesService)
    protected webpackWebpackFixStyleOnlyEntriesService: WebpackWebpackFixStyleOnlyEntriesService;

    @CustomInject(WebpackWorkboxWebpackPluginService)
    protected webpackWorkboxWebpackPluginService: WebpackWorkboxWebpackPluginService;

    @CustomInject(WebpackTsconfigPathsWebpackPluginService)
    protected webpackTsconfigPathsWebpackPluginService: WebpackTsconfigPathsWebpackPluginService;

    @CustomInject(WebpackWebpackChokidarPluginService)
    protected webpackWebpackChokidarPluginService: WebpackWebpackChokidarPluginService;

    @CustomInject(WebpackWatchEntriesPluginConfigService)
    protected webpackWatchEntriesPluginConfigService: WebpackWatchEntriesPluginConfigService;

    @CustomInject(WebpackErrorOverlayWebpackPluginService)
    protected webpackErrorOverlayWebpackPluginService: WebpackErrorOverlayWebpackPluginService;
    @CustomInject(WebpackProfilingPluginService)
    protected webpackProfilingPluginService: WebpackProfilingPluginService;
    @CustomInject(WebpackWebpackBundleAnalyzerService)
    protected webpackWebpackBundleAnalyzerService: WebpackWebpackBundleAnalyzerService;
    /**
     *
     */
    createPlugins() {
        const plugins = [];
        // prePlugins.push(this.webpackProfilingPluginService.createPlugin());
        // prePlugins.push(this.webpackWebpackWatchFilesPluginService.createPlugin());
        // prePlugins.push(this.webpackPreCleanWebpackPluginService.createPlugin());
        // prePlugins.push(this.webpackCopyWebpackPluginService.createPlugin())
        // prePlugins.push(this.webpackExtractSvgSpriteWebpackPluginService.createPlugin())
        // prePlugins.push(this.webpackFaviconsWebpackPluginService.createPlugin())

        // prePlugins.push(this.webpackMiniCssExtractPluginService.createPlugin())
        // prePlugins.push(this.webpackWorkboxWebpackPluginService.createPlugin())

        // prePlugins.push(this.webpackWebpackFixStyleOnlyEntriesService.createPlugin());

        // prePlugins.push(this.webpackPreRemoveFilesWebpackPluginService.createPlugin());

        plugins.push(this.webpackWatchEntriesPluginConfigService.createPlugin());

        // prePlugins.push(this.webpackErrorOverlayWebpackPluginService.createPlugin());
        // prePlugins.push(this.webpackWebpackChokidarPluginService.createPlugin());

        return plugins;
    }
}

@CustomInjectable()
export class WebpackPluginsService {
    @CustomInject(EnvironmentService)
    protected wnvironmentService: EnvironmentService;

    @CustomInject(WebpackCleanWebpackPluginService)
    protected webpackCleanWebpackPluginService: WebpackCleanWebpackPluginService;

    @CustomInject(WebpackCopyWebpackPluginService)
    protected webpackCopyWebpackPluginService: WebpackCopyWebpackPluginService;

    // @CustomInject(WebpackExtractSvgSpriteWebpackPluginService)
    // protected webpackExtractSvgSpriteWebpackPluginService: WebpackExtractSvgSpriteWebpackPluginService;

    @CustomInject(WebpackFaviconsWebpackPluginService)
    protected webpackFaviconsWebpackPluginService: WebpackFaviconsWebpackPluginService;

    @CustomInject(WebpackHtmlWebpackPluginService)
    protected webpackHtmlWebpackPluginService: WebpackHtmlWebpackPluginService;

    @CustomInject(WebpackMiniCssExtractPluginService)
    protected webpackMiniCssExtractPluginService: WebpackMiniCssExtractPluginService;

    @CustomInject(WebpackRemoveFilesWebpackPluginService)
    protected webpackRemoveFilesWebpackPluginService: WebpackRemoveFilesWebpackPluginService;

    // @CustomInject(WebpackSvgSpriteLoaderPluginService)
    // protected webpackSvgSpriteLoaderPluginService: WebpackSvgSpriteLoaderPluginService;

    @CustomInject(WebpackWebpackFixStyleOnlyEntriesService)
    protected webpackWebpackFixStyleOnlyEntriesService: WebpackWebpackFixStyleOnlyEntriesService;

    @CustomInject(WebpackWorkboxWebpackPluginService)
    protected webpackWorkboxWebpackPluginService: WebpackWorkboxWebpackPluginService;

    @CustomInject(WebpackTsconfigPathsWebpackPluginService)
    protected webpackTsconfigPathsWebpackPluginService: WebpackTsconfigPathsWebpackPluginService;

    @CustomInject(WebpackWebpackChokidarPluginService)
    protected webpackWebpackChokidarPluginService: WebpackWebpackChokidarPluginService;

    @CustomInject(WebpackWatchEntriesPluginService)
    protected webpackWatchEntriesPluginService: WebpackWatchEntriesPluginService;

    @CustomInject(WebpackErrorOverlayWebpackPluginService)
    protected webpackErrorOverlayWebpackPluginService: WebpackErrorOverlayWebpackPluginService;

    @CustomInject(WebpackHtmlWebpackCustomizerPluginService)
    protected webpackHtmlWebpackCustomizerPluginService: WebpackHtmlWebpackCustomizerPluginService;
    @CustomInject(WebpackProfilingPluginService)
    protected webpackProfilingPluginService: WebpackProfilingPluginService;
    @CustomInject(WebpackWebpackBundleAnalyzerService)
    protected webpackWebpackBundleAnalyzerService: WebpackWebpackBundleAnalyzerService;
    @CustomInject(WebpackProvidePluginService)
    protected webpackProvidePluginService: WebpackProvidePluginService;

    @CustomInject(WebpackSvgSpriteMapWebpackPluginService)
    protected webpackSvgSpriteMapWebpackPluginService: WebpackSvgSpriteMapWebpackPluginService;

    /**
     *
     */
    createPlugins() {
        let plugins = [];
        // prePlugins.push(this.webpackWebpackWatchFilesPluginService.createPlugin());
        plugins.push(this.webpackCleanWebpackPluginService.createPlugin());
        plugins.push(this.webpackProvidePluginService.createPlugin());
        plugins.push(this.webpackWatchEntriesPluginService.createPlugin());
        plugins.push(this.webpackCopyWebpackPluginService.createPlugin());
        // prePlugins.push(this.webpackExtractSvgSpriteWebpackPluginService.createPlugin())

        // html-webpack-plugin must come before favicons-webpack-plugin in the plugins array.
        plugins.push(this.webpackHtmlWebpackCustomizerPluginService.createPlugin());
        plugins = plugins.concat(this.webpackHtmlWebpackPluginService.createManyPlugins());

        plugins.push(this.webpackFaviconsWebpackPluginService.createPlugin());

        plugins.push(this.webpackMiniCssExtractPluginService.createPlugin());
        plugins.push(this.webpackWorkboxWebpackPluginService.createPlugin());
        plugins.push(this.webpackWebpackFixStyleOnlyEntriesService.createPlugin());
        // plugins.push(this.webpackSvgSpriteMapWebpackPluginService.createPlugin());
        // plugins.push(this.webpackRemoveFilesWebpackPluginService.createPlugin());
        // plugins.push(this.webpackErrorOverlayWebpackPluginService.createPlugin());
        // plugins.push(this.webpackWebpackBundleAnalyzerService.createPlugin());
        // plugins.push(this.webpackProfilingPluginService.createPlugin());
        // prePlugins.push(this.webpackWebpackChokidarPluginService.createPlugin());
        return plugins;
    }
}
