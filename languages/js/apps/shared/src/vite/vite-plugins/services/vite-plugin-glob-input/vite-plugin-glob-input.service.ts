
import { CustomInject, CustomInjectable } from '#shared/src/functions/process-providers';
// import { CustomInjectable } from '../../../functions/process-webpack-providers';
import path from 'path';

import { VitePluginBaseService } from '../../vite-plugin-base/vite-plugin-base.service';

// import { configsCollections } from '#shared/configs-collection';
import { normalizePath, Plugin } from 'vite';

import fastGlob from 'fast-glob';
import fs from 'fs'
import fsExtra from 'fs-extra';
import { dirname } from 'path/posix';

import sass from 'sass';

import chokidar from 'chokidar';
import _ from 'lodash';
import { renameExtension } from '#shared/src/functions/rename-extension';
import { RegexService } from '#root/apps/shared/src/modules/utilities/modules/regex/regex/regex.service';

let sassWatcher: chokidar.FSWatcher;
let copyWatcher: chokidar.FSWatcher;

// import fibers from 'fibers';

type Action = 'ts-to-json' | 'copy' | 'scss-to-css';
export interface External {
  insertAt: string,
  htmls?: string[],
  enforce?: 'pre' | 'post'
}
export interface Input {
  fromPath?: string,
  toRelativePath?: string,
  toName?: string,
  include?: string[],
  sourceMap?: boolean,
  relativeTo?: string,
  inPlace?: boolean,
  globOptions?: {
    ignore?: string[]
  },
  action?: Action,
  applyChunk?: boolean,
  htmlToken?: string,
  outDir?: string,
  watch?: boolean,
  baseName?: string,
  externals?: External[],
}


export interface VitePluginGlobInputOptions {
  inputs: Input[],
  sass?: Input[],
  copy?: Input[],
  rm?: Input[],
  empty?: Input[],
  webDir?: string,
}
export interface Data {
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
  htmlToken?: string,
  baseName?: string,
  externals?: External[],
}

const parentPathToken = '__dotdot__';

@CustomInjectable()
export class VitePluginGlobInputService extends VitePluginBaseService {
  @CustomInject(RegexService)
  protected regexService: RegexService;

  dataDict: { [key: string]: { [key: string]: Data } } = {
    absFromToData: {},

    absFrom2ToData: {},

    absToToData: {},

    relTo2ToData: {},

    relTo3ToData: {},
  };


