var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
import { WebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { WebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { WebpackHtmlWebpackPluginService } from './webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { WebpackMiniCssExtractPluginService } from './webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';
import { WebpackPluginsService, WebpackPluginsConfigService } from './webpack-plugins/webpack-plugins.service';
import { WebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
import { WebpackPluginBaseService } from './webpack-plugin-base/webpack-plugin-base.service';
import { CustomModule } from '../../functions/process-providers';
import { WebpackPreRemoveFilesWebpackPluginService, WebpackRemoveFilesWebpackPluginService, } from './webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';
import { WebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
import { WebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
import { WebpackWatchEntriesPluginConfigService, WebpackWatchEntriesPluginService, } from './webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackErrorHandlerPluginService } from './webpack-error-handler-plugin/webpack-error-handler-plugin.service';
import { WebpackErrorOverlayWebpackPluginService } from './webpack-error-overlay-webpack-plugin/webpack-error-overlay-webpack-plugin.service';
import { WebpackHtmlWebpackCustomizerPluginService } from './webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service';
import { WebpackProfilingPluginService } from './webpack-profiling-plugin/webpack-profiling-plugin.service';
import { WebpackWebpackBundleAnalyzerService } from './webpack-webpack-bundle-analyzer/webpack-webpack-bundle-analyzer.service';
import { WebpackProvidePluginService } from './webpack-provide-plugin/webpack-provide-plugin.service';
import { WebpackWebpackPwaManifestService } from './webpack-webpack-pwa-manifest/webpack-webpack-pwa-manifest.service';
import { WebpackSvgSpriteMapWebpackPluginService } from './webpack-svg-spritemap-webpack-plugin/webpack-svg-spritemap-webpack-plugin.service';
let WebpackPluginsModule = class WebpackPluginsModule {
};
WebpackPluginsModule = __decorate([
    CustomModule({
        providers: [
            // WebpackExtractSvgSpriteWebpackPluginService,
            // WebpackSvgSpriteLoaderPluginService,
            WebpackCleanWebpackPluginService,
            WebpackCopyWebpackPluginService,
            WebpackErrorHandlerPluginService,
            WebpackErrorOverlayWebpackPluginService,
            WebpackFaviconsWebpackPluginService,
            WebpackHtmlWebpackCustomizerPluginService,
            WebpackHtmlWebpackPluginService,
            WebpackMiniCssExtractPluginService,
            WebpackPluginBaseService,
            WebpackPluginsConfigService,
            WebpackPluginsService,
            WebpackPreRemoveFilesWebpackPluginService,
            WebpackProfilingPluginService,
            WebpackProvidePluginService,
            WebpackRemoveFilesWebpackPluginService,
            WebpackTsconfigPathsWebpackPluginService,
            WebpackWatchEntriesPluginConfigService,
            WebpackWatchEntriesPluginService,
            WebpackWebpackBundleAnalyzerService,
            WebpackWebpackChokidarPluginService,
            WebpackWorkboxWebpackPluginService,
            WebpackWebpackPwaManifestService,
            WebpackSvgSpriteMapWebpackPluginService
            // MergeService,
            // EnvironmentService,
        ],
        imports: [],
    })
], WebpackPluginsModule);
export { WebpackPluginsModule };
//# sourceMappingURL=webpack-plugins.module.js.map