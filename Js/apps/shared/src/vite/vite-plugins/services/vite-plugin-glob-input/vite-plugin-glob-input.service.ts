
import { CustomInjectable } from '#shared/src/functions/process-providers';
// import { CustomInjectable } from '../../../functions/process-webpack-providers';
import path from 'path';

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

import sass from 'sass';
import fibers from 'fibers';

type Action = 'to-json' | 'copy';
export interface VitePluginGlobInputOptions {
  inputs: {
    fromPath?: string,
    toRelativePath?: string,
    toName?: string,
    include?: string[],
    sourceMap?: boolean,
    relativeTo?: string,
    root?: string,
    inPlace?: boolean,
    globOptions?: {
      ignore?: string[]
    },
    action?: Action,
    applyChunk?: boolean,
    htmlToken?: string
  }[],
  externals?: { html: string, insertAt: any, pos?: 'before' | 'after' }[],
}
interface Data {
  absFrom?: string,
  absFrom2?: string,
  from2ToFrom?: string,
  relTo?: string,
  relTo2?: string,
  relTo3?: string,
  absTo?: string,
  absTo2?: string,
  imports?: string[],
  facadeModuleId?: string,
  action?: Action,
  code?: string,
  htmlToken?: string
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


interface DataDic {
  [key: string]: Data
}


@CustomInjectable()
export class VitePluginGlobInputService extends VitePluginBaseService {


