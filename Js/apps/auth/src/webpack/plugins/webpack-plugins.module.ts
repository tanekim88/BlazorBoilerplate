import { AuthWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin/webpack-clean-webpack-plugin.service';
import { AuthWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin/webpack-copy-webpack-plugin.service';

import { AuthWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin/webpack-favicons-webpack-plugin.service';
import { AuthWebpackHtmlWebpackPluginServiceForSrcTemplatesIndexHtmlPath } from './webpack-html-webpack-plugin/webpack-html-webpack-plugin.service';
import {
    AuthWebpackMiniCssExtractPluginService,
    AuthWebpackMiniCssExtractPluginConfigService,
} from './webpack-mini-css-extract-plugin/webpack-mini-css-extract-plugin.service';

import {
    AuthWebpackPluginsService,
    AuthWebpackPluginsConfigService,
} from './webpack-plugins/webpack-plugins.service';
import { AuthWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';
import { AuthWebpackWorkboxWebpackPluginService } from './webpack-workbox-webpack-plugin/webpack-workbox-webpack-plugin.service';
import { CustomModule } from '@shared/src/functions/process-webpack-providers';
import {
    AuthWebpackPreRemoveFilesWebpackPluginService,
    AuthWebpackRemoveFilesWebpackPluginService,
} from './webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';
import { AuthWebpackTsconfigPathsWebpackPluginService } from './webpack-tsconfig-paths-webpack-plugin/webpack-tsconfig-paths-webpack-plugin.service';
import { AuthWebpackWebpackChokidarPluginService } from './webpack-webpack-chokidar-plugin/webpack-webpack-chokidar-plugin.service';
import {
    AuthWebpackWatchEntriesPluginConfigService,
    AuthWebpackWatchEntriesPluginService,
} from './webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { WebpackPluginsModule } from '@shared/src/webpack/plugins/webpack-plugins.module';
import { AuthWebpackHtmlWebpackCustomizerPluginService} from './webpack-html-webpack-customizer-plugin/webpack-html-webpack-customizer-plugin.service';
@CustomModule({
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
export class AuthWebpackPluginsModule {}
