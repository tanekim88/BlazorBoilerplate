var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '@shared/src/functions/process-providers';
// import { CustomInjectable } from '../../../functions/process-webpack-providers';
import path from 'path';
import { VitePluginBaseService } from '../vite-plugin-base/vite-plugin-base.service';
import sanitizeFilename from 'sanitize-filename';
import isString from 'lodash/isString';
import partition from 'lodash/partition';
import fastGlob from 'fast-glob';
/**
 * default multi-input Options
 * */
const defaultOptions = {
    // `path.sep` is used for windows support
    relative: `src${path.sep}`,
};
// extract the output file name from a file name
const outputFileName = (filePath) => {
    const chunkId = sanitizeFilename(filePath, { replacement: '_' });
    return chunkId;
};
let VitePluginGlobInputService = class VitePluginGlobInputService extends VitePluginBaseService {
    createPlugin(options = defaultOptions) {
        const { glob: globOptions, relative = defaultOptions.relative, transformOutputPath, } = options;
        return ({
            name: 'vite-plugin-glob-input',
            options(conf) {
                // flat to enable input to be a string or an array
                // separate globs inputs string from others to enable input to be a mixed array too
                const [globs, others] = partition([conf.input].flat(), isString);
                const normalizedGlobs = globs.map((glob) => glob.replace(/\\/g, '/'));
                // get files from the globs strings and return as a Rollup entries Object
                const input = Object
                    .assign({}, Object.fromEntries(fastGlob
                    .sync(normalizedGlobs, globOptions)
                    .map((entry) => {
                    const filePath = path.relative(relative, entry.name);
                    const isRelative = !filePath.startsWith(`..${path.sep}`);
                    const relativeFilePath = (isRelative
                        ? filePath
                        : path.relative(`.${path.sep}`, entry.name));
                    if (transformOutputPath) {
                        return [outputFileName(transformOutputPath(relativeFilePath, entry.name)), entry.name];
                    }
                    return [outputFileName(relativeFilePath), entry.name];
                })), 
                // add no globs input to the result
                ...others);
                // return the new configuration with the glob input and the non string inputs
                return {
                    ...conf,
                    input,
                };
            },
        });
    }
};
VitePluginGlobInputService = __decorate([
    CustomInjectable()
], VitePluginGlobInputService);
export { VitePluginGlobInputService };
//# sourceMappingURL=vite-plugin-glob-input.service.js.map