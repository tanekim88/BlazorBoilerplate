const final = {
    lint: 'eslint "*/**/*.{js,ts,tsx}" --quiet --fix',
};
import fs from 'fs';
import packageJson from '../package.json';
import blazorPackageJson from '#blazor-app/package.json';
import authPackageJson from '#auth/package.json';
import sharedPackageJson from '#shared/package.json';
import path from 'path';
import symlinkDir from 'symlink-dir';
import { rootConfig } from '#root/configs';
const childs = [
    {
        folderName: 'shared',
        shortName: 'shared',
        packageJson: sharedPackageJson,
        folderPath: './apps/shared',
        isShared: true
    },
    {
        folderName: 'blazor-app',
        shortName: 'blazor',
        packageJson: blazorPackageJson,
        folderPath: './apps/blazor-app',
    },
    {
        folderName: 'auth',
        shortName: 'auth',
        packageJson: authPackageJson,
        folderPath: './apps/auth',
    },
];
const childShortNames = childs.map((x) => x.shortName);
const commandObjs = [
    {
        name: 'setup',
        command: 'node  --loader ts-node/esm ./scripts/generate-scripts.ts',
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
        command: 'node --inspect-brk --loader ts-node/esm node_modules/.bin/jest --runInBand',
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
        name: 'build:vite',
        command: 
        // 'cross-env TS_NODE_PROJECT="tsconfig.json" vite --mode development --config vite.dev.ts  -r ts-node/register --config-register tsconfig-paths/register',
        'cross-env NODE_OPTIONS="--max_old_space_size=4096 --loader ts-node/esm" vite --mode=development --config vite.dev.ts',
        includes: [...childShortNames],
    },
    {
        name: 'build:prod:vite',
        command: 'cross-env NODE_OPTIONS="--max_old_space_size=4096 --loader ts-node/esm" vite --mode=production --config vite.prod.ts',
        includes: [...childShortNames],
    },
    {
        name: 'watch:vite',
        command: 'cross-env NODE_OPTIONS="--max_old_space_size=4096 --loader ts-node/esm" vite --mode=development --watch --config vite.dev.ts',
        includes: [...childShortNames],
    },
    {
        name: 'watch:prod:vite',
        command: 'cross-env NODE_OPTIONS="--max_old_space_size=4096 --loader ts-node/esm" vite --mode=production --watch --config vite.prod.ts',
        includes: [...childShortNames],
    },
    {
        name: 'start:pwa',
        command: 'http-server dist',
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
        command: 'node --loader ts-node/esm ./scripts/generate-paths.ts',
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
packageJson.scripts = final;
const rootDir = rootConfig.rootDir;
const absRootDir = path.resolve(rootConfig.rootDir, '..');
const AppsDir = path.resolve(absRootDir, 'Apps');
await symlinkDir(absRootDir, path.resolve(rootDir, 'absolute-root'));
packageJson.imports = {};
packageJson.imports["#root/*"] = "./absolute-root/Js/*";
childs.forEach(async (child) => {
    const folderName = child.folderName;
    packageJson.imports[`#${folderName}/*`] = `./absolute-root/Js/${folderName}/*`;
});
const files = fs.readdirSync(AppsDir);
files.forEach(function (folderName) {
    packageJson.imports[`#${folderName}/*`] = `./absolute-root/Apps/${folderName}/*`;
});
childs.forEach(async (child) => {
    const childFolderPath = path.resolve(rootDir, `${child.folderPath}`);
    const folderName = child.folderName;
    const childPackageJson = child.packageJson;
    childPackageJson.scripts = childScript;
    childPackageJson.dependencies = packageJson.dependencies;
    childPackageJson.devDependencies = packageJson.devDependencies;
    childPackageJson.imports = packageJson.imports;
    fs.writeFileSync(path.resolve(childFolderPath, 'package.json'), JSON.stringify(childPackageJson, null, 4), 'utf8');
    await symlinkDir(path.resolve(rootDir, 'node_modules'), path.resolve(childFolderPath, 'node_modules'));
    await symlinkDir(absRootDir, path.resolve(childFolderPath, 'absolute-root'));
});
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4), 'utf8');
import './generate-paths';
//# sourceMappingURL=generate-scripts.js.map