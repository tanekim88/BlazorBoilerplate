var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AuthWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
import { AuthWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { AuthWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { AuthWebpackMiniCssExtractPluginService, AuthWebpackMiniCssExtractPluginConfigService, } from './webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';
import { AuthWebpackPluginsService, AuthWebpackPluginsConfigService, } from './webpack-plugins/webpack-plugins.service';
import { AuthWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';
import { AuthWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
import { CustomModule } from '#shared/src/functions/process-providers';
import { AuthWebpackPreRemoveFilesWebpackPluginService, AuthWebpackRemoveFilesWebpackPluginService, } from './webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';
import { AuthWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
import { AuthWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
import { AuthWebpackWatchEntriesPluginConfigService, AuthWebpackWatchEntriesPluginService, } from './webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackPluginsModule } from '#shared/src/webpack/plugins/webpack-plugins.module';
import { AuthWebpackHtmlWebpackCustomizerPluginService } from './webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service';
let AuthWebpackPluginsModule = class AuthWebpackPluginsModule {
};
AuthWebpackPluginsModule = __decorate([
    CustomModule({
        providers: [
            // authWebpackExtractSvgSpriteWebpackPluginService,
            // authWebpackSvgSpriteLoaderPluginService,
            // authWebpackSvgSpriteLoaderPluginService,
            AuthWebpackCleanWebpackPluginService,
            AuthWebpackCopyWebpackPluginService,
            AuthWebpackFaviconsWebpackPluginService,
            AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath,
            AuthWebpackMiniCssExtractPluginService,
            AuthWebpackPluginsConfigService,
            AuthWebpackPluginsService,
            AuthWebpackMiniCssExtractPluginConfigService,
            AuthWebpackPreRemoveFilesWebpackPluginService,
            AuthWebpackRemoveFilesWebpackPluginService,
            AuthWebpackTsconfigPathsWebpackPluginService,
            AuthWebpackWatchEntriesPluginConfigService,
            AuthWebpackWatchEntriesPluginService,
            AuthWebpackWebpackChokidarPluginService,
            AuthWebpackWebpackFixStyleOnlyEntriesService,
            AuthWebpackWorkboxWebpackPluginService,
            AuthWebpackHtmlWebpackCustomizerPluginService,
        ],
        imports: [WebpackPluginsModule],
    })
], AuthWebpackPluginsModule);
export { AuthWebpackPluginsModule };
//# sourceMappingURL=webpack-plugins.module.js.map