var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SolidAppWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
import { SolidAppWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';
import { SolidAppWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { SolidAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import { SolidAppWebpackMiniCssExtractPluginService, SolidAppWebpackMiniCssExtractPluginConfigService, } from './webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';
import { SolidAppWebpackPluginsService, SolidAppWebpackPluginsConfigService, } from './webpack-plugins/webpack-plugins.service';
import { SolidAppWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';
import { SolidAppWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
import { CustomModule } from '#shared/src/functions/process-providers';
import { SolidAppWebpackPreRemoveFilesWebpackPluginService, SolidAppWebpackRemoveFilesWebpackPluginService, } from './webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';
import { SolidAppWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
import { SolidAppWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
import { SolidAppWebpackWatchEntriesPluginConfigService, SolidAppWebpackWatchEntriesPluginService, } from './webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackPluginsModule } from '#shared/src/webpack/plugins/webpack-plugins.module';
let SolidAppWebpackPluginsModule = class SolidAppWebpackPluginsModule {
};
SolidAppWebpackPluginsModule = __decorate([
    CustomModule({
        providers: [
            // blazorAppClientWebpackExtractSvgSpriteWebpackPluginService,
            // blazorAppClientWebpackSvgSpriteLoaderPluginService,
            // blazorAppClientWebpackSvgSpriteLoaderPluginService,
            SolidAppWebpackCleanWebpackPluginService,
            SolidAppWebpackCopyWebpackPluginService,
            SolidAppWebpackFaviconsWebpackPluginService,
            SolidAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath,
            SolidAppWebpackMiniCssExtractPluginService,
            SolidAppWebpackPluginsConfigService,
            SolidAppWebpackPluginsService,
            SolidAppWebpackMiniCssExtractPluginConfigService,
            SolidAppWebpackPreRemoveFilesWebpackPluginService,
            SolidAppWebpackRemoveFilesWebpackPluginService,
            SolidAppWebpackTsconfigPathsWebpackPluginService,
            SolidAppWebpackWatchEntriesPluginConfigService,
            SolidAppWebpackWatchEntriesPluginService,
            SolidAppWebpackWebpackChokidarPluginService,
            SolidAppWebpackWebpackFixStyleOnlyEntriesService,
            SolidAppWebpackWorkboxWebpackPluginService,
        ],
        imports: [WebpackPluginsModule],
    })
], SolidAppWebpackPluginsModule);
export { SolidAppWebpackPluginsModule };
//# sourceMappingURL=webpack-plugins.module.js.map