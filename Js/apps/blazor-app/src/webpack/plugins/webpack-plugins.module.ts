import { BlazorAppWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
import { BlazorAppWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';

import { BlazorAppWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { BlazorAppWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import {
    BlazorAppWebpackMiniCssExtractPluginService,
    BlazorAppWebpackMiniCssExtractPluginConfigService,
} from './webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';

import {
    BlazorAppWebpackPluginsService,
    BlazorAppWebpackPluginsConfigService,
} from './webpack-plugins/webpack-plugins.service';
import { BlazorAppWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';
import { BlazorAppWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
import { CustomModule } from '#shared/src/functions/process-providers';
import {
    BlazorAppWebpackPreRemoveFilesWebpackPluginService,
    BlazorAppWebpackRemoveFilesWebpackPluginService,
} from './webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';
import { BlazorAppWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
import { BlazorAppWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
import {
    BlazorAppWebpackWatchEntriesPluginConfigService,
    BlazorAppWebpackWatchEntriesPluginService,
} from './webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackPluginsModule } from '#shared/src/webpack/plugins/webpack-plugins.module';

@CustomModule({
    providers: [
        // blazorAppClientWebpackExtractSvgSpriteWebpackPluginService,
        // blazorAppClientWebpackSvgSpriteLoaderPluginService,
        // blazorAppClientWebpackSvgSpriteLoaderPluginService,
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
export class BlazorAppWebpackPluginsModule {}
