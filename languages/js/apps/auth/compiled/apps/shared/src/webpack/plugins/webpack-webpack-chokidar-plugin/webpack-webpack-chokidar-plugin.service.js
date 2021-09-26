"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackWebpackChokidarPluginService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
// const WebpackChokidarPlugin = require('webpack-chokidar-plugin');
const chokidar_1 = __importDefault(require("chokidar"));
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
let WebpackWebpackChokidarPluginService = class WebpackWebpackChokidarPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(WebpackChokidarPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            onAddCallback: function (filePath) {
                let asyncEntry;
                this.compiler.hooks.entryOption.tap(this.constructor.name, (context, entry) => {
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
        }, options);
    }
};
WebpackWebpackChokidarPluginService = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWebpackChokidarPluginService);
exports.WebpackWebpackChokidarPluginService = WebpackWebpackChokidarPluginService;
class WebpackChokidarPlugin {
    constructor(options = {}) {
        this.options = options;
    }
    apply(compiler) {
        let asyncEntry;
        const options = this.options;
        compiler.hooks.afterCompile.tap(this.constructor.name, function (compilation) {
            const watcher = chokidar_1.default.watch(options.watchFileRegex, {
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
                .on('add', options.onAddCallback
                ? options.onAddCallback.bind(callbackContext)
                : function (filePath) {
                    console.log(`\n\n Compilation Started  after add of - ${filePath} \n\n`);
                    return null;
                })
                .on('change', options.onChangeCallback
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
                })
                .on('unlink', options.onUnlinkCallback
                ? options.onUnlinkCallback.bind(callbackContext)
                : function (path) {
                    console.log(`File ${path} has been removed`);
                });
            watcher
                .on('addDir', options.onAddDirCallback
                ? options.onAddDirCallback.bind(callbackContext)
                : function (path) {
                    console.log(`Directory ${path} has been added`);
                })
                .on('unlinkDir', options.unlinkDirCallback
                ? options.unlinkDirCallback.bind(callbackContext)
                : function (path) {
                    console.log(`Directory ${path} has been removed`);
                })
                .on('error', options.onErrorCallback
                ? options.onErrorCallback.bind(callbackContext)
                : function (error) {
                    console.log(`Watcher error: ${error}`);
                })
                .on('ready', options.onReadyCallback
                ? options.onReadyCallback.bind(callbackContext)
                : function () {
                    console.log('Initial scan complete. Ready for changes');
                })
                .on('raw', options.onRawCallback
                ? options.onRawCallback.bind(callbackContext)
                : function (event, path, details) {
                    return null;
                });
        });
    }
}
//# sourceMappingURL=webpack-webpack-chokidar-plugin.service.js.map