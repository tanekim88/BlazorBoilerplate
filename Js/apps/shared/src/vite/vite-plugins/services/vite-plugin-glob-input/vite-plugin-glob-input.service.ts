
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
import { rootPaths } from '#root/paths';
import { basename, dirname } from 'path/posix';

type Action = 'ts-to-js' | 'ts-to-json' | 'copy';
export interface VitePluginGlobInputOptions {
  inputs: {
    fromPath?: string,
    toRelativePath?: string,
    include?: string[],
    sourceMap?: boolean,
    relativeTo?: string,
    root?: string,
    inPlace?: boolean,
    globOptions?: {
      ignore?: string[]
    },
    action?: Action
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
function processPath(values: Data[], text: string, relativeFromPath: string) {
  let temp = text;

  values.forEach(value => {
    temp = temp.replace(value.absFrom, value.relTo);

  });

  return temp || text;
}

interface DataDic {
  [key: string]: Data
}

interface Data {
  absFrom?: string,
  absFrom2?: string,
  relTo?: string,
  absTo?: string,
  imports?: string[],
  facadeModuleId?: string,
  action?: Action,
  code?: string
}
@CustomInjectable()
export class VitePluginGlobInputService extends VitePluginBaseService {


  createPlugin(options: VitePluginGlobInputOptions): any {

    let config;
    let server;
    const absFromToRelOutput = {} as {
      [key: string]: Data
    };

    const absFrom2ToData = {} as {
      [key: string]: Data
    };
    const absToToData = {} as {
      [key: string]: Data
    };
    return ({
      name: 'vite-plugin-glob-input',
      enforce: 'pre',


      // buildStart() {

      // },
      config(config, args) {
        console.log('### config')
        console.dir(config);
        console.dir(args);
        if (args.command === 'build') {
          // config.root = __dirname
        }

        const root = config.root;
        const outDir = config.build.outDir;
      },

      configResolved(resolvedConfig) {
        console.log('### configResolved')
        console.dir(resolvedConfig);

        // store the resolved config
        config = resolvedConfig
      },
      options(conf) {
        console.log('options')
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
            const toRelativePath = normalizePath(input.toRelativePath);

            for (let output of conf.output) {

              if (input.action === 'copy') {
                const finalPath = join(output.dir, toRelativePath);
                fs.copyFileSync(input.fromPath, finalPath);
              }
            }
          }


          const entries = fastGlob
            .sync(input.include, Object.assign({}, input.globOptions, {
              stats: false,
            }));

          entries.forEach(entry => {
            let nomralizedToRelativePath;

            if (input.relativeTo) {
              nomralizedToRelativePath = normalizePath(relative(input.relativeTo, entry));
            }

            if (input.toRelativePath) {
              nomralizedToRelativePath = normalizePath(input.toRelativePath);
            }

            if (input.action === 'copy') {
              for (let output of conf.output) {
                let finalPath;
                if (input.relativeTo) {
                  finalPath = join(output.dir, nomralizedToRelativePath);
                }
                if (input.toRelativePath) {
                  finalPath = join(output.dir, input.toRelativePath);
                }
                fs.copyFileSync(entry, finalPath);
              }
            } else {
              const fromFileBaseName = basename(entry);
              const relDirName = dirname(nomralizedToRelativePath);
              const from2 = normalizePath(resolve(relDirName, fromFileBaseName));
              const code = fs.readFileSync(entry, { encoding: 'utf8' });
              const absTo = normalizePath(resolve(outDir, nomralizedToRelativePath));
              absFromToRelOutput[entry] = {
                absFrom: entry, absFrom2: from2,
                relTo: nomralizedToRelativePath,
                absTo,
                action: input.action, code
              };
              absFrom2ToData[from2] = absFromToRelOutput[entry];
              absToToData[nomralizedToRelativePath] = absFromToRelOutput[entry];
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
      resolveId(id) {
        console.log('### resolveId')
        console.dir(id);
        const normalizedId = normalizePath(id);
        const foundObj = absFromToRelOutput[normalizedId];
        if (foundObj) {
          return foundObj.absTo;
        }
      },
      load(id) {
        console.log('### load')
        console.dir(id);
        if (absToToData[id]) {
          return absToToData[id].code;
        }
      },
      transform(src, id) {
        console.log('### transform')
        // console.dir(src);
        console.dir(id);
        // if (fileRegex.test(id)) {
        //   return {
        //     code: compileFileToJS(src),
        //     map: null // provide source map if available
        //   }
        // }
      },

      generateBundle(option, bundle, isWrite: boolean) {
        console.log('### generateBundle')
        console.dir(option);
        console.dir(bundle);
        console.dir(isWrite);
        const files = Object.entries<any>(bundle);
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
      // resolveAssetUrl(arg) {
      //   console.dir(arg);
      // },
      // resolveFileUrl(arg: { chunkId: string, fileName: string, format: string, moduleId: string, referenceId: string, relativePath: string }) {
      //   console.dir(arg);
      //   for (const input of options.inputs) {
      //     if (input.relativeTo) {
      //       const rel = relative(input.root, input.relativeTo);

      //       // const ileName = relative(rel, fileName);
      //       // newKey = relative(rel, key);
      //     }
      //   }
      //   return null;
      // },
      // renderChunk(code: string, chunk, options) {
      //   console.log('### renderChunk')
      //   // console.dir(code);
      //   console.dir(chunk);
      //   console.dir(options);
      //   if (!relOutputPathToRelOutputPathDic[chunk.fileName]) {
      //     relOutputPathToRelOutputPathDic[chunk.fileName] = {}
      //   }

      //   relOutputPathToRelOutputPathDic[chunk.fileName].from = chunk.fileName;
      //   relOutputPathToRelOutputPathDic[chunk.fileName].imports = chunk.imports;
      //   relOutputPathToRelOutputPathDic[chunk.fileName].facadeModuleId = chunk.facadeModuleId;

      //   if (chunk.isEntry) {
      //     if (chunk.facadeModuleId.endsWith('.ts')) {
      //       if (absFromToRelOutput[chunk.facadeModuleId]) {

      //       }
      //     }
      //   }
      // }
      // writeBundle(option, bundle): void {
      //   console.dir(options);
      //   console.dir(bundle);

      //   const files = Object.entries<any>(bundle);
      //   for (const [key, file] of files) {
      //     for (const input of options.inputs) {

      //       const sourceMaps = input.sourceMap !== false;

      //       // file.facadeModuleId = relative(input.relativeTo, file.facadeModuleId);

      //       // file.imports.map((imported: string) => {
      //       //   if (!filter(imported)) {
      //       //     return imported;
      //       //   }

      //       //   return relative(options.relativeTo , imported) || imported;
      //       // });

      //       // if (file.code) {
      //       //   const magicString = new MagicString(file.code);
      //       //   const ast = this.parse(file.code, {
      //       //     ecmaVersion: 12,
      //       //     sourceType: 'module',
      //       //   });

      //       //   walk(ast, {
      //       //     enter(node) {
      //       //       if (
      //       //         [
      //       //           NodeType.ImportDeclaration,
      //       //           NodeType.CallExpression,
      //       //           NodeType.ExportAllDeclaration,
      //       //           NodeType.ExportNamedDeclaration,
      //       //         ].includes(node.type as NodeType)
      //       //       ) {
      //       //         const req: any = getRequireSource(node) || getImportSource(node) || getExportSource(node);

      //       //         if (req) {
      //       //           const { start, end } = req;
      //       //           const newPath = req.value;
      //       //           magicString.overwrite(start, end, `'${newPath}'`);
      //       //         }
      //       //       }
      //       //     },
      //       //   });

      //       //   if (sourceMaps) {
      //       //     file.map = magicString.generateMap();
      //       //   }

      //       //   file.code = magicString.toString();
      //       // }
      //       if (file.type === 'chunk') {
      //         if (!file.facadeModuleId?.endsWith('.ts')) {
      //           continue;
      //         } else {
      //           if (!input.include.includes(file.facadeModuleId)) {
      //             continue
      //           }
      //         }
      //       }

      //       let newKey = key;
      //       if (input.relativeTo) {
      //         const rel = relative(root, input.relativeTo);
      //         const fileName = file.fileName;
      //         file.fileName = relative(rel, file.fileName);
      //         newKey = relative(rel, key);
      //       }

      //       if (input.toRelativePath && file.facadeModuleId.endsWith('.ts')) {
      //         newKey = absInputPathToRelOutputPathDic[file.facadeModuleId]
      //       }

      //       if (key !== newKey) {
      //         delete bundle[key];
      //         bundle[newKey] = file;
      //         const fileToDelete = resolve(option.dir, key);

      //         let fileToCreate = resolve(option.dir, newKey);

      //         fs.renameSync(fileToDelete, fileToCreate);
      //         break;
      //       }
      //     }
      //   }


      //   cleanEmptyFoldersRecursively(option.dir);
      // }
      // ,

      configureServer(_server) {
        console.log('### configureServer')
        console.dir(_server);
        server = _server
        server.middlewares.use((req, res, next) => {
          // custom handle request...
        })

        return () => {
          server.middlewares.use((req, res, next) => {
            // custom handle request...
          })
        }
      },
      transformIndexHtml(html) {
        console.log('### transformIndexHtml')
        // console.dir(html);
        return html;
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


// Alias
// User plugins with enforce: 'pre'
// Vite core plugins
// User plugins without enforce value
// Vite build plugins
// User plugins with enforce: 'post'
// Vite post build plugins (minify, manifest, reporting)