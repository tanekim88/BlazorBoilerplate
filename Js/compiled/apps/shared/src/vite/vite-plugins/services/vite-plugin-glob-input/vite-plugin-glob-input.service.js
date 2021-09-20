var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '#shared/src/functions/process-providers';
// import { CustomInjectable } from '../../../functions/process-webpack-providers';
import { relative, resolve, join } from 'path';
import { VitePluginBaseService } from '../../vite-plugin-base/vite-plugin-base.service';
// import { configsCollections } from '#shared/configs-collection';
import { normalizePath } from 'vite';
import fastGlob from 'fast-glob';
import fs from 'fs';
import { RootPaths } from '#root/paths';
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
let VitePluginGlobInputService = class VitePluginGlobInputService extends VitePluginBaseService {
    createPlugin(options) {
        return ({
            name: 'vite-plugin-glob-input',
            options(conf) {
                let input = options.inputs.flatMap(input => {
                    input.include = input.include.map(p => {
                        let path = p.path ?? p;
                        return normalizePath(p);
                    });
                    input.relativeTo = input.relativeTo && normalizePath(input.relativeTo);
                    input.root = input.root ? normalizePath(input.root) : normalizePath(RootPaths.toAbsolutePath());
                    const toReturn = fastGlob
                        .sync(input.include, Object.assign({}, input.globOptions, {
                        stats: false,
                    })).map(entry => {
                        return (entry);
                    });
                    return toReturn;
                });
                conf.input = input;
                options['cache'] = input;
                return conf;
            },
            // buildStart() {
            // },
            // generateBundle(option, bundle, isWrite: boolean) {
            //   console.dir(bundle);
            // },
            // resolveImportMeta(property, { moduleId }) {
            //   if (property === 'url') {
            //     return `new URL('${relative(process.cwd(), moduleId)}', document.baseURI).href`;
            //   }
            //   return null;
            // },
            // outputOptions(outputOptions) {
            //   console.dir(outputOptions);
            //   return outputOptions;
            // },
            // augmentChunkHash(chunkInfo) {
            //   if (chunkInfo.name === 'foo') {
            //     return Date.now().toString();
            //   }
            // },
            resolveFileUrl(arg) {
                console.dir(arg);
                for (const input of options.inputs) {
                    if (input.relativeTo) {
                        const rel = relative(input.root, input.relativeTo);
                        // const ileName = relative(rel, fileName);
                        // newKey = relative(rel, key);
                    }
                }
                return null;
            },
            writeBundle(option, bundle) {
                console.dir(options);
                console.dir(bundle);
                const files = Object.entries(bundle);
                for (const [key, file] of files) {
                    for (const input of options.inputs) {
                        const sourceMaps = input.sourceMap !== false;
                        if (file.type === 'chunk') {
                            continue;
                        }
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
                        let newKey = key;
                        if (input.relativeTo) {
                            const rel = relative(input.root, input.relativeTo);
                            file.fileName = relative(rel, file.fileName);
                            newKey = relative(rel, key);
                        }
                        if (key !== newKey) {
                            delete bundle[key];
                            bundle[newKey] = file;
                            fs.unlinkSync(resolve(option.dir, key));
                            fs.writeFileSync(resolve(option.dir, newKey), file.source);
                        }
                    }
                }
                cleanEmptyFoldersRecursively(option.dir);
            }
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
            var fullPath = join(folder, file);
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
// acorn:undefined
// acornInjectPlugins:undefined
// cache:{modules: Array(0)}
// modules:(0) []
// __proto__:Object
// context:undefined
// experimentalCacheExpiry:undefined
// external:(0) []
// inlineDynamicImports:undefined
// input:(1) ['C:\\App\\Js\\apps\\solid-app\\src\\templates\\index.html']
// makeAbsoluteExternalsRelative:undefined
// manualChunks:undefined
// maxParallelFileReads:undefined
// moduleContext:undefined
// onwarn:warning => config.onwarn(warning, defaultOnWarnHandler)
// perf:undefined
// plugins:
// strictDeprecations:undefined
// shimMissingExports:undefined
// preserveSymlinks:undefined
// preserveModules:undefined
// watch:{chokidar: {…}}
// chokidar:{ignored: Array(2), ignoreInitial: true, ignorePermissionErrors: true}
// ignored:(2) ['**/node_modules/**', '**/.git/**']
// ignoreInitial:true
// ignorePermissionErrors:true
// __proto__:Object
// __proto__:Object
// __proto__:Object
// generateBundle
// renderChunk
// buildEnd:
// renderStart
// transform
// writeBundle
// resolveFileUrl
//# sourceMappingURL=vite-plugin-glob-input.service.js.map