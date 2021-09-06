import { CustomInjectable } from '#shared/src/functions/process-providers';

import {
    Patterns,
    WebpackWatchEntriesPlugin,
    WebpackWatchEntriesPluginConfigService,
} from '../plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';
import { Configuration } from 'webpack';
import { rootConfig } from '#root/configs';
import { sharedPaths } from '#shared/paths';
import { rootPaths } from '#root/paths';

import { WebpackSharedBaseService } from '../webpack-shared-base/webpack-shared-base.service';

const rootDir = rootConfig.rootDir;
@CustomInjectable()
export class WebpackSharedConfigService extends WebpackSharedBaseService {
    createConfiguration(options?) {
        const entry = WebpackWatchEntriesPlugin.getEntries(
            [
                {
                    patterns: [
                        this.environmentService.localPaths['.eslintrc.ts'].toAbsolutePath(),
                        this.environmentService.localPaths['.prettierrc.ts'].toAbsolutePath(),
                        this.environmentService.localPaths['.stylelintrc.ts'].toAbsolutePath(),
                        this.environmentService.localPaths['tailwind.config.ts'].toAbsolutePath(),
                        this.environmentService.localPaths['tsconfig.ts'].toAbsolutePath(),
                    ],
                    output: {
                        path: this.environmentService.localPaths.toAbsolutePath(),
                        extensions: [{
                            name: '.json',
                            ignoredFromWatch: true,
                        }],
                        preserveFilename: true,
                    },
                    excludeFromHtmlWebpackPlugin: true,
                    watchThePatternsOnly:true
                },
                {
                    patterns: [
                        sharedPaths['.eslintrc.ts'].toAbsolutePath(),
                        sharedPaths['.prettierrc.ts'].toAbsolutePath(),
                        sharedPaths['.stylelintrc.ts'].toAbsolutePath(),
                        sharedPaths['tailwind.config.ts'].toAbsolutePath(),
                        sharedPaths['tsconfig.ts'].toAbsolutePath(),
                    ],
                    output: {
                        path: sharedPaths.toAbsolutePath(),
                        extensions: [{
                            name: '.json',
                            ignoredFromWatch: true,
                        }],
                        preserveFilename: true,
                    },
                    excludeFromHtmlWebpackPlugin: true,
                    watchThePatternsOnly:true
                },
                {
                    patterns: [
                        rootPaths['.eslintrc.ts'].toAbsolutePath(),
                        rootPaths['.prettierrc.ts'].toAbsolutePath(),
                        rootPaths['.stylelintrc.ts'].toAbsolutePath(),
                        rootPaths['tailwind.config.ts'].toAbsolutePath(),
                        rootPaths['tsconfig.ts'].toAbsolutePath(),
                    ],
                    output: {
                        path: rootDir,
                        extensions: [{
                            name: '.json',
                            ignoredFromWatch: true,
                        }],
                        preserveFilename: true,
                    },
                    excludeFromHtmlWebpackPlugin: true,
                    watchThePatternsOnly:true
                },
            ] as Patterns[],
            WebpackWatchEntriesPluginConfigService.name,
        );

        return this.mergeService.mergeOptions(
            super.createConfiguration(),
            {
                entry,
                target: 'node',
            } as Configuration,
            options,
        );
    }
}
