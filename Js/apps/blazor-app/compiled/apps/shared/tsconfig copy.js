// import path from 'path';
// import { Tsconfig } from 'tsconfig-paths/lib/tsconfig-loader';
// import deepmerge from 'deepmerge';
// // import { projectConfig } from './config';
// import configsJson from '../configs.json';
// export const createTsConfig = (currentDirPath, tsConfig = {} as Tsconfig) => {
//     const environments = Object.keys(configsJson.environments);
//     const paths = environments.reduce((acc, project) => {
//         const currRootDir = configsJson.environments[project].AbsolutePaths.RootDir;
//         const relRootPath = path.relative(currentDirPath, currRootDir);
//         acc[`@${project}/*`] = [path.join(relRootPath, '/*')];
//         return acc;
//     }, {} as any);
//     const relativeRootDir = path.relative(currentDirPath, configsJson.environments.Root.absolutePaths.rootDir);
//     const include = environments
//         .flatMap((project) => {
//             const files = ['.prettierrc.ts', '.eslintrc.ts', '.stylelintrc.ts'];
//             return files.map((fileName) => {
//                 const relRootPath = path.relative(currentDirPath, environments[project].AbsolutePaths.RootDir);
//                 return path.join(relRootPath, fileName);
//             });
//         })
//         .concat([path.join(relativeRootDir, '**/*')]);
//     const exclude = environments.map((project) => {
//         const files = ['**/node_modules/*', 'node_modules/*', '**/compiled/*', '**/styles/*'];
//         return files.map((fileName) => {
//             const relRootPath = path.relative(currentDirPath, environments[project].AbsolutePaths.RootDir);
//             return path.join(relRootPath, fileName);
//         });
//     });
//     const original = {
//         compilerOptions: {
//             outDir: './compiled/',
//             sourceMap: true,
//             noImplicitAny: false,
//             module: 'commonjs',
//             target: 'ESNext',
//             strict: false,
//             moduleResolution: 'node',
//             esModuleInterop: true,
//             allowSyntheticDefaultImports: true,
//             jsx: 'react',
//             allowJs: true,
//             skipLibCheck: true,
//             resolveJsonModule: true,
//             experimentalDecorators: true,
//             emitDecoratorMetadata: true,
//             lib: [
//                 'ES2015.Core',
//                 'ES2015.Collection',
//                 'ES2015.Generator',
//                 'ES2015.Iterable',
//                 'ES2015.Promise',
//                 'ES2015.Proxy',
//                 'ES2015.Reflect',
//                 'ES2015.Symbol',
//                 'ES2015.Symbol.WellKnown',
//                 'ES2016.Array.Include',
//                 'ES2017.object',
//                 'ES2017.Intl',
//                 'ES2017.SharedMemory',
//                 'ES2017.String',
//                 'ES2017.TypedArrays',
//                 'ES2018.Intl',
//                 'ES2018.Promise',
//                 'ES2018.RegExp',
//                 'ESNext.AsyncIterable',
//                 'ESNext.Array',
//                 'ESNext.Intl',
//                 'ESNext.Symbol',
//             ],
//             types: ['jest', 'node'],
//             baseUrl: './',
//             paths,
//         },
//         include,
//         exclude,
//     } as Tsconfig;
//     return deepmerge(original, tsConfig);
// };
// export default createTsConfig(configsJson.environments.SharedLibrary.absolutePaths.rootDir);
//# sourceMappingURL=tsconfig%20copy.js.map