  createPlugin(options: VitePluginGlobInputOptions): any {
    options.externals = options.externals ?? [];

    let config;
    let server;
    const absFromToData = {} as {
      [key: string]: Data
    };

    const absFrom2ToData = {} as {
      [key: string]: Data
    };
    const absToToData = {} as {
      [key: string]: Data
    };
    const relTo3ToData = {} as {
      [key: string]: Data
    };
    return ({
      name: 'vite-plugin-glob-input',
      enforce: 'pre',


      buildStart(args) {
        console.log('### args')
        console.dir(args);
      },
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
      async options(conf) {
        console.log('### options')
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

          const mapped = entries.map(absFrom => {
            let relTo2;
            let relTo;

            if (input.relativeTo) {
              relTo = normalizePath(path.relative(input.relativeTo, absFrom));
            }

            if (input.toRelativePath) {
              relTo = normalizePath(input.toRelativePath);
            }

            if (input.toName) {
              const dir = dirname(normalizePath(path.relative(root, absFrom)));
              relTo = normalizePath(path.join(dir, input.toName));
            }

            relTo2 = relTo;

            if (path.extname(absFrom) === '.ts' && path.extname(relTo) === '.js') {
              relTo = relTo.replace(/\.js$/, '.ts');
              relTo = relTo.replace(/\.?\[hash\]/g, '')
            }

            const absFrom2 = normalizePath(path.resolve(root, relTo));

            const absTo = normalizePath(path.resolve(root, relTo));
            const absTo2 = normalizePath(path.resolve(root, relTo2));
            const from2ToFrom = path.relative(dirname(absFrom2), dirname(absFrom));

            let code = fs.readFileSync(absFrom, { encoding: 'utf8' });
            absFromToData[absFrom] = {
              absFrom,
              absFrom2,
              relTo,
              relTo2,
              absTo,
              absTo2,
              code,
              action: input.action,
              from2ToFrom,
              htmlToken: input.htmlToken
            };
            absFrom2ToData[absFrom2] = absFromToData[absFrom];
            absToToData[absTo] = absFromToData[absFrom];



            if (input.action === 'copy' || path.extname(absFrom) === '.scss') {
              if (path.extname(absFrom) === '.scss') {
                code = sass.renderSync({
                  file: absFrom,
                  importer: function (url, prev, done) {

                  },
                  fiber: fibers
                });
              }


              for (let output of conf.output) {
                let finalPath;

                if (input.relativeTo || input.toName) {
                  finalPath = path.join(output.dir, relTo);
                }

                if (input.toRelativePath) {
                  finalPath = path.join(output.dir, input.toRelativePath);
                }

                fs.writeFileSync(finalPath, code);
              }

              return null;
            }


            return absFromToData[absFrom];
          });




          return entries;
        }).filter(x => x);

        conf.input = input;

        return conf;
      },
      async resolveId(source: string, importer: string | undefined, options: { custom?: { [plugin: string]: any } }) {
        console.log('### resolveId')
        console.dir(source);
        console.dir(importer);
        console.dir(options);
        console.dir(absFromToData);

        // if (importer) {
        //   const foundObj = absFromToData[importer];
        //   if (foundObj) {
        //     if (!path.isAbsolute(source)) {
        //       const importerDir = dirname(importer);

        //       let relFrom = normalizePath(path.join(foundObj.from2ToFrom, source))

        //       if (source.startsWith('./') && !relFrom.startsWith('.')) {
        //         relFrom = './' + relFrom;
        //       }
        //       let absFrom = normalizePath(path.join(config.root, relFrom));

        //       let exist = !!path.extname(absFrom) && fs.existsSync(absFrom);
        //       if (!exist) {
        //         for (let ext of config.resolve.extensions) {
        //           if (fs.existsSync(absFrom + ext)) {
        //             absFrom = absFrom + ext;
        //             exist = true;
        //             break;
        //           }
        //         }
        //       }

        //       if (exist) {
        //         return absFrom;
        //       }
        //     }
        //   }
        // }

        const foundObj = absFromToData[source];
        if (foundObj?.absTo) {
          return foundObj.absTo;
        }

        let resolution = await this.resolve(source, importer, { skipSelf: true });

        if (resolution) {
          return resolution?.id;
        }

        let resolution2 = await this.resolve(source, absFrom2ToData[importer]?.absFrom, { skipSelf: true });

        if (resolution2) {
          return resolution2?.id;
        }
      },
      load(id) {
        console.log('### load')
        console.dir(id);

        return absToToData[id]?.code;
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
      outputOptions(outputOptions) {
        console.log('### outputOptions')
        console.dir(outputOptions);
        return outputOptions;
      },
      augmentChunkHash(chunkInfo) {
        console.log('### augmentChunkHash')
        console.dir(chunkInfo);
        // if (chunkInfo.name === 'foo') {
        //   return Date.now().toString();
        // }
      },
      renderChunk(code: string, chunk, options) {
        console.log('### renderChunk')
        // console.dir(code);
        console.dir(chunk);
        console.dir(options);
        if (chunk.isEntry) {

          if (chunk.facadeModuleId) {
            if (chunk.facadeModuleId.endsWith('.ts') || chunk.facadeModuleId.endsWith('.js')) {
              absFrom2ToData[chunk.facadeModuleId].relTo3 = chunk.fileName;
            }

            relTo3ToData[chunk.fileName] = absFrom2ToData[chunk.facadeModuleId];
          }
        }
      },
      generateBundle(option, bundle, isWrite: boolean) {
        console.log('### generateBundle')
        console.dir(option);
        console.dir(bundle);
        console.dir(isWrite);
        const files = Object.entries<any>(bundle);
        for (const [key, file] of files) {
          if (file.fileName?.endsWith('.js')) {
            if (file.facadeModuleId?.endsWith('.scss')) {
              delete bundle[key]
            }
          }
        }
      },

      transformIndexHtml(html) {
        console.log('### transformIndexHtml')
        // console.dir(html);

        const externals = options.externals ?? [];
        externals.forEach(external => {
          let pos = external.pos;
          if (!pos) {
            pos = external.insertAt.includes('</') ? 'before' : 'after'
          }
          const replaceWith = pos == 'after' ? `$&\n${external.html}` : `${external.html}\n$&`
          html = html.replace(
            external.insertAt,
            replaceWith
          )
        });

        const entries = Object.entries(absFrom2ToData);
        for (const [key, data] of entries) {
          if (data.htmlToken) {
            html = html.replace(data.htmlToken, data.relTo3)
          }
        }


        return html;
      },
      writeBundle(option, bundle): void {
        console.log('### writeBundle')
        console.dir(option);
        console.dir(bundle);
      }
      ,
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

    });
  }
}

