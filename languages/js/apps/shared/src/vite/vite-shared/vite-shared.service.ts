import { ViteBaseService } from '../vite-base/vite-base.service';


import { CustomInjectable } from '#shared/src/functions/process-providers';
import { UserConfig } from 'vite';
import { RootPaths } from '#root/paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import nodeSassUtils from 'node-sass-utils';

import sass from 'sass';
const sassUtils = nodeSassUtils(sass);
@CustomInjectable()
export class ViteSharedService extends ViteBaseService {

    createConfiguration(options?: UserConfig) {

        return this.mergeService.mergeOptions(
            super.createConfiguration(), {
                root: RootPaths.toAbsolutePath(),
                build: {
                    polyfillDynamicImport: false,
                    target: 'esnext',
                },
                plugins: [
                    vanillaExtractPlugin({})
                ],
                resolve: {

                },
                css: {
                    preprocessorOptions: {
                        scss: {
                            // additionalData: `$injectedColor: orange;`
                            sassOptions: {
                                includePaths: [
                                    this.environmentService.localPaths.node_modules.toAbsolutePath()
                                ],
                                // functions: {
                                //     'get($keys)': function (keys) {
                                //         let result = { customKey: 'red' } as any;

                                //         keys = keys.getValue().split('.');

                                //         for (let i = 0; i < keys.length; i++) {
                                //             result = result[keys[i]];
                                //         }

                                //         return sassUtils.castToSass(result);
                                //     },
                                // },
                                // importer: (url: string, prev, done) => {
                                //     url = url.replace('~', this.environmentService.localPaths.node_modules + '/');

                                //     return { file: url };
                                // },
                            },

                        }
                    }
                },
                json: {
                    namedExports: true,
                    stringify: false
                },
                esbuild: {

                }
            } as UserConfig,
            options,
        );
    }
}
