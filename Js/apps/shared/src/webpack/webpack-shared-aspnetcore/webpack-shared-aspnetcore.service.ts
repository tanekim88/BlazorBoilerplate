import { WebpackRulesService } from '../rules/webpack-rules/webpack-rules.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';
import {
    Patterns,
    WebpackWatchEntriesPlugin,
    WebpackWatchEntriesPluginService,
} from '../plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { Configuration } from 'webpack';
import { rootConfig } from '@root/configs';

import { WebpackPluginsService } from '../plugins/webpack-plugins/webpack-plugins.service';

import { sharedPaths } from '@shared/paths';
import path from 'path';
import { WebpackSharedService } from '../webpack-shared/webpack-shared.service';
const rootDir = rootConfig.rootDir;
@CustomInjectable()
export class WebpackSharedAspnetcoreService extends WebpackSharedService {

    createConfiguration(options?) {
        const entry = WebpackWatchEntriesPlugin.getEntries(
            [
                {
                    patterns: [path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.ts')],
                    output: {
                        path: path.resolve(this.environmentService.outputDir, 'native'),
                        prefix: 'Shared_NativeMaterial'
                    },
                },
                {
                    patterns: [  path.resolve(sharedPaths.src.web.material.toAbsolutePath(), 'native/**/index.lazy.ts'),],
                    excludeFromHtmlWebpackPlugin: true,
                    output:{
                        prefix: 'Shared_NativeMaterial_Lazy'
                    }
                },
            ] as Patterns[],
            WebpackWatchEntriesPluginService.name,
        );

        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                entry,
            } as Configuration,
            options,
        );
    }
}
