import { ViteBaseService } from '../vite-base/vite-base.service';


import { CustomInjectable } from '#shared/src/functions/process-providers';
import { normalizePath, UserConfig } from 'vite';
import { rootPaths, RootPaths } from '#root/paths';
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
                    // output:{
                    //     manualChunks: undefined
                    // },
                    // cssCodeSplit: false
                },
                plugins: [
                    vanillaExtractPlugin({})
                ],
                resolve: {

                },
                css: {
                    preprocessorOptions: {
                        scss: {
                            sourceMap: true,
                            implementation: sass,
                            // loadPaths: [
                            //     // this.environmentService.localPaths.node_modules.toAbsolutePath(),
                            //     rootPaths.apps.toAbsolutePath(),
                            //     'apps'
                            // ],
                            // includePaths: [
                            //     rootPaths.apps.toAbsolutePath(),
                            // ],
                            importer: (url: string, prev, done) => {
                                if (!url.startsWith('@')) return null;

                                url = normalizePath(rootPaths.apps.toAbsolutePath()) + '/' + url.slice(1)

                                return { file: url };
                                // 'C:/app/languages/js/apps/shared/src/web/_index', 
                            },
                            // additionalData: `$injectedColor: orange;`
                            sassOptions: {

                                // functions: {
                                //     'get($keys)': function (keys) {
                                //         let result = { customKey: 'red' } as any;

                                //         keys = keys.getValue().split('.');

                                //         for (let i = 0; i < keys.length; i++) {
                                //             result = result[keys[i]];
                                //         }

                                //         return sassUtils.castToSass(result);
                                //     },
                                //     'pow($base, $exponent)': function(args) {
                                //          const base = args[0].assertNumber('base').assertNoUnits('base');
                                //          const exponent =
                                //          args[1].assertNumber('exponent').assertNoUnits('exponent');

                                //          return new sass.SassNumber(Math.pow(base.value, exponent.value));
                                //      }
                                // },
                                // importers: [{
                                //     canonicalize(url) {
                                //       if (!url.startsWith('#')) return null;

                                //       url = `./apps/` + url.slice(1) ;

                                //       return new URL(url);
                                //     },
                                //     load(canonicalUrl) {

                                //       return {
                                //         contents: `body {background-color: ${canonicalUrl.pathname}}`,
                                //         syntax: 'scss'
                                //       };
                                //     },

                                //     findFileUrl(url) {
                                //         if (!url.startsWith('#')) return null;

                                //         url = `./apps/` + url.slice(1);
                                //         return new URL(url);
                                //     }
                                // }],

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
