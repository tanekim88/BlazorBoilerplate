"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WebpackWatchEntriesPluginConfigService_1, WebpackWatchEntriesPluginService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackWatchEntriesPlugin = exports.GlobalDb = exports.WebpackWatchEntriesPluginOptions = exports.PatternsCollection = exports.WebpackWatchEntriesPluginService = exports.WebpackWatchEntriesPluginConfigService = void 0;
const webpack_plugin_base_service_1 = require("../webpack-plugin-base/webpack-plugin-base.service");
const webpack_1 = require("webpack");
const path_1 = __importDefault(require("path"));
const glob_base_1 = __importDefault(require("glob-base"));
const glob_1 = __importDefault(require("glob"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const IGNORE_TIME_ENTRY = 'ignore';
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const watchpack_1 = __importDefault(require("watchpack"));
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
const immutability_helper_1 = __importDefault(require("immutability-helper"));
const webpack_sources_1 = require("webpack-sources");
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const loader_utils_1 = __importDefault(require("loader-utils"));
const update = (target, process) => {
    return immutability_helper_1.default(target, process);
};
let WebpackWatchEntriesPluginConfigService = WebpackWatchEntriesPluginConfigService_1 = class WebpackWatchEntriesPluginConfigService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(WebpackWatchEntriesPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            id: WebpackWatchEntriesPluginConfigService_1.name,
            outputPath: this.environmentService.outputDir,
        }, options);
    }
};
WebpackWatchEntriesPluginConfigService = WebpackWatchEntriesPluginConfigService_1 = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWatchEntriesPluginConfigService);
exports.WebpackWatchEntriesPluginConfigService = WebpackWatchEntriesPluginConfigService;
let WebpackWatchEntriesPluginService = WebpackWatchEntriesPluginService_1 = class WebpackWatchEntriesPluginService extends webpack_plugin_base_service_1.WebpackPluginBaseService {
    constructor() {
        super(WebpackWatchEntriesPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            id: WebpackWatchEntriesPluginService_1.name,
            outputPath: this.environmentService.outputDir,
        }, options);
    }
};
WebpackWatchEntriesPluginService = WebpackWatchEntriesPluginService_1 = __decorate([
    process_webpack_providers_1.CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWatchEntriesPluginService);
exports.WebpackWatchEntriesPluginService = WebpackWatchEntriesPluginService;
class Output {
}
class PatternsCollection {
}
exports.PatternsCollection = PatternsCollection;
class DbEntry {
}
class WebpackWatchEntriesPluginOptions extends DbEntry {
}
exports.WebpackWatchEntriesPluginOptions = WebpackWatchEntriesPluginOptions;
class GlobalDb {
    get state() {
        return GlobalDb._state;
    }
    set state(value) {
        GlobalDb._state = value;
    }
    static getState() {
        return GlobalDb._state;
    }
    getState() {
        return this.state;
    }
    getInitialDbEntry(id) {
        return {
            id,
            ignoredFromWatch: [],
            patternsCollection: [],
            directories: [],
            files: [],
            outputPath: undefined,
            entryMap: {},
            chunkIdToDetailsMap: {},
            originalFilePathToFileInfoMap: {},
            fileToChunkIdMap: {},
            extnameToChunkIdsMap: {},
            extnameToExcludedChunkIdsMap: {},
        };
    }
    mergeState(id, dbEntry) {
        if (!this.state[id]) {
            this.state = update(this.state, {
                [id]: {
                    $set: this.getInitialDbEntry(id),
                },
            });
        }
        this.state = update(this.state, {
            [id]: {
                $set: deepmerge_1.default(this.state[id], dbEntry),
            },
        });
        return this.state;
    }
    resetFilesAndDirectives(id) {
        if (!this.state[id]) {
            this.state = update(this.state, {
                [id]: {
                    $set: this.getInitialDbEntry(id),
                },
            });
        }
        this.state = update(this.state, {
            [id]: {
                files: {
                    $set: [],
                },
                directories: {
                    $set: [],
                },
            },
        });
    }
    assignState(id, dbEntry) {
        if (!this.state[id]) {
            this.state = update(this.state, {
                [id]: {
                    $set: this.getInitialDbEntry(id),
                },
            });
        }
        this.state = update(this.state, {
            [id]: {
                $set: dbEntry,
            },
        });
        return this.state;
    }
    getDbEntry(id) {
        return this.state[id];
    }
    getAllPatternsCollections(id) {
        let { patternsCollection, dependsOn } = this.state[id] ?? {};
        patternsCollection = patternsCollection ?? [];
        dependsOn = dependsOn ?? [];
        if (lodash_1.default.isEmpty(patternsCollection) && lodash_1.default.isEmpty(dependsOn)) {
            return [];
        }
        return patternsCollection.concat(...dependsOn.map((dependentId) => {
            return this.getAllPatternsCollections(dependentId);
        }));
    }
    getRefreshedData(id) {
        const dbEntry = this.state[id];
        const originalOutputPath = dbEntry.outputPath;
        let ignoredFromWatch = dbEntry.ignoredFromWatch ?? [];
        ignoredFromWatch = ignoredFromWatch.map((i) => {
            return i.split(path_1.default.sep).join(path_1.default.posix.sep);
        });
        const directories = [];
        const files = [];
        const patternsCollections = this.getAllPatternsCollections(id);
        let entry = {};
        const chunkIdToDetailsMap = {};
        const originalFilePathToFilePathMap = {};
        const extnameToChunkIdsMap = {};
        const extnameToExcludedChunkIdsMap = {};
        const excludedChunkIds = [];
        const exportableChunkIds = [];
        // Map through the globs
        patternsCollections.forEach(function (patternsCollection) {
            if (!patternsCollection.patterns) {
                patternsCollection = {
                    patterns: [patternsCollection],
                    output: {},
                    patternsOptions: {},
                };
            }
            if (!patternsCollection.output) {
                patternsCollection.output = {};
            }
            if (!patternsCollection.patternsOptions) {
                patternsCollection.patternsOptions = {};
            }
            const { output, patterns, patternsOptions, excludeFromHtmlWebpackPlugin, exportable, ignoredFromWatch: ignoredFromWatchArg, } = patternsCollection;
            if (ignoredFromWatchArg) {
                ignoredFromWatch = ignoredFromWatch.concat(patterns.map((pattern) => pattern.split(path_1.default.sep).join(path_1.default.posix.sep)));
            }
            else {
                patterns.forEach((pattern) => {
                    if (typeof pattern === 'string') {
                        const globBaseOptions = glob_base_1.default(pattern);
                        // Dont add if its already in the directories
                        const entryFiles = {};
                        glob_1.default.sync(pattern, patternsOptions).forEach(function (file) {
                            let chunkId = '';
                            if (output.path) {
                                const relativeBase = path_1.default.relative(originalOutputPath, output.path);
                                if (output.relativeTo) {
                                    const relativeToBase = path_1.default.relative(output.relativeTo, file);
                                    chunkId = path_1.default.relative(relativeBase, relativeToBase);
                                }
                                else {
                                    chunkId = relativeBase;
                                }
                                if (output.preserveFilename) {
                                    let fileBaseName = path_1.default.basename(file);
                                    const extname = path_1.default.extname(file);
                                    if (extname) {
                                        fileBaseName = fileBaseName.replace(new RegExp(extname + '$'), '');
                                    }
                                    chunkId = path_1.default.join(chunkId, fileBaseName);
                                }
                                else {
                                    chunkId = path_1.default.join(chunkId, sanitize_filename_1.default(file, { replacement: '_' }));
                                }
                            }
                            else {
                                chunkId = sanitize_filename_1.default(file, { replacement: '_' });
                            }
                            if (!output.preserveFilename) {
                                const fileContent = fs_1.default.readFileSync(file, 'utf-8');
                                const contentHash = loader_utils_1.default.getHashDigest(fileContent);
                                chunkId += '_' + contentHash;
                            }
                            if (output.prefix) {
                                chunkId = output.prefix + '__' + chunkId;
                            }
                            entryFiles[chunkId] = path_1.default.resolve(file);
                            const matchCount = (file.match(/shared/gi) || []).length;
                            chunkIdToDetailsMap[chunkId] = {
                                output: output,
                                originalFilePath: file,
                                sharedWordsCount: matchCount,
                            };
                            if (output.extension) {
                                if (!extnameToChunkIdsMap[`${output.extension}`]) {
                                    extnameToChunkIdsMap[`${output.extension}`] = [];
                                }
                                extnameToChunkIdsMap[`${output.extension}`].push(chunkId);
                            }
                            if (excludeFromHtmlWebpackPlugin) {
                                if (!extnameToExcludedChunkIdsMap[`${output.extension}`]) {
                                    extnameToExcludedChunkIdsMap[`${output.extension}`] = [];
                                }
                                extnameToExcludedChunkIdsMap[`${output.extension}`].push(chunkId);
                                excludedChunkIds.push(chunkId);
                            }
                            if (exportable) {
                                exportableChunkIds.push(chunkId);
                            }
                        });
                        // Set the globbed entryFiles
                        entry = Object.assign(entry, entryFiles);
                        const filesToAdd = Object.values(entryFiles) ?? [];
                        const directory = path_1.default.resolve(globBaseOptions.base);
                        if (!directories.includes(directory) && pattern.includes('*')) {
                            directories.push(directory);
                        }
                        if (output.extension?.ignoredFromWatch && output.extension?.name) {
                            [output.extension.name, '.js'].forEach((ext) => {
                                if (ext) {
                                    const patternExtension = path_1.default.extname(pattern);
                                    let ignoredToAdd = patternExtension
                                        ? pattern.replace(new RegExp(patternExtension + '$'), ext)
                                        : pattern + output.extension.name;
                                    ignoredToAdd = ignoredToAdd.split(path_1.default.sep).join(path_1.default.posix.sep);
                                    ignoredFromWatch = ignoredFromWatch.concat(ignoredToAdd);
                                }
                            });
                        }
                    }
                    else {
                    }
                });
            }
        });
        const toReturn = {};
        toReturn.id = id;
        toReturn.entryMap = entry;
        toReturn.chunkIdToDetailsMap = chunkIdToDetailsMap;
        toReturn.extnameToChunkIdsMap = extnameToChunkIdsMap;
        toReturn.excludedChunkIds = excludedChunkIds;
        toReturn.exportableChunkIds = exportableChunkIds;
        toReturn.files = lodash_1.default.uniq(files);
        toReturn.directories = directories;
        toReturn.ignoredFromWatch = lodash_1.default.uniq(ignoredFromWatch);
        return toReturn;
    }
}
exports.GlobalDb = GlobalDb;
GlobalDb._state = {};
class Db extends GlobalDb {
    constructor(id) {
        super();
        this.id = id;
    }
    mergeLocalState(dbEntry) {
        const state = super.mergeState(this.id, dbEntry);
        return state[this.id];
    }
    getLocalState() {
        return this.state[this.id];
    }
    getRefreshedData() {
        return super.getRefreshedData(this.id);
    }
    getDbEntry() {
        return super.getDbEntry(this.id);
    }
}
const globalDb = new Proxy(new GlobalDb(), {
    set: function (obj, prop, value) {
        obj[prop] = value;
        return true;
    },
});
class WebpackWatchEntriesPlugin {
    constructor(options) {
        this.options = options;
        this.db = new Db(options.id);
        this.db.mergeLocalState(options);
    }
    static getEntries(patternsCollection, id) {
        globalDb.mergeState(id, {
            id,
            patternsCollection,
        });
        return function () {
            const result = globalDb.getRefreshedData(id);
            globalDb.resetFilesAndDirectives(id);
            globalDb.mergeState(id, result);
            return result.entryMap;
        };
    }
    /**
     * Install Plugin
     * @param {Object} compiler
     */
    apply(compiler) {
        // compiler.hooks.afterCompile.tapAsync(this.constructor.name, this.afterCompile.bind(this));
        compiler.hooks.afterEnvironment.tap(WebpackWatchEntriesPlugin.name, () => {
            compiler.watchFileSystem = new NodeWatchFileSystem(compiler.inputFileSystem, this.options);
        });
        compiler.hooks.compilation.tap(WebpackWatchEntriesPlugin.name, (compilation) => {
            compilation.hooks.chunkAsset.tap(WebpackWatchEntriesPlugin.name, (chunk, file) => {
                const details = this.db.getLocalState().chunkIdToDetailsMap[chunk.id];
                const originalFilePath = details ? details.originalFilePath : null;
                const arg = {
                    fileToChunkIdMap: {
                        [file]: chunk.id,
                    },
                    extnameToChunkIdsMap: {
                        [`${path_1.default.extname(file)}`]: [chunk.id],
                    },
                    chunkIdToDetailsMap: {
                        [chunk.id]: {
                            output: {
                                file: file,
                            },
                        },
                    },
                    originalFilePathToFileInfoMap: {
                        [originalFilePath]: {
                            filePath: file,
                            chunkId: chunk.id,
                        },
                    },
                };
                if (originalFilePath) {
                    arg.originalFilePathToFileInfoMap[originalFilePath] = {
                        filePath: file,
                        chunkId: chunk.id.toString(),
                    };
                }
                this.db.mergeLocalState(arg);
            });
            compilation.hooks.processAssets.tap({ name: WebpackWatchEntriesPlugin.name, stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS }, async (assets) => {
                const dbEntry = this.db.getDbEntry();
                for (const fileName of Object.keys(assets)) {
                    const entryMap = dbEntry.entryMap;
                    // const exportableChunkIds = dbEntry.exportableChunkIds ?? [];
                    const chunkId = dbEntry.fileToChunkIdMap[fileName];
                    if (chunkId) {
                        const entryDetails = dbEntry.chunkIdToDetailsMap[chunkId];
                        if (entryDetails?.output?.extension?.name === '.json') {
                            const originalFilePath = entryMap[chunkId];
                            const originalFilePathExt = path_1.default.extname(originalFilePath);
                            if (['.js', '.ts'].includes(originalFilePathExt)) {
                                const extname = path_1.default.extname(fileName);
                                let jsonRelPath = fileName;
                                if (extname) {
                                    jsonRelPath = jsonRelPath.replace(new RegExp(extname + '$'), '.json');
                                }
                                else {
                                    jsonRelPath += '.json';
                                }
                                let json = {};
                                try {
                                    delete require.cache[originalFilePath];
                                    json = (await Promise.resolve().then(() => __importStar(require(originalFilePath)))).default;
                                    const finalSource = JSON.stringify(json, undefined, 4);
                                    const rawSarouce = new webpack_sources_1.RawSource(finalSource);
                                    if (compilation.getAsset(jsonRelPath)) {
                                        compilation.updateAsset(jsonRelPath, rawSarouce);
                                    }
                                    else {
                                        compilation.emitAsset(jsonRelPath, rawSarouce);
                                    }
                                }
                                catch (e) {
                                    console.dir('!!!!!!!!!!!!!!!!!!!???????????????!!!!!!!!!!!!');
                                    console.dir(originalFilePath);
                                    console.dir(e);
                                }
                                finally {
                                    if (!entryDetails.output.extension.preserveOriginalOutput) {
                                        compilation.deleteAsset(fileName);
                                    }
                                }
                            }
                        }
                    }
                }
            });
            html_webpack_plugin_1.default.getHooks(compilation).beforeAssetTagGeneration.tapAsync('HtmlWebpackCustomizer', // <-- Set a meaningful name here for stacktraces
            (data, cb) => {
                const dbEntry = this.db.getDbEntry();
                const jsToExclude = [];
                const jsToPriotize = {};
                (dbEntry.extnameToChunkIdsMap['.js'] ?? []).forEach((chunkId) => {
                    const file = dbEntry.chunkIdToDetailsMap[chunkId]?.output?.file;
                    if (file) {
                        const originalFilePath = dbEntry.chunkIdToDetailsMap[chunkId]?.originalFilePath;
                        const sharedWordsCount = dbEntry.chunkIdToDetailsMap[chunkId]?.sharedWordsCount;
                        const jsFileName = '/' + encodeURIComponent(file);
                        if (dbEntry.excludedChunkIds?.includes(chunkId)) {
                            jsToExclude.push(jsFileName);
                        }
                        if (originalFilePath) {
                            jsToPriotize[jsFileName] = sharedWordsCount;
                            if (originalFilePath.includes('tailwind')) {
                                jsToPriotize[jsFileName] = -1;
                            }
                        }
                    }
                });
                // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBB');
                // console.dir(data);
                // console.dir(jsToExclude);
                // console.dir(jsToPriotize);
                data.assets.js = data.assets.js
                    .filter((js) => {
                    if (jsToExclude.includes(js)) {
                        return false;
                    }
                    return true;
                })
                    .sort((a, b) => {
                    const aScore = jsToPriotize[a] ?? 0;
                    const bScore = jsToPriotize[b] ?? 0;
                    return aScore > bScore ? -1 : 1;
                });
                cb(null, data);
            });
        });
    }
}
exports.WebpackWatchEntriesPlugin = WebpackWatchEntriesPlugin;
class NodeWatchFileSystem {
    constructor(inputFileSystem, options) {
        this.inputFileSystem = inputFileSystem;
        this.options = options;
        this.watcherOptions = {
            aggregateTimeout: 0,
        };
        this.watcher = new watchpack_1.default(this.watcherOptions);
    }
    /**
     * @param {Iterable<string>} files watched files
     * @param {Iterable<string>} directories watched directories
     * @param {Iterable<string>} missing watched exitance entries
     * @param {number} startTime timestamp of start time
     * @param {WatchOptions} options options object
     * @param {function(Error=, Map<string, FileSystemInfoEntry>, Map<string, FileSystemInfoEntry>, Set<string>, Set<string>): void} callback aggregated callback
     * @param {function(string, number): void} callbackUndelayed callback when the first change was detected
     * @returns {Watcher} a watcher
     */
    watch(files, directories, missing, startTime, options, callback, callbackUndelayed) {
        if (!files || typeof files[Symbol.iterator] !== 'function') {
            throw new Error("Invalid arguments: 'files'");
        }
        if (!directories || typeof directories[Symbol.iterator] !== 'function') {
            throw new Error("Invalid arguments: 'directories'");
        }
        if (!missing || typeof missing[Symbol.iterator] !== 'function') {
            throw new Error("Invalid arguments: 'missing'");
        }
        if (typeof callback !== 'function') {
            throw new Error("Invalid arguments: 'callback'");
        }
        if (typeof startTime !== 'number' && startTime) {
            throw new Error("Invalid arguments: 'startTime'");
        }
        if (typeof options !== 'object') {
            throw new Error("Invalid arguments: 'options'");
        }
        if (typeof callbackUndelayed !== 'function' && callbackUndelayed) {
            throw new Error("Invalid arguments: 'callbackUndelayed'");
        }
        const entries = globalDb.getDbEntry(this.options.id);
        const directoriesToAdd = entries.directories;
        const ignoredFromWatch = entries.ignoredFromWatch ?? [];
        directoriesToAdd.forEach((entryDirectory) => {
            directories.add(entryDirectory);
            files.delete(entryDirectory);
        });
        // console.log('DDDDDDDDDDDDDDDDDDDDDDDDD');
        // console.dir(Array.from(directoriesToAdd));
        // console.log('11111111111111111111111111111');
        // console.dir(Array.from(directories));
        // console.log('22222222222222222222222222');
        // console.log(Array.from(files));
        // entryFiles.forEach((f)=>{
        //     files['add'](f);
        // })
        // console.log('To Add')
        // console.dir(entryDirectories);
        // console.dir(entryFiles)
        // console.log('To remove')
        // console.dir(directoriesToRemoveFromWatch);
        // console.dir(filesToRemoveFromWatch)
        // console.log('Result')
        // console.dir(Array.from( directories));
        // console.dir(Array.from(files), {maxArrayLength: 1000});
        if (ignoredFromWatch.length > 0) {
            options.ignored = ignoredFromWatch;
        }
        const oldWatcher = this.watcher;
        this.watcher = new watchpack_1.default(options);
        if (callbackUndelayed) {
            this.watcher.once('change', callbackUndelayed);
        }
        this.watcher.on('change', function (filePath, mtime, explanation) {
            console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
            console.dir(filePath);
            console.dir(explanation);
        });
        this.watcher.once('aggregated', (changes, removals) => {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            console.dir(changes);
            console.dir(removals);
            if (this.inputFileSystem && this.inputFileSystem.purge) {
                for (const item of changes) {
                    this.inputFileSystem.purge(item);
                }
                for (const item of removals) {
                    this.inputFileSystem.purge(item);
                }
            }
            const times = this.watcher.getTimeInfoEntries();
            callback(null, times, times, changes, removals);
        });
        this.watcher.on('remove', function (filePath, explanation) {
            console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
            console.dir(filePath);
            console.dir(explanation);
            if (path_1.default.extname(filePath) === '.scss') {
                const toDelete = filePath.replace(/\.scss$/, '.css');
                if (fs_1.default.existsSync(toDelete)) {
                    fs_1.default.unlinkSync(toDelete);
                }
            }
            // filePath: the removed file or directory
            // explanation: textual information how this change was detected
        });
        this.watcher.on('initial-missing', (type) => {
            console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
            console.dir(type);
        });
        this.watcher.watch({ files, directories, missing, startTime });
        if (oldWatcher) {
            oldWatcher.close();
        }
        return {
            close: () => {
                if (this.watcher) {
                    this.watcher.close();
                    this.watcher = null;
                }
            },
            pause: () => {
                if (this.watcher) {
                    this.watcher.pause();
                }
            },
            getFileTimeInfoEntries: () => {
                if (this.watcher) {
                    return this.watcher.getTimeInfoEntries();
                }
                else {
                    return new Map();
                }
            },
            getContextTimeInfoEntries: () => {
                if (this.watcher) {
                    return this.watcher.getTimeInfoEntries();
                }
                else {
                    return new Map();
                }
            },
        };
    }
}
//# sourceMappingURL=webpack-watch-entries-plugin.service.js.map