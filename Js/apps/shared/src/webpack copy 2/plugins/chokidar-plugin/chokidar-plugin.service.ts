import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';

// const WebpackChokidarPlugin = require('webpack-chokidar-plugin');

import chokidar from 'chokidar';
import { Compiler } from 'webpack';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class WebpackWebpackChokidarPluginService extends WebpackPluginBaseService {
    constructor() {
        super(WebpackChokidarPlugin);
    }

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                onAddCallback: function (filePath) {
                    let asyncEntry;
                    this.compiler.hooks.entryOption.tap(this.constructor.name, (context, entry): any => {
                        asyncEntry = entry;
                    });

                    const entry = asyncEntry();

                    entry.then((e) => {
                        const originalSize = this.compilation.fileDependencies.size;

                        //   console.log('00000000000000000000000000');
                        //   console.dir(e);
                        // const filesPaths = Object.values(e);
                        // filesPaths.forEach((filePath) => {
                        //     this.compilation.fileDependencies.add(filePath['import'][0].replace(/\//g, '\\'));
                        // });

                        if (originalSize && originalSize !== this.compilation.fileDependencies.size) {
                            console.log('3333333333333333333333');
                            console.dir(originalSize);
                            console.dir(this.compilation.fileDependencies.size);
                        }
                    });
                },
            },
            options,
        );
    }
}

class WebpackChokidarPlugin {
    constructor(private options = {} as any) {}
    apply(compiler: Compiler) {
        let asyncEntry;
        const options = this.options;

        compiler.hooks.afterCompile.tap(this.constructor.name, function (compilation) {
            const watcher = chokidar.watch(options.watchFileRegex, {
                persistent: options.persistance || true,
                ignored: options.ignored || false,
                ignoreInitial: options.ignoreInitial || false,
                followSymlinks: options.followSymlinks || true,
                // cwd: options.cwd || '.',
                disableGlobbing: options.disableGlobbing || false,
                usePolling: options.usePolling || true,
                interval: options.interval || 100,
                binaryInterval: options.binaryInterval || 300,
                alwaysStat: options.alwaysStat || false,
                depth: options.depth || 99,
                awaitWriteFinish: {
                    stabilityThreshold: options.stabilityThreshold || 2000,
                    pollInterval: options.pollInterval || 100,
                },

                ignorePermissionErrors: options.ignorePermissionErrors || false,
                atomic: options.atomic || true,
            });

            const callbackContext = { compiler, watcher, compilation };
            watcher
                .on(
                    'add',
                    options.onAddCallback
                        ? options.onAddCallback.bind(callbackContext)
                        : function (filePath) {
                              console.log(`\n\n Compilation Started  after add of - ${filePath} \n\n`);

                              return null;
                          },
                )
                .on(
                    'change',
                    options.onChangeCallback
                        ? options.onChangeCallback.bind(callbackContext)
                        : function (path) {
                              console.log(`\n\n Compilation Started  after change of - ${path} \n\n`);
                              //   console.log('!!!333333333333333333333333333!');
                              //   console.dir(compilation.fileDependencies);
                              //   asyncEntry().then((entry) => {
                              //       const filesPaths = Object.values(entry);

                              //       filesPaths.forEach((filePath) => {
                              //           compilation.fileDependencies.add(filePath['import'][0].replace(/\//g, '\\'));
                              //       });
                              //   });

                              //   compiler.compile((callback) => {
                              //       return;
                              //   });

                              console.log(`\n\n Compilation ended  for change of - ${path} \n\n`);
                          },
                )
                .on(
                    'unlink',
                    options.onUnlinkCallback
                        ? options.onUnlinkCallback.bind(callbackContext)
                        : function (path) {
                              console.log(`File ${path} has been removed`);
                          },
                );

            watcher
                .on(
                    'addDir',
                    options.onAddDirCallback
                        ? options.onAddDirCallback.bind(callbackContext)
                        : function (path) {
                              console.log(`Directory ${path} has been added`);
                          },
                )
                .on(
                    'unlinkDir',
                    options.unlinkDirCallback
                        ? options.unlinkDirCallback.bind(callbackContext)
                        : function (path) {
                              console.log(`Directory ${path} has been removed`);
                          },
                )
                .on(
                    'error',
                    options.onErrorCallback
                        ? options.onErrorCallback.bind(callbackContext)
                        : function (error) {
                              console.log(`Watcher error: ${error}`);
                          },
                )
                .on(
                    'ready',
                    options.onReadyCallback
                        ? options.onReadyCallback.bind(callbackContext)
                        : function () {
                              console.log('Initial scan complete. Ready for changes');
                          },
                )
                .on(
                    'raw',
                    options.onRawCallback
                        ? options.onRawCallback.bind(callbackContext)
                        : function (event, path, details) {
                              return null;
                          },
                );
        });
    }
}
