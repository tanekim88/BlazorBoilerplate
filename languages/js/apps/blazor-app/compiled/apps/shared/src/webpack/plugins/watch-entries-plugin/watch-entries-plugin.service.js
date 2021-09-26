var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebpackWatchEntriesPluginConfigService_1, WebpackWatchEntriesPluginService_1;
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
import webpack from 'webpack';
const Compilation = webpack.Compilation;
import path from 'path';
import globBase from 'glob-base';
import glob from 'glob';
import fs from 'fs';
import _ from 'lodash';
import deepMerge from 'deepmerge';
const IGNORE_TIME_ENTRY = 'ignore';
import sanitizeFilename from 'sanitize-filename';
import Watchpack from 'watchpack';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import immutabilityHelper from 'immutability-helper';
import { RawSource } from 'webpack-sources';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import loaderUtils from 'loader-utils';
const update = (target, process) => {
    return immutabilityHelper(target, process);
};
let WebpackWatchEntriesPluginConfigService = WebpackWatchEntriesPluginConfigService_1 = class WebpackWatchEntriesPluginConfigService extends WebpackPluginBaseService {
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
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWatchEntriesPluginConfigService);
export { WebpackWatchEntriesPluginConfigService };
let WebpackWatchEntriesPluginService = WebpackWatchEntriesPluginService_1 = class WebpackWatchEntriesPluginService extends WebpackPluginBaseService {
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
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackWatchEntriesPluginService);
export { WebpackWatchEntriesPluginService };
export class Extension {
    name;
    ignoredFromWatch;
    preserveOriginalOutput;
}
class Output {
    path;
    relativeTo;
    file;
    preserveFilename;
    extensions;
    prefix;
}
export class PatternsCollection {
    patterns;
    output;
    patternsOptions;
    excludeFromHtmlWebpackPlugin;
    exportable;
    ignoredFromWatch;
    ignoredPatterns;
    watchThePatternsOnly;
}
class DbEntry {
    id;
    dependsOn;
    ignoredFromWatch;
    patternsCollection;
    directories;
    files;
    outputPath;
    chunkIdToDetailsMap;
    originalFilePathToFileInfoMap;
    extnameToChunkIdsMap;
    extnameToExcludedChunkIdsMap;
    excludedChunkIds;
    entryMap;
    fileToChunkIdMap;
    exportableChunkIds;
}
export class WebpackWatchEntriesPluginOptions extends DbEntry {
    watchOptions;
}
export class GlobalDb {
    static _state = {};
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
                $set: deepMerge(this.state[id], dbEntry),
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
        if (_.isEmpty(patternsCollection) && _.isEmpty(dependsOn)) {
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
            return i.split(path.sep).join(path.posix.sep);
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
            const { output, patterns, patternsOptions, excludeFromHtmlWebpackPlugin, exportable, ignoredFromWatch: ignoredFromWatchArg, watchThePatternsOnly } = patternsCollection;
            if (ignoredFromWatchArg) {
                ignoredFromWatch = ignoredFromWatch.concat(patterns.map((pattern) => pattern.split(path.sep).join(path.posix.sep)));
            }
            else {
                patterns.forEach((pattern) => {
                    if (typeof pattern === 'string') {
                        const globBaseOptions = globBase(pattern);
                        // Dont add if its already in the directories
                        const entryFiles = {};
                        glob.sync(pattern, patternsOptions).forEach(function (file) {
                            let chunkId = '';
                            if (watchThePatternsOnly) {
                                files.push(path.resolve(file));
                            }
                            if (output.path) {
                                const relativeBase = path.relative(originalOutputPath, output.path);
                                if (output.relativeTo) {
                                    const relativeToBase = path.relative(output.relativeTo, file);
                                    chunkId = path.relative(relativeBase, relativeToBase);
                                }
                                else {
                                    chunkId = relativeBase;
                                }
                                if (output.preserveFilename) {
                                    let fileBaseName = path.basename(file);
                                    const extname = path.extname(file);
                                    if (extname) {
                                        fileBaseName = fileBaseName.replace(new RegExp(extname + '$'), '');
                                    }
                                    chunkId = path.join(chunkId, fileBaseName);
                                }
                                else {
                                    chunkId = path.join(chunkId, sanitizeFilename(file, { replacement: '_' }));
                                }
                            }
                            else {
                                chunkId = sanitizeFilename(file, { replacement: '_' });
                            }
                            if (!output.preserveFilename) {
                                const fileContent = fs.readFileSync(file, 'utf-8');
                                const contentHash = loaderUtils.getHashDigest(fileContent);
                                chunkId += '_' + contentHash;
                            }
                            if (output.prefix) {
                                chunkId = output.prefix + '__' + chunkId;
                            }
                            entryFiles[chunkId] = path.resolve(file);
                            const matchCount = (file.match(/shared/gi) || []).length;
                            chunkIdToDetailsMap[chunkId] = {
                                output: output,
                                originalFilePath: file,
                                sharedWordsCount: matchCount,
                            };
                            if (output.extensions) {
                                output.extensions.forEach(extension => {
                                    if (!extnameToChunkIdsMap[`${extension}`]) {
                                        extnameToChunkIdsMap[`${extension}`] = [];
                                    }
                                    extnameToChunkIdsMap[`${extension}`].push(chunkId);
                                });
                            }
                            if (excludeFromHtmlWebpackPlugin) {
                                output.extensions.forEach(extension => {
                                    if (!extnameToExcludedChunkIdsMap[`${extension}`]) {
                                        extnameToExcludedChunkIdsMap[`${extension}`] = [];
                                    }
                                    extnameToExcludedChunkIdsMap[`${extension}`].push(chunkId);
                                });
                                excludedChunkIds.push(chunkId);
                            }
                            if (exportable) {
                                exportableChunkIds.push(chunkId);
                            }
                        });
                        // Set the globbed entryFiles
                        entry = Object.assign(entry, entryFiles);
                        const filesToAdd = Object.values(entryFiles) ?? [];
                        const directory = path.resolve(globBaseOptions.base);
                        if (!directories.includes(directory) && pattern.includes('*') && !watchThePatternsOnly) {
                            directories.push(directory);
                        }
                        [{
                                name: '.js',
                                ignoredFromWatch: true
                            }].concat(output.extensions ?? [])?.forEach(extension => {
                            if (extension.ignoredFromWatch && extension.name) {
                                [extension.name].forEach((ext) => {
                                    if (ext) {
                                        const patternExtension = path.extname(pattern);
                                        let ignoredToAdd = patternExtension
                                            ? pattern.replace(new RegExp(patternExtension + '$'), ext)
                                            : pattern + extension.name;
                                        ignoredToAdd = ignoredToAdd.split(path.sep).join(path.posix.sep);
                                        ignoredFromWatch = ignoredFromWatch.concat(ignoredToAdd);
                                    }
                                });
                            }
                        });
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
        toReturn.files = _.uniq(files);
        toReturn.directories = directories;
        toReturn.ignoredFromWatch = _.uniq(ignoredFromWatch);
        return toReturn;
    }
}
class Db extends GlobalDb {
    id;
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
export class WebpackWatchEntriesPlugin {
    options;
    db;
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
            if (compiler.watchFileSystem && compiler.watchFileSystem['close']) {
                compiler.watchFileSystem['close']();
            }
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
                        [`${path.extname(file)}`]: [chunk.id],
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
            compilation.hooks.processAssets.tap({ name: WebpackWatchEntriesPlugin.name, stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS }, async (assets) => {
                const dbEntry = this.db.getDbEntry();
                for (const fileName of Object.keys(assets)) {
                    const entryMap = dbEntry.entryMap;
                    // const exportableChunkIds = dbEntry.exportableChunkIds ?? [];
                    const chunkId = dbEntry.fileToChunkIdMap[fileName];
                    if (chunkId) {
                        const entryDetails = dbEntry.chunkIdToDetailsMap[chunkId];
                        entryDetails?.output?.extensions?.forEach(async (extension) => {
                            if (extension?.name === '.json') {
                                const originalFilePath = entryMap[chunkId];
                                const originalFilePathExt = path.extname(originalFilePath);
                                if (['.js', '.ts'].includes(originalFilePathExt)) {
                                    const extname = path.extname(fileName);
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
                                        json = (await import(originalFilePath)).default;
                                        const finalSource = JSON.stringify(json, undefined, 4);
                                        const rawSarouce = new RawSource(finalSource);
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
                                        if (!extension.preserveOriginalOutput) {
                                            compilation.deleteAsset(fileName);
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });
            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync('HtmlWebpackCustomizer', // <-- Set a meaningful name here for stacktraces
            (data, cb) => {
                const dbEntry = this.db.getDbEntry();
                const jsToExclude = [];
                const jsToPriotize = {};
                const template = data.plugin.options.template;
                if (!dbEntry.files?.includes(template)) {
                    dbEntry.files.push(template);
                    if (compiler.watchFileSystem && compiler.watchFileSystem['close']) {
                        compiler.watchFileSystem['close']();
                    }
                    compiler.watchFileSystem = new NodeWatchFileSystem(compiler.inputFileSystem, this.options);
                }
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
class NodeWatchFileSystem {
    inputFileSystem;
    options;
    watcher;
    watcherOptions;
    constructor(inputFileSystem, options) {
        this.inputFileSystem = inputFileSystem;
        this.options = options;
        const entries = globalDb.getDbEntry(this.options.id);
        const ignoredFromWatch = entries.ignoredFromWatch ?? [];
        this.watcherOptions = deepMerge({
            aggregateTimeout: 0,
            poll: true,
            followSymlinks: false,
            ignored: ['**/*.js'].concat(ignoredFromWatch ?? []),
        }, options?.watcherOptions ?? {});
        this.watcher = new Watchpack(this.watcherOptions);
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
        const entryFiles = entries.files ?? [];
        const entryDirectories = entries.directories ?? [];
        console.dir(...directories);
        const oldWatcher = this.watcher;
        const ignoredFromWatch = entries.ignoredFromWatch ?? [];
        options.ignored = ignoredFromWatch;
        this.watcher = new Watchpack(options);
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
            if (path.extname(filePath) === '.scss') {
                const toDelete = filePath.replace(/\.scss$/, '.css');
                if (fs.existsSync(toDelete)) {
                    fs.unlinkSync(toDelete);
                }
            }
            // filePath: the removed file or directory
            // explanation: textual information how this change was detected
        });
        this.watcher.on('initial-missing', (type) => {
            console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
            console.dir(type);
        });
        const filesArray = [...files];
        const dirArrays = [...directories];
        const missingArray = [...missing];
        // console.dir(filesArray);
        // console.dir(dirArrays);
        // console.dir(missingArray);
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        console.dir(entryFiles);
        console.dir(entryDirectories);
        if (oldWatcher) {
            oldWatcher.close();
        }
        this.watcher.watch({ files: entryFiles, directories: entryDirectories, missing: [], startTime });
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
            getAggregatedRemovals: () => {
                return this.watcher && this.watcher.aggregatedRemovals;
            },
            getAggregatedChanges: () => {
                return this.watcher && this.watcher.aggregatedChanges;
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
    close() {
        if (this.watcher) {
            this.watcher.close();
        }
    }
}
//# sourceMappingURL=watch-entries-plugin.service.js.map