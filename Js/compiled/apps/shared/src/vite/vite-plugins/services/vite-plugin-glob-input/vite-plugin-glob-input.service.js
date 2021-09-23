var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '#shared/src/functions/process-providers';
// import { CustomInjectable } from '../../../functions/process-webpack-providers';
import path from 'path';
import { VitePluginBaseService } from '../../vite-plugin-base/vite-plugin-base.service';
// import { configsCollections } from '#shared/configs-collection';
import { normalizePath } from 'vite';
import fastGlob from 'fast-glob';
import fs from 'fs';
import { dirname } from 'path/posix';
var NodeType;
(function (NodeType) {
    NodeType["Literal"] = "Literal";
    NodeType["CallExpression"] = "CallExpression";
    NodeType["Identifier"] = "Identifier";
    NodeType["ImportDeclaration"] = "ImportDeclaration";
    NodeType["ExportNamedDeclaration"] = "ExportNamedDeclaration";
    NodeType["ExportAllDeclaration"] = "ExportAllDeclaration";
})(NodeType || (NodeType = {}));
export function isEmpty(array) {
    return !array || array.length === 0;
}
export function getRequireSource(node) {
    if (node.type !== NodeType.CallExpression) {
        return false;
    }
    if (node.callee.type !== NodeType.Identifier || isEmpty(node.arguments)) {
        return false;
    }
    const args = node.arguments;
    if (node.callee.name !== 'require' || args[0].type !== NodeType.Literal) {
        return false;
    }
    return args[0];
}
export function getImportSource(node) {
    if (node.type !== NodeType.ImportDeclaration || node.source.type !== NodeType.Literal) {
        return false;
    }
    return node.source;
}
export function getExportSource(node) {
    const exportNodes = [NodeType.ExportAllDeclaration, NodeType.ExportNamedDeclaration];
    if (!exportNodes.includes(node.type) || !node.source || node.source.type !== NodeType.Literal) {
        return false;
    }
    return node.source;
}
function processPath(values, text, relativeFromPath) {
    let temp = text;
    values.forEach(value => {
        temp = temp.replace(value.absFrom, value.relTo);
    });
    return temp || text;
}
let VitePluginGlobInputService = class VitePluginGlobInputService extends VitePluginBaseService {
    createPlugin(options) {
        let config;
        let server;
        const absFromToData = {};
        const absFrom2ToData = {};
        const absToToData = {};
        return ({
            name: 'vite-plugin-glob-input',
            enforce: 'pre',
            buildStart(args) {
                console.log('### args');
                console.dir(args);
            },
            config(config, args) {
                console.log('### config');
                console.dir(config);
                console.dir(args);
                if (args.command === 'build') {
                    // config.root = __dirname
                }
                const root = config.root;
                const outDir = config.build.outDir;
            },
            configResolved(resolvedConfig) {
                console.log('### configResolved');
                console.dir(resolvedConfig);
                // store the resolved config
                config = resolvedConfig;
            },
            options(conf) {
                console.log('### options');
                console.dir(conf);
                const root = config.root;
                const outDir = config.build.outDir;
                let input = options.inputs.flatMap(input => {
                    if (input.include) {
                        input.include = input.include.map(p => normalizePath(p));
                        input.relativeTo = input.relativeTo && normalizePath(input.relativeTo);
                    }
                    if (input.fromPath) {
                        const fromPath = normalizePath(input.fromPath);
                        input.include = [fromPath];
                    }
                    const entries = fastGlob
                        .sync(input.include, Object.assign({}, input.globOptions, {
                        stats: false,
                    }));
                    entries.forEach(absFrom => {
                        let relTo;
                        let relTo2;
                        if (input.relativeTo) {
                            relTo = normalizePath(path.relative(input.relativeTo, absFrom));
                        }
                        if (input.toRelativePath) {
                            relTo = normalizePath(input.toRelativePath);
                        }
                        if (input.toName) {
                            const dir = dirname(path.relative(root, absFrom));
                            relTo = normalizePath(path.join(dir, input.toName));
                        }
                        relTo2 = relTo;
                        if (input.action === 'copy') {
                            for (let output of conf.output) {
                                let finalPath;
                                if (input.relativeTo || input.toName) {
                                    finalPath = path.join(output.dir, relTo);
                                }
                                if (input.toRelativePath) {
                                    finalPath = path.join(output.dir, input.toRelativePath);
                                }
                                fs.copyFileSync(absFrom, finalPath);
                            }
                        }
                        else {
                            if (path.extname(relTo) === '.js' && path.extname(absFrom) === '.ts') {
                                relTo = relTo.replace(/\.js$/, '.ts');
                                relTo = relTo.replace(/\.?\[chunk\]/g, '');
                            }
                            const absFrom2 = normalizePath(path.resolve(root, relTo));
                            const code = fs.readFileSync(absFrom, { encoding: 'utf8' });
                            const absTo = normalizePath(path.resolve(root, relTo));
                            const absTo2 = normalizePath(path.resolve(root, relTo2));
                            const from2ToFrom = path.relative(dirname(absFrom2), dirname(absFrom));
                            absFromToData[absFrom] = {
                                absFrom, absFrom2,
                                relTo,
                                relTo2,
                                absTo,
                                absTo2,
                                action: input.action,
                                code,
                                from2ToFrom,
                                htmlToken: input.htmlToken
                            };
                            absFrom2ToData[absFrom2] = absFromToData[absFrom];
                            absToToData[absTo] = absFromToData[absFrom];
                        }
                    });
                    if (input.action === 'copy') {
                        return null;
                    }
                    return entries;
                }).filter(x => x);
                conf.input = input;
                return conf;
            },
            resolveId(source, importer, options) {
                console.log('### resolveId');
                console.dir(source);
                console.dir(importer);
                console.dir(options);
                console.dir(absFromToData);
                if (importer) {
                    const foundObj = absFrom2ToData[importer];
                    if (foundObj) {
                        if (!path.isAbsolute(source)) {
                            const importerDir = dirname(importer);
                            const absSource = normalizePath(path.resolve(importerDir, source));
                            let relFrom = normalizePath(path.join(foundObj.from2ToFrom, source));
                            if (source.startsWith('./') && !relFrom.startsWith('.')) {
                                relFrom = './' + relFrom;
                            }
                            let absFrom = normalizePath(path.join(config.root, relFrom));
                            let exist = !!path.extname(absFrom) && fs.existsSync(absFrom);
                            if (!exist) {
                                for (let ext of config.resolve.extensions) {
                                    if (fs.existsSync(absFrom + ext)) {
                                        absFrom = absFrom + ext;
                                        exist = true;
                                        break;
                                    }
                                }
                            }
                            if (exist) {
                                const code = fs.readFileSync(absFrom, { encoding: 'utf8' });
                                const arg = {
                                    from2ToFrom: path.join(foundObj.from2ToFrom, dirname(source)),
                                    code
                                };
                                absFrom2ToData[absFrom] = arg;
                                return { id: absFrom, external: 'relative' };
                            }
                        }
                    }
                }
                const foundObj = absFromToData[source];
                if (foundObj?.absTo) {
                    return foundObj.absTo;
                }
            },
            load(id) {
                console.log('### load');
                console.dir(id);
                if (absToToData[id]) {
                    return absToToData[id].code;
                }
            },
            transform(src, id) {
                console.log('### transform');
                // console.dir(src);
                console.dir(id);
                // if (fileRegex.test(id)) {
                //   return {
                //     code: compileFileToJS(src),
                //     map: null // provide source map if available
                //   }
                // }
            },
            outputOptions(outputOptions) {
                console.log('### outputOptions');
                console.dir(outputOptions);
                return outputOptions;
            },
            augmentChunkHash(chunkInfo) {
                console.log('### augmentChunkHash');
                console.dir(chunkInfo);
                // if (chunkInfo.name === 'foo') {
                //   return Date.now().toString();
                // }
            },
            renderChunk(code, chunk, options) {
                console.log('### renderChunk');
                // console.dir(code);
                console.dir(chunk);
                console.dir(options);
                // if (!relOutputPathToRelOutputPathDic[chunk.fileName]) {
                //   relOutputPathToRelOutputPathDic[chunk.fileName] = {}
                // }
                // relOutputPathToRelOutputPathDic[chunk.fileName].from = chunk.fileName;
                // relOutputPathToRelOutputPathDic[chunk.fileName].imports = chunk.imports;
                // relOutputPathToRelOutputPathDic[chunk.fileName].facadeModuleId = chunk.facadeModuleId;
                // if (chunk.isEntry) {
                //   if (chunk.facadeModuleId.endsWith('.ts')) {
                //     if (absFromToRelOutput[chunk.facadeModuleId]) {
                //     }
                //   }
                // }
            },
            generateBundle(option, bundle, isWrite) {
                console.log('### generateBundle');
                console.dir(option);
                console.dir(bundle);
                console.dir(isWrite);
                const files = Object.entries(bundle);
                for (const [key, file] of files) {
                    for (const input of options.inputs) {
                        const sourceMaps = input.sourceMap !== false;
                        // if (!file.facadeModuleId?.endsWith('.ts')) {
                        //   continue;
                        // } else {
                        //   if (!input.include.includes(file.facadeModuleId)) {
                        //     continue
                        //   }
                        // }
                        // const relPathObj = file.facadeModuleId && absInputPathToRelOutputPathDic[file.facadeModuleId];
                        // if (relPathObj) {
                        //   let newFacadeModuleId = resolve(root, relPathObj.from);
                        //   newFacadeModuleId = join(dirname(newFacadeModuleId), basename(file.facadeModuleId))
                        //   newFacadeModuleId = normalizePath(newFacadeModuleId);
                        //   relPathObj.source = newFacadeModuleId;
                        //   if (newFacadeModuleId !== file.facadeModuleId) {
                        //     absInputPathToRelOutputPathDic[newFacadeModuleId] = relPathObj;
                        //     delete absInputPathToRelOutputPathDic[file.facadeModuleId]
                        //     file.facadeModuleId = newFacadeModuleId;
                        //   }
                        //   if (file.type !== 'chunk' || file.facadeModuleId.endsWith('.ts')) {
                        //     const values = Object.values(absInputPathToRelOutputPathDic);
                        //     file.imports = file.imports.map((imported: string) => {
                        //       const toReturn = processPath(values, imported, relative(root, file.facadeModuleId));
                        //       return toReturn;
                        //     });
                        //     if (file.code) {
                        //       const magicString = new MagicString(file.code);
                        //       const ast = this.parse(file.code, {
                        //         ecmaVersion: 6,
                        //         sourceType: 'module',
                        //       });
                        //       walk(ast, {
                        //         enter(node) {
                        //           if (
                        //             [
                        //               NodeType.ImportDeclaration,
                        //               NodeType.CallExpression,
                        //               NodeType.ExportAllDeclaration,
                        //               NodeType.ExportNamedDeclaration,
                        //             ].includes(node.type as NodeType)
                        //           ) {
                        //             const req: any = getRequireSource(node) || getImportSource(node) || getExportSource(node);
                        //             if (req) {
                        //               const { start, end } = req;
                        //               const newPath = processPath(values, req.value, relative(root, file.facadeModuleId));
                        //               magicString.overwrite(start, end, `'${newPath}'`);
                        //             }
                        //           }
                        //         },
                        //       });
                        //       if (sourceMaps) {
                        //         file.map = magicString.generateMap();
                        //       }
                        //       file.code = magicString.toString();
                        //     }
                        //     file.fileName = relPathObj.to || file.fileName;
                        //   }
                        // }
                        // let newKey = key;
                        // if (input.relativeTo) {
                        //   const rel = relative(root, input.relativeTo);
                        //   file.fileName = relative(rel, file.fileName);
                        //   newKey = relative(rel, key);
                        // }
                        // if (input.toRelativePath && file.facadeModuleId.endsWith('.ts')) {
                        //   newKey = absInputPathToRelOutputPathDic[file.facadeModuleId]
                        // }
                        // if (key !== newKey) {
                        //   delete bundle[key];
                        //   bundle[newKey] = file;
                        //   const fileToDelete = resolve(option.dir, key);
                        //   let fileToCreate = resolve(option.dir, newKey);
                        //   fs.renameSync(fileToDelete, fileToCreate);
                        //   break;
                        // }
                    }
                }
                // cleanEmptyFoldersRecursively(option.dir);
            },
            transformIndexHtml(html) {
                console.log('### transformIndexHtml');
                // console.dir(html);
                const entries = Object.entries(absFrom2ToData);
                for (const [key, data] of entries) {
                    if (data.htmlToken) {
                        // html = html.replace(data.htmlToken, data.relTo3)
                    }
                }
                return html;
            },
            writeBundle(option, bundle) {
                console.log('### writeBundle');
                console.dir(options);
                console.dir(bundle);
                const files = Object.entries(bundle);
                for (const [key, file] of files) {
                    for (const input of options.inputs) {
                        const sourceMaps = input.sourceMap !== false;
                        // file.facadeModuleId = relative(input.relativeTo, file.facadeModuleId);
                        // file.imports.map((imported: string) => {
                        //   if (!filter(imported)) {
                        //     return imported;
                        //   }
                        //   return relative(options.relativeTo , imported) || imported;
                        // });
                        // if (file.code) {
                        //   const magicString = new MagicString(file.code);
                        //   const ast = this.parse(file.code, {
                        //     ecmaVersion: 12,
                        //     sourceType: 'module',
                        //   });
                        //   walk(ast, {
                        //     enter(node) {
                        //       if (
                        //         [
                        //           NodeType.ImportDeclaration,
                        //           NodeType.CallExpression,
                        //           NodeType.ExportAllDeclaration,
                        //           NodeType.ExportNamedDeclaration,
                        //         ].includes(node.type as NodeType)
                        //       ) {
                        //         const req: any = getRequireSource(node) || getImportSource(node) || getExportSource(node);
                        //         if (req) {
                        //           const { start, end } = req;
                        //           const newPath = req.value;
                        //           magicString.overwrite(start, end, `'${newPath}'`);
                        //         }
                        //       }
                        //     },
                        //   });
                        //   if (sourceMaps) {
                        //     file.map = magicString.generateMap();
                        //   }
                        //   file.code = magicString.toString();
                        // }
                        // if (file.type === 'chunk') {
                        //   if (!file.facadeModuleId?.endsWith('.ts')) {
                        //     continue;
                        //   } else {
                        //     if (!input.include.includes(file.facadeModuleId)) {
                        //       continue
                        //     }
                        //   }
                        // }
                        // let newKey = key;
                        // if (input.relativeTo) {
                        //   const rel = relative(root, input.relativeTo);
                        //   const fileName = file.fileName;
                        //   file.fileName = relative(rel, file.fileName);
                        //   newKey = relative(rel, key);
                        // }
                        // if (input.toRelativePath && file.facadeModuleId.endsWith('.ts')) {
                        //   newKey = absInputPathToRelOutputPathDic[file.facadeModuleId]
                        // }
                        // if (key !== newKey) {
                        //   delete bundle[key];
                        //   bundle[newKey] = file;
                        //   const fileToDelete = resolve(option.dir, key);
                        //   let fileToCreate = resolve(option.dir, newKey);
                        //   fs.renameSync(fileToDelete, fileToCreate);
                        //   break;
                        // }
                    }
                }
                // cleanEmptyFoldersRecursively(option.dir);
            },
            // // // // resolveImportMeta(property, args: { moduleId }) {
            // // // //   console.log('### resolveImportMeta')
            // // // //   console.dir(property);
            // // // //   console.dir(args);
            // // // //   // if (property === 'url') {
            // // // //   //   return `new URL('${relative(process.cwd(), moduleId)}', document.baseURI).href`;
            // // // //   // }
            // // // //   return null;
            // // // // },
            // // // // resolveAssetUrl(arg) {
            // // // //   console.log('### resolveAssetUrl')
            // // // //   console.dir(arg);
            // // // // },
            // // // // resolveFileUrl(arg: { chunkId: string, fileName: string, format: string, moduleId: string, referenceId: string, relativePath: string }) {
            // // // //   console.log('### resolveFileUrl')
            // // // //   console.dir(arg);
            // // // //   // for (const input of options.inputs) {
            // // // //   //   if (input.relativeTo) {
            // // // //   //     const rel = relative(input.root, input.relativeTo);
            // // // //   //     // const ileName = relative(rel, fileName);
            // // // //   //     // newKey = relative(rel, key);
            // // // //   //   }
            // // // //   // }
            // // // //   // return null;
            // // // // },
            configureServer(_server) {
                console.log('### configureServer');
                console.dir(_server);
                server = _server;
                server.middlewares.use((req, res, next) => {
                    // custom handle request...
                });
                return () => {
                    server.middlewares.use((req, res, next) => {
                        // custom handle request...
                    });
                };
            },
        });
    }
};
VitePluginGlobInputService = __decorate([
    CustomInjectable()
], VitePluginGlobInputService);
export { VitePluginGlobInputService };
function cleanEmptyFoldersRecursively(folder) {
    var isDir = fs.statSync(folder).isDirectory();
    if (!isDir) {
        return;
    }
    var files = fs.readdirSync(folder);
    if (files.length > 0) {
        files.forEach(function (file) {
            var fullPath = path.join(folder, file);
            cleanEmptyFoldersRecursively(fullPath);
        });
        // re-evaluate files; after deleting subfolder
        // we may have parent folder empty now
        files = fs.readdirSync(folder);
    }
    if (files.length == 0) {
        console.log("removing: ", folder);
        fs.rmdirSync(folder);
        return;
    }
}
// Alias
// User plugins with enforce: 'pre'
// Vite core plugins
// User plugins without enforce value
// Vite build plugins
// User plugins with enforce: 'post'
// Vite post build plugins (minify, manifest, reporting)
//# sourceMappingURL=vite-plugin-glob-input.service.js.map