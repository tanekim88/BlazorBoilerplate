"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_service_1 = require("./src/webpack/webpack-dev/webpack-dev.service");
const webpack_module_1 = require("./src/webpack/webpack.module");
const webpack_base_1 = require("./webpack.base");
const webpackBase = new webpack_base_1.WebpackBase(webpack_module_1.WebpackModule, [webpack_dev_service_1.WebpackDevService]);
exports.default = webpackBase.createWebpackConfigs;
webpackBase.execute();
// import typescript from 'typescript';
// import fs from 'fs';
// import path from 'path';
// import { register } from 'tsconfig-paths';
// import { identityServerConfig } from './configs';
// import { rootConfig } from '@root/configs';
// const rootTsConfigPath = path.resolve(rootConfig.rootDir, 'tsconfig.json');
// const rootTsConfig = typescript.parseConfigFileTextToJson(rootTsConfigPath, fs.readFileSync(rootTsConfigPath, 'utf8'));
// const baseUrl = identityServerConfig.rootDir; // Either absolute or relative path. If relative it's resolved to current working directory.
// register({
//     baseUrl,
//     paths: rootTsConfig.config.compilerOptions['paths'],
// });
//# sourceMappingURL=webpack.dev.js.map