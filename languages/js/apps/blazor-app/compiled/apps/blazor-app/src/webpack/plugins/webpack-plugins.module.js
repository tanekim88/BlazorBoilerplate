var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BlazorAppWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
import { BlazorAppWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { BlazorAppWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { BlazorAppWebpackMiniCssExtractPluginService, BlazorAppWebpackMiniCssExtractPluginConfigService, } from './webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';
import { BlazorAppWebpackPluginsService, BlazorAppWebpackPluginsConfigService, } from './webpack-plugins/webpack-plugins.service';
import { BlazorAppWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';
import { BlazorAppWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { BlazorAppWebpackPreRemoveFilesWebpackPluginService, BlazorAppWebpackRemoveFilesWebpackPluginService, } from './webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';
import { BlazorAppWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
import { BlazorAppWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
import { BlazorAppWebpackWatchEntriesPluginConfigService, BlazorAppWebpackWatchEntriesPluginService, } from './webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackPluginsModule } from '@projects/shared/src/webpack/plugins/webpack-plugins.module';
let BlazorAppWebpackPluginsModule = class BlazorAppWebpackPluginsModule {
};
BlazorAppWebpackPluginsModule = __decorate([
    CustomModule({
        providers: [
            // BlazorAppClientWebpackExtractSvgSpriteWebpackPluginService,
            // BlazorAppClientWebpackSvgSpriteLoaderPluginService,
            // BlazorAppClientWebpackSvgSpriteLoaderPluginService,
            BlazorAppWebpackCleanWebpackPluginService,
            BlazorAppWebpackCopyWebpackPluginService,
            BlazorAppWebpackFaviconsWebpackPluginService,
            BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath,
            BlazorAppWebpackMiniCssExtractPluginService,
            BlazorAppWebpackPluginsConfigService,
            BlazorAppWebpackPluginsService,
            BlazorAppWebpackMiniCssExtractPluginConfigService,
            BlazorAppWebpackPreRemoveFilesWebpackPluginService,
            BlazorAppWebpackRemoveFilesWebpackPluginService,
            BlazorAppWebpackTsconfigPathsWebpackPluginService,
            BlazorAppWebpackWatchEntriesPluginConfigService,
            BlazorAppWebpackWatchEntriesPluginService,
            BlazorAppWebpackWebpackChokidarPluginService,
            BlazorAppWebpackWebpackFixStyleOnlyEntriesService,
            BlazorAppWebpackWorkboxWebpackPluginService,
        ],
        imports: [WebpackPluginsModule],
    })
], BlazorAppWebpackPluginsModule);
export { BlazorAppWebpackPluginsModule };
//# sourceMappingURL=webpack-plugins.module.js.map