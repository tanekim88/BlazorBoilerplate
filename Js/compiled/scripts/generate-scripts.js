"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const final = {
    lint: 'eslint "*/**/*.{js,ts,tsx}" --quiet --fix',
};
const fs_1 = __importDefault(require("fs"));
const package_json_1 = __importDefault(require("../package.json"));
const package_json_2 = __importDefault(require("@blazor-app/package.json"));
const package_json_3 = __importDefault(require("@auth/package.json"));
const package_json_4 = __importDefault(require("@shared/package.json"));
const path_1 = __importDefault(require("path"));
const symlink_dir_1 = __importDefault(require("symlink-dir"));
const configs_1 = require("@root/configs");
const childs = [
    {
        folderName: 'shared',
        shortName: 'shared',
        packageJson: package_json_4.default,
        folderPath: './apps/shared',
    },
    {
        folderName: 'blazor-app',
        shortName: 'blazor',
        packageJson: package_json_2.default,
        folderPath: './apps/blazor-app',
    },
    {
        folderName: 'auth',
        shortName: 'auth',
        packageJson: package_json_3.default,
        folderPath: './apps/auth',
    },
];
const childShortNames = childs.map((x) => x.shortName);
const commandObjs = [
    {
        name: 'setup',
        command: 'ts-node -r tsconfig-paths/register ./scripts/generate-scripts.ts',
        includes: [''],
    },
    {
        name: 'prebuild',
        command: 'rimraf dist',
        includes: [...childShortNames],
    },
    {
        name: 'build',
        command: 'nest build',
        includes: [...childShortNames],
    },
    {
        name: 'format',
        command: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
        includes: [...childShortNames],
    },
    {
        name: 'start',
        command: 'nest start',
        includes: [...childShortNames],
    },
    {
        name: 'start:dev',
        command: 'nest start --watch --debug --progress',
        includes: [...childShortNames],
    },
    {
        name: 'start:debug',
        command: 'nest start --debug --watch',
        includes: [...childShortNames],
    },
    {
        name: 'start:prod',
        command: 'node dist/main',
        includes: [...childShortNames],
    },
    {
        name: 'test',
        command: 'jest',
        includes: [...childShortNames],
    },
    {
        name: 'test:watch',
        command: 'jest --watch',
        includes: [...childShortNames],
    },
    {
        name: 'test:cov',
        command: 'jest --coverage',
        includes: [...childShortNames],
    },
    {
        name: 'test:debug',
        command: 'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
        includes: [...childShortNames],
    },
    {
        name: 'test:e2e',
        command: 'jest --config ./test/jest-e2e.json',
        includes: [...childShortNames],
    },
    {
        name: 'lint',
        // command: "eslint '*/**/*.{js,ts,tsx}' --quiet --fix",
        command: 'cross-env NODE_OPTIONS=--max_old_space_size=4096 eslint **/*.ts --fix --no-eslintrc -c .eslintrc.json',
        includes: [...childShortNames],
    },
    /////////////////////////////////////////////////////////////////////////////////////////////
    {
        name: 'build:webpack',
        command: 
        // 'cross-env TS_NODE_PROJECT="tsconfig.json" webpack --mode development --config webpack.dev.ts  -r ts-node/register --config-register tsconfig-paths/register',
        'cross-env NODE_OPTIONS="--max_old_space_size=4096 -r tsconfig-paths/register" webpack --mode=development --config webpack.dev.ts',
        includes: [...childShortNames],
    },
    {
        name: 'build:prod:webpack',
        command: 'cross-env NODE_OPTIONS="--max_old_space_size=4096 -r tsconfig-paths/register" webpack --mode=production --config webpack.prod.ts',
        includes: [...childShortNames],
    },
    {
        name: 'watch:webpack',
        command: 'cross-env NODE_OPTIONS="--max_old_space_size=4096 -r tsconfig-paths/register" webpack --mode=development --watch --config webpack.dev.ts',
        includes: [...childShortNames],
    },
    {
        name: 'watch:prod:webpack',
        command: 'cross-env NODE_OPTIONS="--max_old_space_size=4096 -r tsconfig-paths/register" webpack --mode=production --watch --config webpack.prod.ts',
        includes: [...childShortNames],
    },
    {
        name: 'start:pwa',
        command: 'http-server dist',
        includes: [...childShortNames],
    },
    {
        name: 'start:webpack:devserver',
        command: 'webpack-dev-server --open --config webpack.dev.ts',
        includes: [...childShortNames],
    },
    {
        name: 'start:webpack:devserver:prod',
        command: 'webpack-dev-server --open --config webpack.prod.ts',
        includes: [...childShortNames],
    },
    {
        name: 'watch',
        command: '',
        includes: [...childShortNames],
    },
    {
        name: 'watch:dotnet',
        command: 'dotnet watch run',
        includes: [...childShortNames],
    },
    {
        name: 'inst',
        command: 'npm install',
        includes: ['', ...childShortNames],
    },
    {
        name: 'inst:force',
        command: 'npm install --force',
        includes: ['', ...childShortNames],
    },
    {
        name: 'uninst',
        command: 'npm uninstall',
        includes: ['', ...childShortNames],
    },
    {
        name: 'init',
        command: 'npm install -D concurrently npm-run-all',
        includes: ['', ...childShortNames],
    },
    {
        name: 'nuke',
        command: 'rimraf node_modules',
        includes: ['', ...childShortNames],
    },
    {
        name: 'reset',
        command: 'npm run nuke && npm run init && npm run inst',
        includes: ['', ...childShortNames],
    },
    {
        name: 'generate:paths',
        command: 'ts-node -r tsconfig-paths/register ./scripts/generate-paths.ts',
        includes: [''],
    },
];
commandObjs.forEach((commandObj) => {
    let scriptForAll = 'npm-run-all --parallel ';
    if (commandObj.includes.indexOf('') !== -1) {
        scriptForAll += '"{commandName} -- {@}" '.replace('{commandName}', `${commandObj.name}`);
    }
    final[`${commandObj.name}`] = commandObj.command;
    childs.forEach((target) => {
        final[`${commandObj.name}:${target.shortName}`] = `cd ${target.folderPath ?? target.folderName} && npm run {commandName}`.replace('{commandName}', commandObj.name);
        if (commandObj.includes.indexOf(target.shortName) !== -1) {
            scriptForAll += '"{commandName} -- {@}" '.replace('{commandName}', `${commandObj.name}:${target.shortName}`);
        }
    });
    scriptForAll += '--';
    final[`${commandObj.name}:all`] = scriptForAll;
});
const childScript = commandObjs.reduce((acc, curr) => {
    acc[curr.name] = curr.command;
    return acc;
}, {});
package_json_1.default.scripts = final;
const rootDir = configs_1.rootConfig.rootDir;
childs.forEach((child) => {
    const childFolderPath = path_1.default.resolve(rootDir, `${child.folderPath}`);
    const folderName = child.folderName;
    const childPackageJson = child.packageJson;
    childPackageJson.scripts = childScript;
    childPackageJson.dependencies = package_json_1.default.dependencies;
    childPackageJson.devDependencies = package_json_1.default.devDependencies;
    fs_1.default.writeFileSync(path_1.default.resolve(childFolderPath, 'package.json'), JSON.stringify(childPackageJson, null, 4), 'utf8');
    symlink_dir_1.default(path_1.default.resolve(rootDir, 'node_modules'), path_1.default.resolve(childFolderPath, 'node_modules')).then((result) => {
        // console.dir(result);
    });
});
fs_1.default.writeFileSync('package.json', JSON.stringify(package_json_1.default, null, 4), 'utf8');
require('./generate-paths');
//# sourceMappingURL=generate-scripts.js.map