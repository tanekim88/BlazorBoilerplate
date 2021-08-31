import { WebpackDevService } from './src/webpack/webpack-dev/webpack-dev.service';
import { WebpackModule } from './src/webpack/webpack.module';
import { WebpackBase } from './webpack.base';

const webpackBase = new WebpackBase(WebpackModule, [WebpackDevService]);


export default webpackBase.createWebpackConfigs;

webpackBase.execute();

// import typescript from 'typescript';

// import fs from 'fs';
// import path from 'path';
// import { register } from 'tsconfig-paths';
// import { identityServerConfig } from './configs';
// import { rootConfig } from '#root/configs';

// const rootTsConfigPath = path.resolve(rootConfig.rootDir, 'tsconfig.json');
// const rootTsConfig = typescript.parseConfigFileTextToJson(rootTsConfigPath, fs.readFileSync(rootTsConfigPath, 'utf8'));

// const baseUrl = identityServerConfig.rootDir; // Either absolute or relative path. If relative it's resolved to current working directory.
// register({
//     baseUrl,
//     paths: rootTsConfig.config.compilerOptions['paths'],
// });
