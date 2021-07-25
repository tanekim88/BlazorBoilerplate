import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { CustomInjectable } from '@shared/src/functions/process-providers';
// import { CustomInjectable } from '../../../functions/process-webpack-providers';
import path from 'path';
import { configs } from '@shared/configs';
// import { configsCollections } from '@shared/configs-collection';

@CustomInjectable()
export class WebpackCleanWebpackPluginService extends WebpackPluginBaseService {
    /**
     *
     */
    constructor() {
        super(CleanWebpackPlugin);
    }

    createOptions(options?) {
        const notToDelete = [
            '.prettierrc.json',
            '.eslintrc.json',
            '.stylelintrc.json',
            'tailwind.config.json',
            'tailwind.config.js',
        ];

        const filesNotToDelete = configs.allRootDirs.map((rootDir) => {
            return notToDelete.map((file) => {
                const relRootPath = path.relative(this.environmentService.outputDir, rootDir);

                return path.join(relRootPath, file);
            });
        });

        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                // Simulate the removal of files
                //
                // default: false
                dry: false,
                // Write Logs to Console
                // (Always enabled when dry is true)
                //
                // default: false
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                //
                // default: true
                cleanStaleWebpackAssets: false,
                // Do not allow removal of current webpack assets
                //
                // default: true
                // protectWebpackAssets: false,
                // **WARNING**
                //
                // Notes for the below options:
                //
                // They are unsafe...so test initially with dry: true.
                //
                // Relative to webpack's output.path directory.
                // If outside of webpack's output.path directory,
                //    use full path. path.join(process.cwd(), 'build/**/*')
                //
                // These options extend del's pattern matching API.
                // See https://github.com/sindresorhus/del#patterns
                //    for pattern matching documentation
                // Removes files once prior to Webpack compilation
                //   Not included in rebuilds (watch mode)
                //
                // Use !negative patterns to exclude files
                //
                // default: ['**/*']
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!lib',
                    '!lib/**/*',
                    // '!app_offline.bak',
                    // '!**/*.png',
                    // '!**/*.gif',
                    // '!Themes',
                    // '!Themes/**/*',
                    // '!css',
                    // '!css/**/*',
                    // '!images',
                    // '!images/**/*',
                    // '!js',
                    // '!js/**/*',
                    // '!Modules',
                    // '!Modules/**/*',
                ],
                // cleanOnceBeforeBuildPatterns: [], // disables cleanOnceBeforeBuildPatterns
                // Removes files after every build (including watch mode) that match this pattern.
                // Used for files that are not created directly by Webpack.
                //
                // Use !negative patterns to exclude files
                //
                // default: []
                cleanAfterEveryBuildPatterns: [],
                // Allow clean patterns outside of process.cwd()
                //
                // requires dry option to be explicitly set
                //
                // default: false
                dangerouslyAllowCleanPatternsOutsideProject: true,
            },
            options,
        );
    }
}