  createPrePlugin(options: VitePluginGlobInputOptions) {
    const regexService = this.regexService;

    let config;
    let server;
    const dataDict = this.dataDict;

    function processInputs(inputs: Input[], root: string, actionsToTake: (input: Input, absFrom: string, relTo: string) => any): [string[], string[]] {
      inputs = inputs ?? [];
      const allEntries = [];
      const toWatch = [];
      const toReturn = inputs.forEach(input => {
        if (input.include) {

          input.include = input.include.map(p => normalizePath(p));

          input.relativeTo = input.relativeTo && normalizePath(input.relativeTo);
        }

        if (input.fromPath) {
          const fromPath = normalizePath(input.fromPath);
          input.include = [fromPath];
        }

        const [dirs, files] = _.partition(input.include, e => fs.lstatSync(e).isDirectory());

        const entries = fastGlob
          .sync(files, Object.assign({}, input.globOptions, {
            stats: false,
          })).concat(dirs);;

        entries.forEach(absFrom => {
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

          if (fs.existsSync(absFrom)) {
            actionsToTake(input, absFrom, relTo);
          }
        })

        allEntries.push(...entries);
        if (input.watch) {
          toWatch.push(...entries);
        }
      });

      return [allEntries, toWatch];
    };

    let command;
    return ({
      name: 'vite-plugin-glob-input-pre',
      enforce: 'pre' as 'pre' | 'post',

      config(config, args) {
        console.log('### config')
        command = args.command;
        console.dir(config);
        console.dir(args);
        // console.dir(this.getWatchFiles())
        console.dir(this);


        if (command === 'serve') {
          config.optimizeDeps.include = [];
        }

        config.build.watch.ignored = ['**/node_modules/**', '**/.git/**']

        const root = config.root;
        const outDir = config.build.outDir;

        if (options.webDir && path.isAbsolute(options.webDir)) {
          options.webDir = path.relative(root, options.webDir);
        }


        if (options.rm) {
          processInputs(options.rm, root, (input, absFrom, relTo) => {
            const isDir = fs.lstatSync(absFrom).isDirectory();
            if (isDir) {
              fs.rmSync(absFrom, { recursive: true });
            } else {
              fs.unlinkSync(absFrom);
            }
          });
        }

        if (options.empty) {
          processInputs(options.empty, root, (input, absFrom, relTo) => {
            const isDir = fs.lstatSync(absFrom).isDirectory();
            if (isDir) {
              fsExtra.emptyDirSync(absFrom);
            }
          });
        }
      },


      configResolved(resolvedConfig) {
        console.log('### configResolved')
        console.dir(resolvedConfig);
        // console.dir(this.getWatchFiles())
        console.dir(this);
        // store the resolved config
        config = resolvedConfig;

        const root = config.root;
        const outDir = config.build.outDir;
      },
      async options(conf) {
        console.log('### options')
        console.dir(conf);
        // console.dir(this.getWatchFiles())
        console.dir(this);

        const root = config.root;
        const outDir = config.build.outDir;

        if (!copyWatcher) {

          const fromToForCopy = {};
          const [filesToCopy, filesToWatch] = processInputs(options.copy, root, (input, absFrom, relTo) => {
            let localOutput = conf.output;
            if (input.outDir) {
              localOutput = [{ dir: input.outDir }];
            }

            for (let output of localOutput) {
              let finalPath;

              if (input.relativeTo || input.toName) {
                finalPath = path.join(output.dir, relTo);
              }

              if (input.toRelativePath) {
                finalPath = path.join(output.dir, input.toRelativePath);
              }
              fromToForCopy[absFrom] = finalPath;
              // fs.copyFileSync(absFrom, finalPath);
              fsExtra.copySync(absFrom, finalPath, { overwrite: true });
            }
          });

          copyWatcher = chokidar.watch(filesToWatch, {});
          copyWatcher
            .on('change', fromPath => {
              fromPath = normalizePath(fromPath);
              console.log(`${fromPath} changed`)
              const toPath = fromToForCopy[fromPath];
              if (toPath) {
                fs.copyFileSync(fromPath, toPath)
              }
            })
        }

        if (!sassWatcher) {
          const fromToForSass = {};
          const dirsForSass = {};
          const [filesToSass, sassFilesToWatch] = processInputs(options.sass, root, (input, absFrom, relTo) => {
            const isDir = fs.lstatSync(absFrom).isDirectory();

            let localOutput = conf.output;

            if (input.outDir) {
              localOutput = [{ dir: input.outDir }];
            }

            if (!Array.isArray(localOutput)) {
              localOutput = [];
            }

            for (let output of localOutput) {
              let finalPath;

              if (input.relativeTo || input.toName) {
                finalPath = path.join(output.dir, relTo);
              }

              if (input.toRelativePath) {
                finalPath = path.join(output.dir, input.toRelativePath);
              }

              if (isDir) {
                dirsForSass[absFrom] = finalPath;
              } else {
                fromToForSass[absFrom] = finalPath;
              }
            }
          });

          sassWatcher = chokidar.watch(sassFilesToWatch, {});
          sassWatcher
            .on('change', fromPath => {
              fromPath = normalizePath(fromPath);
              console.log(`${fromPath} changed`)
              const extName = path.extname(fromPath);

              if (extName === '.scss' || extName === '.sass') {
                let toPath = fromToForSass[fromPath];
                if (!toPath) {
                  toPath = renameExtension(fromPath, '.css');
                }

                const result = sass.compile(fromPath, {
                  sourceMap: false,
                });

                fs.writeFileSync(toPath, result.css)
              }
            });
        }


        const [input, filesToWatch] = processInputs(options.inputs, root, (input, absFrom, relTo) => {
          let localOutput = conf.output;
          if (input.outDir) {
            localOutput = [{ dir: input.outDir }];
          }

          if (!Array.isArray(localOutput)) {
            localOutput = [{}];
          }

          for (let output of localOutput) {
            if (relTo.endsWith('.cshtml')) {
              relTo = normalizePath(renameExtension(relTo, '.cshtml.html'));
            }

            if (relTo.startsWith('..')) {
              relTo = relTo.replace(/\.\./g, parentPathToken);
            }

            const relTo2 = relTo;

            if (path.extname(absFrom) === '.ts' && path.extname(relTo) === '.js') {
              relTo = relTo.replace(/\.js$/, '.ts');
              relTo = relTo.replace(/\.?\[hash\]/g, '')
            }

            const absFrom2 = normalizePath(path.resolve(root, relTo));

            const absTo = normalizePath(path.resolve(root, relTo));

            const absTo2 = normalizePath(path.resolve(root, relTo2));

            const from2ToFrom = path.relative(dirname(absFrom2), dirname(absFrom));

            let code = fs.readFileSync(absFrom, { encoding: 'utf8' });



            const externals = input.externals ?? [];

            externals.filter(external => external.enforce === 'pre' || !external.enforce).forEach(external => {
              const reg = new RegExp(`${regexService.escapeRegExp(external.insertAt)}`, 'g');
              external.htmls?.forEach(html => {
                code = code.replace(
                  reg,
                  `${html}\n$&`
                )
              });
            });


            if (absFrom.endsWith('.html') || absFrom.endsWith('.cshtml')) {
              const reg = new RegExp(regexService.escapeRegExp(root), 'g');
              code = code.replace(reg, '');
              fs.writeFileSync(absFrom + '.dev.html', code);
            }

            dataDict.absFromToData[absFrom] = {
              absFrom,
              absFrom2,
              relTo,
              relTo2,
              absTo,
              absTo2,
              code,
              action: input.action,
              from2ToFrom,
              htmlToken: input.htmlToken,
              baseName: input.baseName,
              externals: input.externals,
            };
            dataDict.absFrom2ToData[absFrom2] = dataDict.absFromToData[absFrom];
            dataDict.absToToData[absTo] = dataDict.absFromToData[absFrom];
            dataDict.relTo2ToData[relTo2] = dataDict.absFromToData[absFrom];
          }
        });


        conf.input = input;

        return conf;
      },
      buildStart(args) {
        console.log('### buildStart')
        console.dir(args);
        console.dir(this.getWatchFiles())
        console.dir(this);
        // options.filesToWatch.forEach(filePath => {
        //   this.addWatchFile(filePath);
        // });

        // options.foldersToWatch.forEach(folderPath => {
        //   this.addWatchFile(folderPath);
        // })


        console.dir(this.getWatchFiles())
      },
      async resolveId(source: string, importer: string | undefined, options: { custom?: { [plugin: string]: any } }) {
        console.log('### resolveId')
        console.dir(source);
        console.dir(importer);
        console.dir(options);
        console.dir(dataDict.absFromToData);
        console.dir(this.getWatchFiles())
        console.dir(this);

        const foundObj = dataDict.absFromToData[source];
        if (foundObj?.absTo) {
          return foundObj.absTo;
        }

        let resolution = await this.resolve(source, importer, { skipSelf: true });

        if (resolution) {
          return resolution?.id;
        }

        let resolution2 = await this.resolve(source, dataDict.absFrom2ToData[importer]?.absFrom, { skipSelf: true });

        if (resolution2) {
          return resolution2?.id;
        }
      },
      load(id) {
        console.log('### load')
        console.dir(id);
        console.dir(this.getWatchFiles())
        console.dir(this);
        return dataDict.absToToData[id]?.code;
      },
      transform(src, id) {
        console.log('### transform')
        // console.dir(src);
        console.dir(id);
        console.dir(this.getWatchFiles())
        console.dir(this);
        // if (fileRegex.test(id)) {
        //   return {
        //     code: compileFileToJS(src),
        //     map: null // provide source map if available
        //   }
        // }


        return src;
      },
      outputOptions(outputOptions) {
        console.log('### outputOptions')
        console.dir(outputOptions);
        // console.dir(this.getWatchFiles())
        console.dir(this);
        return outputOptions;
      },
      augmentChunkHash(chunkInfo) {
        console.log('### augmentChunkHash')
        console.dir(chunkInfo);
        console.dir(this.getWatchFiles())
        console.dir(this);
        // if (chunkInfo.name === 'foo') {
        //   return Date.now().toString();
        // }
      },
      renderChunk(code: string, chunk, options): any {
        console.log('### renderChunk')
        // console.dir(code);
        console.dir(chunk);
        console.dir(options);
        console.dir(this.getWatchFiles())
        console.dir(this);
        if (chunk.isEntry) {

          if (chunk.facadeModuleId) {
            if (chunk.facadeModuleId.endsWith('.ts') || chunk.facadeModuleId.endsWith('.js')) {
              dataDict.absFrom2ToData[chunk.facadeModuleId].relTo3 = chunk.fileName;
            }

            dataDict.relTo3ToData[chunk.fileName] = dataDict.absFrom2ToData[chunk.facadeModuleId];
          }
        }

        // return undefined;
      },
      generateBundle(option, bundle, isWrite: boolean) {
        console.log('### generateBundle')
        console.dir(option);
        console.dir(bundle);
        console.dir(isWrite);
        console.dir(this.getWatchFiles())
        console.dir(this);
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

        return html;
      },
      writeBundle(option, bundle): void {
        console.log('### writeBundle')
        console.dir(option);
        console.dir(bundle);
        console.dir(this.getWatchFiles())
        console.dir(this);
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
        // console.dir(this.getWatchFiles())
        console.dir(this);
        server = _server
        server.middlewares.use((req, res, next) => {
          // custom handle request...
          next();
        })

        return () => {
          server.middlewares.use(async (req, res, next) => {
            // if (!req.originalUrl.endsWith(".html") && req.originalUrl !== "/") {
            //   req.url = `/templates/` + req.originalUrl + ".html";
            // } else if (req.url === "/index.html") {
            //   req.url = `/templates/` + req.url;
            // }

            if (req.url.endsWith('.html') || req.url.endsWith('.cshtml')) {
              req.url = `/${normalizePath(options.webDir)}${req.url}`;
            }

            next();
          })
        }
      },

    });
  }
  createPostPlugin(options: VitePluginGlobInputOptions): Plugin {

    const convertTempPathToInvalidPath = (invalidPath: string) => {
      return invalidPath.replace(new RegExp(this.regexService.escapeRegExp(parentPathToken), 'g'), '..');
    }

    const dataDict = this.dataDict;

    const regexService = this.regexService;
    let config;


    return {
      name: 'vite-plugin-glob-input-post',
      enforce: 'post',

      config(conf, args) {
        console.log('### config')
        console.dir(conf);
        console.dir(args);
        // console.dir(this.getWatchFiles())
        console.dir(this);
        config = conf;
      },

      generateBundle: function (option, bundle, isWrite: boolean) {
        console.log('### generateBundle POST')
        console.dir(option);
        console.dir(bundle);
        console.dir(isWrite);
        console.dir(this);
        const files = Object.entries<any>(bundle);
        const keys = Object.keys(bundle);
        for (const [key, file] of files) {
          let shouldDeleteKey = false;

          const data = dataDict.relTo2ToData[key];

          if (file.fileName?.endsWith('.html') && file.type === 'asset') {

            let source = file.source;

            if (data?.baseName) {
              keys.forEach(k => {
                source = source.replace(new RegExp(regexService.escapeRegExp(`/${k}`), 'g'), `${data.baseName}${k}`);
              });
            }

            data.externals.filter(external => external.enforce === 'post').forEach(external => {
              const reg = new RegExp(`${regexService.escapeRegExp(external.insertAt)}`, 'g');
              external.htmls?.forEach(html => {
                source = source.replace(
                  reg,
                  `${html}\n$&`
                )
              });
            });

            data.externals?.forEach(external => {
              const reg = new RegExp(`${regexService.escapeRegExp(external.insertAt)}`, 'g');
              source = source.replace(
                reg,
                ``
              )
            });
            
            file.source = source;
          }

          if (file.fileName?.endsWith('.cshtml.html') && file.type === 'asset') {
            const newFileName = file.fileName.replace(/\.cshtml\.html$/, '.cshtml');

            file.fileName = newFileName;

            if (!file.fileName.includes(parentPathToken)) {
              this.emitFile({
                type: 'asset',
                fileName: newFileName,
                source: file.source
              })
            }

            shouldDeleteKey = true;
          }

          if (file.fileName.includes(parentPathToken)) {
            const newPath = convertTempPathToInvalidPath(file.fileName);

            const finalPath = path.resolve(config.build.outDir, newPath);
            const data = file.type === 'asset' ? file.source : file.code;
            fs.writeFileSync(finalPath, data, { encoding: 'utf8' });

            shouldDeleteKey = true;
          }

          if (shouldDeleteKey) {
            delete bundle[key];
          }
        }
      },
      transformIndexHtml: function (html) {
        // console.dir(this.getWatchFiles())
        console.dir(this);
        // console.dir(html);

      }
    }
  }


  createManyPlugins(...options: VitePluginGlobInputOptions[]): Plugin[] {
    return super.createManyPlugins(...options);
  }
}

