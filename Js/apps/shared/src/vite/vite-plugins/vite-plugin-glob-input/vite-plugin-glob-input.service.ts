

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { CustomInjectable } from '#shared/src/functions/process-providers';
// import { CustomInjectable } from '../../../functions/process-webpack-providers';
import path, { relative } from 'path';
import { configs } from '#shared/configs';
import { VitePluginBaseService } from '../vite-plugin-base/vite-plugin-base.service';
import sanitizeFilename from 'sanitize-filename';
// import { configsCollections } from '#shared/configs-collection';
import { normalizePath, Plugin, UserConfig } from 'vite';
import isString from 'lodash/isString';
import partition from 'lodash/partition';
import fastGlob from 'fast-glob';
import { createFilter } from '@rollup/pluginutils';
import { Node } from 'estree';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';

export interface VitePluginGlobInputOptions {
  inputs: {
    include: string[],
    sourceMap?: boolean,
    relativeTo: string,
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


    return ({
      name: 'vite-plugin-glob-input',
      options(conf) {
        let input = options.inputs.flatMap(input => {
          const ouputDir = normalizePath(conf.output[0].dir);
          const relativeTo = input.inPlace ? '' : normalizePath(input.relativeTo);

          return fastGlob
            .sync(input.include, input.globOptions).map(entry => {
              let relPath
              if (input.inPlace) {
                relPath = relative(ouputDir, entry as any);
              } else {
                relPath = relative(relativeTo, entry as any);
              }

              return entry;
            })
        })

        conf.input = input;
        return conf;
      },

      buildStart() {

      },
      generateBundle(options, bundle, isWrite: boolean) {
        const files = Object.entries<any>(bundle);
        for (const [key, file] of files) {
          for (const input of options.inputs) {

            const sourceMaps = input.sourceMap !== false;
            const ignore = input.globOptions?.ignore ?? [];
            const filter = createFilter(input.include, ignore);

            if (!filter(file.facadeModuleId)) {
              continue;
            }

            file.facadeModuleId = relative(options.relativeTo, file.facadeModuleId);
            file.fileName = relative(options.relativeTo, file.fileName);
            // file.imports.map((imported: string) => {
            //   if (!filter(imported)) {
            //     return imported;
            //   }

            //   return relative(options.relativeTo , imported) || imported;
            // });

            if (file.code) {
              const magicString = new MagicString(file.code);
              const ast = this.parse(file.code, {
                ecmaVersion: 12,
                sourceType: 'module',
              });

              walk(ast, {
                enter(node) {
                  if (
                    [
                      NodeType.ImportDeclaration,
                      NodeType.CallExpression,
                      NodeType.ExportAllDeclaration,
                      NodeType.ExportNamedDeclaration,
                    ].includes(node.type as NodeType)
                  ) {
                    const req: any = getRequireSource(node) || getImportSource(node) || getExportSource(node);

                    if (req) {
                      const { start, end } = req;
                      const newPath = relative(input.relativeTo, req.value);
                      magicString.overwrite(start, end, `'${newPath}'`);
                    }
                  }
                },
              });

              if (sourceMaps) {
                file.map = magicString.generateMap();
              }

              file.code = magicString.toString();
            }

            delete bundle[key];
            bundle[relative(input.relativeTo, key)] = file;
          }
        }
      },
    });
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
// input:(1) ['C:\\App\\Js\\apps\\blazor-app\\src\\templates\\index.html']
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