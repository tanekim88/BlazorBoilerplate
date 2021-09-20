
import { CustomInjectable } from '#shared/src/functions/process-providers';
// import { CustomInjectable } from '../../../functions/process-webpack-providers';
import { relative, resolve, join } from 'path';

import { VitePluginBaseService } from '../../vite-plugin-base/vite-plugin-base.service';

// import { configsCollections } from '#shared/configs-collection';
import { normalizePath, Plugin, UserConfig } from 'vite';

import fastGlob from 'fast-glob';
import { createFilter } from '@rollup/pluginutils';
import { Node } from 'estree';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';
import sanitizeFilename from 'sanitize-filename';
import fs from 'fs'
import { rootPaths, RootPaths } from '#root/paths';
import { dirname } from 'path/posix';
export interface VitePluginGlobInputOptions {
  inputs: {
    copyOnly?: boolean,
    fromPath?: string,
    toRelativePath?: string,
    include?: string[],
    sourceMap?: boolean,
    relativeTo?: string,
    root?: string,
    inPlace?: boolean,
    globOptions?: {
      ignore?: string[]
    }
  }[]
}
enum NodeType {
  Literal = 'Literal',
  CallExpression = 'CallExpression',
  Identifier = 'Identifier',
  ImportDeclaration = 'ImportDeclaration',
  ExportNamedDeclaration = 'ExportNamedDeclaration',
  ExportAllDeclaration = 'ExportAllDeclaration',
}

export function isEmpty(array: any[] | undefined) {
  return !array || array.length === 0;
}
export function getRequireSource(node: any): Node | false {
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

export function getImportSource(node: any): Node | false {
  if (node.type !== NodeType.ImportDeclaration || node.source.type !== NodeType.Literal) {
    return false;
  }

  return node.source;
}

export function getExportSource(node: any): Node | false {
  const exportNodes = [NodeType.ExportAllDeclaration, NodeType.ExportNamedDeclaration];

  if (!exportNodes.includes(node.type) || !node.source || node.source.type !== NodeType.Literal) {
    return false;
  }

  return node.source;
}

@CustomInjectable()
export class VitePluginGlobInputService extends VitePluginBaseService {
  createPlugin(options: VitePluginGlobInputOptions) {
    const pathToRelativePathDic = {} as any;
    let root = normalizePath(RootPaths.toAbsolutePath());
    return ({
      name: 'vite-plugin-glob-input',
      options(conf) {

        let input = options.inputs.flatMap(input => {
          if (input.include) {

            input.include = input.include.map(p => normalizePath(p));

            input.relativeTo = input.relativeTo && normalizePath(input.relativeTo);
            if (input.copyOnly) {
              for (let inc of input.include) {
                for (let output of conf.output) {
                  const relativePath = relative(input.relativeTo, inc);
                  const finalPath = join(output.dir, relativePath);
                  fs.copyFileSync(inc, finalPath);
                }
              }
            }
          }

          if (input.fromPath) {
            const fromPath = normalizePath(input.fromPath);
            input.include = [fromPath];
            const toRelativePath = normalizePath(input.toRelativePath);
            pathToRelativePathDic[fromPath] = toRelativePath;

            if (input.copyOnly) {
              for (let inc of input.include) {
                for (let output of conf.output) {
                  const finalPath = join(output.dir, toRelativePath);
                  fs.copyFileSync(inc, finalPath);
                }
              }
            }
          }

          const toReturn = fastGlob
            .sync(input.include, Object.assign({}, input.globOptions, {
              stats: false,

            })).map(entry => {
              return (entry);
            })

          if (input.copyOnly) {
            return null;
          }

          return toReturn;
        }).filter(x => x);

        conf.input = input;

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
      resolveFileUrl(arg: { chunkId: string, fileName: string, format: string, moduleId: string, referenceId: string, relativePath: string }) {
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
      writeBundle(option, bundle): void {
        console.dir(options);
        console.dir(bundle);

        const files = Object.entries<any>(bundle);
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
            if (file.type === 'chunk') {
              if (!file.facadeModuleId?.endsWith('.ts')) {
                continue;
              } else {
                if (!input.include.includes(file.facadeModuleId)) {
                  continue
                }
              }
            }

            let newKey = key;
            if (input.relativeTo) {
              const rel = relative(root, input.relativeTo);
              const fileName = file.fileName;
              file.fileName = relative(rel, file.fileName);
              newKey = relative(rel, key);
            }

            if (input.toRelativePath && file.facadeModuleId.endsWith('.ts')) {
              newKey = pathToRelativePathDic[file.facadeModuleId]
            }

            if (key !== newKey) {
              delete bundle[key];
              bundle[newKey] = file;
              const fileToDelete = resolve(option.dir, key);

              let fileToCreate = resolve(option.dir, newKey);

              fs.renameSync(fileToDelete, fileToCreate);
              break;
            }
          }
        }


        cleanEmptyFoldersRecursively(option.dir);
      }
    });
  }
}
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